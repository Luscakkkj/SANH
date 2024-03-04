require('dotenv').config()
const express = require('express');
const {engine}  = require('express-handlebars'); 
const compression = require('compression')
const express_session = require('express-session')
const engine_config = require('./engine.js')
const routes = require('./routes/routes.js')
const {enviarEmail} = require('./email.js')
const path = require('path');

/*
	Váriaveis de caminhos e de ambiente 
*/

const app = express();
const connectToDatabase = require('./database/models/index');
const views_path = path.join(__dirname, 'views'); 
const public_path = path.join(__dirname, 'public'); 
const port = process.env.PORT


/*
	Utilização de módulos e configurações do express
*/

app.use(express_session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(public_path));
app.use(compression())
app.engine('.hbs', engine(engine_config));
app.set('view engine', '.hbs');
app.set('views', views_path);
enviarEmail() 

/*
	Importação das rotas e inicialização do servidor
*/

app.use(routes.public);
app.use(routes.home)

app.use((req, res) => res.status(404).render('error'));
app.listen(port || 5000, () => {
	console.log(`Servidor rodando http://localhost:${port}`);
	connectToDatabase;
});