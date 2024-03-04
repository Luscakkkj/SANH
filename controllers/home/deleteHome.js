const { DadosPacientes, Nutricionistas, DadosPrescricao, DadosEvolucao } = require('../../database/models');
const path = require('path');
const fs = require('fs/promises');

const Perfil = async (req, res) => {
	const idPacientes = req.params.idPacientes;
	const crnNutri = req.params.crnNutri;

	try {
		const [nutricionista, pacientes] = await Promise.all([
			Nutricionistas.findByPk(crnNutri),
			DadosPacientes.findByPk(idPacientes),
		])

		if (pacientes.foto) {
			const fotoPath = path.resolve(__dirname, `../../public/img/perfil/${pacientes.foto}`)
			try {
				await fs.access(fotoPath, fs.constants.F_OK);
				await fs.unlink(fotoPath);
			} catch (error) {
				throw new Error("Não foi possivel acessar e excluir o arquivo: " + error)
			}
		}

		await DadosPacientes.destroy({
			where: { id_pacientes: idPacientes }
		});
		res.redirect(`/home/${nutricionista.id_nutri}/pacientes`);
	} catch (error) {
		console.log(error);
	}
}


const Prescricao = async (req, res) => {
	const idPrescricoes = req.params.idPrescricoes;

	try {
		await DadosPrescricao.destroy({
			where: {
				id_prescricao: idPrescricoes,
			},
		});
		res.redirect('back')
	} catch (error) {
		console.error(error);
	}
};

const Evolucao = async (req, res) => {
	const idEvolucao = req.params.idEvolucao;

	try {
		await DadosEvolucao.destroy({
			where: {
				id_evolucao: idEvolucao,
			},
		});
		res.redirect('back')
	} catch (error) {
		console.error(error);
	}
};



module.exports = { Perfil, Prescricao, Evolucao };