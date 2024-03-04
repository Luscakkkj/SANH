const { Nutricionistas } = require('../../database/models/index');
const bcrypt = require('bcrypt');

const Cadastro = async (req, res) => {
	let { nome, email, crn, senha } = req.body;

	const [
		verificar_email,
		verificar_crn
	] = await Promise.all([
		Nutricionistas.findOne({ where: { email } }),
		Nutricionistas.findByPk(crn)
	])

	try {
		if (!nome || !email || !crn || !senha) {
			req.session.erro =  'Algum dado não foi preenchido com sucesso'
			req.session.formData = req.body
			res.redirect('back')
		} 
        
		else if(verificar_email && verificar_crn){
			req.session.erro =  'O email e o CRN já estão registrados'
			req.session.formData = req.body
			res.redirect('back')
		}

        else if (verificar_email) {
			req.session.erro =  'Esse email já está sendo usado !'
			req.session.formData = req.body
			res.redirect('back')
		} 

        else if (verificar_crn) {
			req.session.erro =  'Esse CRN já está registrado'
			req.session.formData = req.body
			res.redirect('back')
		} 

        else {
			senha = await bcrypt.hash(senha, 5)
			await Nutricionistas.create({
				id_nutri: crn,
				nome: nome,
				email: email,
				senha: senha,
			});
			req.session.formData = null
			delete req.session.formData 
			res.redirect('/login');
		};

	} catch (error) {
		console.log(error);
	};

};

/*
    LOGIN DE NUTRICIONISTAS 
*/

const Login = async (req, res) => {
	const { crn, senha } = req.body;

	try {
		if (!crn || !senha) {
            req.session.erro = 'Algum campo invalido'
			req.session.formData = req.body
            res.redirect('back')
		} 
        else {

			const nutri = await Nutricionistas.findByPk(crn)

			if (!nutri) {
                req.session.erro = 'Esse CRN não existe'
				req.session.formData = req.body
                res.redirect('back')
			} 

            else {
				const verificar_senha = await bcrypt.compare(senha, nutri.senha);
				if (verificar_senha){
					res.redirect(`/home/${nutri.id_nutri}`);
				}
					
                else {
                    req.session.erro = 'As senhas não conferem'
					req.session.formData = req.body
                    res.redirect('back')
				}
			}
		}
	} catch (error) {
		console.error(`Ocorreu um erro: ${error}`);
	}
};

module.exports = { Cadastro, Login }