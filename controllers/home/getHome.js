const { Nutricionistas, DadosPacientes, DadosAntropometricos, DadosClinicos, Sequelize, DadosPrescricao, DadosEvolucao } = require('../../database/models/index');

const Dashboard = async (req, res) => {
	const crnNutri = req.params.crnNutri;

	try {
		const [contagem_pacientes, contagem_prescricao, nutricionistas, pacientes] = await Promise.all([
			DadosPacientes.count(),
			DadosPrescricao.count(),
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] }),
			DadosPacientes.findAll({
				attributes: ['nome', 'foto'],
				include: [
					{ model: DadosAntropometricos, attributes: ['situacao'] },
					{
						model: DadosClinicos,
						attributes: [
							[Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%d/%m/%y'), 'data'],
						],
					},
				],
				limit: 7,
				order: [[DadosClinicos, 'data', 'DESC']],
			}),
		]);

		if (!nutricionistas) {
			res.status(404).render('error');
		}

		else {
			res.render('pages/home/home', {
				dynamicPartial: 'dashboard',
				contagem_pacientes,
				contagem_prescricao,
				pacientes,
				nutricionistas,
			});
		}

	} catch (error) {
		console.log('Ocorreu um erro ' + error);
	}

}

const Registro = async (req, res) => {
	const crnNutri = req.params.crnNutri;
	const erro = req.session.erro
	const sucesso = req.session.sucesso
	try {
		const nutricionistas = await Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] })

		req.session.erro = null
		req.session.sucesso = null
		res.render('pages/home/home', {
			dynamicPartial: 'registro',
			erro,
			sucesso,
			nutricionistas
		})
	} catch (error) {
		console.log(erro);
	}

	delete erro
	delete sucesso
}

const Listagem = async (req, res) => {
	const crnNutri = req.params.crnNutri;

	try {
		const pacientes = await DadosPacientes.findAll({
			attributes: [
				'id_pacientes',
				'nome',
				'idade',
			],

			include: {
				model: DadosClinicos,
				attributes: [
					[Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%d/%m/%y'), 'data']
				]
			}
		})
		const nutricionistas = await Nutricionistas.findOne({
			where: { id_nutri: crnNutri },
			attributes: ['id_nutri']
		});

		res.render('pages/home/home', {
			dynamicPartial: 'pacientes',
			pacientes,
			nutricionistas
		})

	} catch (error) {
		console.error(error);
	}

}

const Perfil = async (req, res) => {
	const id_pacientes = req.params.idPacientes;
	const crnNutri = req.params.crnNutri;

	try {
		const [nutricionistas, paciente] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] }),
			DadosPacientes.findOne({
				where: { id_pacientes },
				include: [
					{
						model: DadosAntropometricos,
						attributes: ['peso_estimado', 'altura_estimada', 'imc', 'peso_ideal', 'peso', 'altura']
					},
				],
				attributes: ['id_pacientes', 'nome', 'foto', 'idade',],
			})
		])

		if (paciente) {
			res.render('pages/home/perfil', { paciente, nutricionistas });
		} else {
			res.status(404).render('error')
		}
	} catch (error) {
		console.error(error);
	}
}


const Prescricoes = async (req, res) => {
	const id_pacientes = req.params.idPacientes;
	const erro = req.session.erroPresc
	const sucesso = req.session.sucessoPresc
	const crnNutri = req.params.crnNutri;
	req.session.erroPresc = null
	req.session.sucessoPresc = null

	try {
		const [nutricionistas, paciente] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] }),
			DadosPacientes.findOne({
				where: { id_pacientes },
				attributes: ['id_pacientes', 'nome'],
				include: {
					model: DadosClinicos,
					attributes: ['fk_pacientes']
				}
			})
		])

		if (paciente) {
			res.render('pages/home/prescricao', { paciente, erro, sucesso, nutricionistas })
		}

		else {
			res.status(404).render('error')
		}
	} catch (error) {
		console.error(erro);
	}

	delete erro
	delete sucesso
}


