const Cadastro = (req, res) => {
    const erro = req.session.erro;
	const formData = req.session.formData;
	req.session.erro = null;

	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

	try {
		res.render('pages/auth/cadastro', {erro, formData});
	} catch (error) {
		console.error(error);
	}

	delete erro;
	delete formData;
}


const Login = (req, res) => {
	const erro = req.session.erro;
	const formData = req.session.formData;
	req.session.erro = null;
	req.session.formData = null;

	
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');

	try {
		res.render('pages/auth/login', {erro, formData});
	} catch (error) {
		console.error(error);
	}

	delete erro;
}


module.exports = { Cadastro, Login };