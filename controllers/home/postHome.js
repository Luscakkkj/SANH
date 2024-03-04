/* ==================  MODELS ==================*/

const { DadosPacientes, DadosAntropometricos, DadosClinicos, DadosEvolucao, DadosPrescricao } = require('../../database/models/index')


// PACOTES
const moment = require('moment')
const CalculosAntropometricos = require('../../functions/calculos')
const fs = require('fs')
const path = require('path')


/* 
| - - - - - - - - - - - - - - - - - - - - - - - -|
| 		    CONTROLLERS DA ROTA HOME 		     |
| - - - - - - - - - - - - - - - - - - - - - - - -|
*/
const Pacientes = async (req, res) => {
	let { situacao, nome, telefone, cidade, nascimento, idade, sexo, genero, outro, raca, setor, leito, data, braco, joelho, peso, altura } = req.body
	if (outro) genero = outro
	idade = parseInt(idade);

	try {
		if (altura && peso) {
			altura = parseFloat(altura.trim().replace(',', '.'));
			peso = parseFloat(peso.trim().replace(',', '.'));
		}

		if (braco || joelho) {
			braco = parseFloat(braco.trim().replace(',', '.'));
			joelho = parseFloat(joelho.trim().replace(',', '.'));
		}

		const Paciente = new CalculosAntropometricos(idade, sexo, raca, joelho, braco);

		if (!situacao || !nome || !telefone || !cidade || !nascimento || !idade || !sexo || !genero || !raca || !setor || !leito || !data) {
			req.session.erro = 'Algum campo não foi preenchido'
			res.redirect('back')
		}

		else {
			const verificar_leito = await DadosPacientes.findByPk(leito);

			if (verificar_leito) {
				req.session.erro = 'Leito já registrado'
				res.redirect('back')
			}

			else if (idade < 6) {
				req.session.erro = 'Não existem cálculos para menores de 6 anos'
				res.redirect('back')
			}

			if (req.file) {

				const extensao = path.extname(req.file.originalname);
				const novoNomeArquivo = `PACIENTE_${leito}${extensao}`;

				fs.renameSync(
					path.resolve(__dirname, `../../public/img/perfil/${req.file.filename}`),
					path.resolve(__dirname, `../../public/img/perfil/${novoNomeArquivo}`)
				);

				await DadosPacientes.create({
					id_pacientes: leito,
					nome: nome,
					foto: novoNomeArquivo,
					idade: idade,
					data_nascimento: nascimento,
					sexo: sexo,
					genero: genero,
					raca: raca,
					telefone: telefone,
					cidade: cidade,
				});

			} else {

				await DadosPacientes.create({
					id_pacientes: leito,
					nome: nome,
					idade: idade,
					data_nascimento: nascimento,
					sexo: sexo,
					genero: genero,
					raca: raca,
					telefone: telefone,
					cidade: cidade,
				});
			}

			if (situacao == 'acamado') {

				const peso_estimado = Paciente.peso();
				const altura_estimada = Paciente.altura();
				const imc = Paciente.imc(peso_estimado, altura_estimada);
				const peso_ideal = Paciente.pesoIdeal(altura_estimada);
				const situacao = Paciente.situacao(imc);

				// INSERÇÃO DAS MEDIDAS
				await DadosAntropometricos.create({
					fk_pacientes: leito,
					peso_estimado: peso_estimado.toFixed(2),
					altura_estimada: altura_estimada.toFixed(2),
					imc: imc.toFixed(2),
					peso_ideal: peso_ideal.toFixed(2),
					situacao: situacao,
				});

				await DadosClinicos.create({
					fk_pacientes: leito,
					setor: setor,
					data: data
				})

				req.session.sucesso = 'Enviado com sucesso'
				res.redirect('back')
			}

			else {
				const imc = (peso / (altura ** 2));
				const peso_ideal = Paciente.pesoIdeal(altura);
				const situacao = Paciente.situacao(imc);

				await DadosAntropometricos.create({
					fk_pacientes: leito,
					peso: peso,
					altura: altura,
					imc: imc.toFixed(2),
					peso_ideal: peso_ideal.toFixed(2),
					situacao: situacao,
				});

				await DadosClinicos.create({
					fk_pacientes: leito,
					setor: setor,
					data: data
				})

				req.session.sucesso = 'Enviado com sucesso'
				res.redirect('back')
			}

		}

	} catch (error) {
		console.error(`Ocorreu um erro: ${error}`);
		req.session.erro = 'Ocorreu um erro'
		res.redirect('back')
	};
};


const Evolucao = async (req, res) => {
	const idPacientes = req.params.idPacientes;
	const { texto } = req.body
	try {
		if (!texto) {
			req.session.erro = 'O texto não foi preenchido com sucesso'
			res.redirect('back')
		}
		else {
			const paciente = await DadosPacientes.findByPk(idPacientes)
			const data_atual = moment()

			await DadosEvolucao.create({
				fk_pacientes: paciente.id_pacientes,
				texto: texto,
				data: data_atual
			})

			req.session.sucesso = 'Texto inserido com sucesso'
			req.session.texto = texto
			res.redirect('back')
		}
	} catch (error) {
		console.error(error);
	}
}


const Prescricao = async (req, res) => {
	const { data, dieta, suplementos } = req.body
	const id_pacientes = req.params.idPacientes;

	if (!data || !dieta || !suplementos) {
		req.session.erroPresc = 'Algum dos campos não foram preenchidos corretamente'
		res.redirect('back')
	} else {

		const paciente = await DadosPacientes.findOne({
			where: { id_pacientes },
			attributes: ['id_pacientes']
		});

		await DadosPrescricao.create({
			fk_pacientes: paciente.id_pacientes,
			data: data,
			dieta: dieta,
			suplementos: suplementos
		})

		req.session.sucessoPresc = 'Prescrição registrada com sucesso'
		res.redirect('back')
	}
}

module.exports = { Pacientes, Evolucao, Prescricao } 