const Evolucoes = async (req, res) => {
	const id_pacientes = req.params.idPacientes;
	const erro = req.session.error
	const sucesso = req.session.sucesso
	const texto = req.session.texto
	const crnNutri = req.params.crnNutri;
	req.session.error = null
	req.session.sucesso = null
	req.session.texto = ''

	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.setHeader('Pragma', 'no-cache');

	try {

		const [nutricionistas, paciente] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] }),
			DadosPacientes.findOne({
				where: { id_pacientes },
				attributes: ['id_pacientes'],
			})
		])

		if (paciente) {
			res.render('pages/home/evolucao', { paciente, erro, sucesso, texto, nutricionistas })
		} else {
			res.status(404).render('error')
		}
	} catch (error) {
		console.error(error);
	}

	delete sucesso
	delete erro
	delete texto
}


const Triagem = async (req, res) => {
	const crnNutri = req.params.crnNutri;
	const id_pacientes = req.params.idPacientes;
	const erro = req.session.error
	const sucesso = req.session.sucesso

	try {
		const [nutricionistas, paciente] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri'] }),
			DadosPacientes.findOne({
				where: { id_pacientes },
				attributes: ['id_pacientes', 'idade'],
			})
		])

		if (paciente) {
			if (paciente.idade >= 18 && paciente.idade < 60) {
				res.render('pages/home/triagem1', { paciente, erro, sucesso, nutricionistas })
			}

			else if (paciente.idade < 18) {
				res.render('pages/home/triagem2', { paciente, erro, sucesso, nutricionistas })
			}

			else {
				res.render('pages/home/triagem3', { paciente, erro, sucesso, nutricionistas })
			}

		}
		else {
			res.status(404).render('error')
		}
	} catch (error) {
		console.error(error);
	}
	delete sucesso
	delete erro
}

const ListagemPrescricao = async (req, res) => {
    const id_pacientes = req.params.idPacientes;
    const crnNutri = req.params.crnNutri;

    try {
		const [nutricionistas, pacientes, prescricoes] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri', 'nome'] }),
			DadosPacientes.findOne({where: {id_pacientes: id_pacientes}, attributes: ['id_pacientes']}),
			DadosPrescricao.findAll({
				where: { fk_pacientes: id_pacientes },
				include: [
					{
						model: DadosPacientes,
						attributes: ['id_pacientes', 'nome', 'idade'],
					},
				],
				attributes: ['id_prescricao','data', 'dieta', 'suplementos'],
				order: [['data', 'DESC']]
			})
		])

        res.render('pages/home/list_presc', { prescricoes, nutricionistas, pacientes });

    } catch (error) {
        console.error(error);
    }
}

const ListagemEvolucoes = async (req, res) => {
    const id_pacientes = req.params.idPacientes;
    const crnNutri = req.params.crnNutri;

    try {
		const [nutricionistas, pacientes, evolucoes] = await Promise.all([
			Nutricionistas.findOne({ where: { id_nutri: crnNutri }, attributes: ['id_nutri', 'nome'] }),
			DadosPacientes.findOne({where: {id_pacientes: id_pacientes}, attributes: ['id_pacientes']}),
			DadosEvolucao.findAll({
				where: { fk_pacientes: id_pacientes },
				include: [
					{
						model: DadosPacientes,
						attributes: ['id_pacientes', 'nome', 'idade'],
					},
				],
				attributes: ['id_evolucao','data', 'texto'],
				order: [['data', 'DESC']]
			})
		])

        res.render('pages/home/list_evolu', { evolucoes, nutricionistas, pacientes });

    } catch (error) {
        console.error(error);
    }
}




module.exports = { Dashboard, Registro, Listagem, Perfil, Prescricoes, Evolucoes, Triagem, ListagemPrescricao, ListagemEvolucoes}