'use strict';

const { Sequelize } = require('sequelize');
require('dotenv').config()
const process = require('process');
const env = process.env.NODE_ENV.trim() ;
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(() => {console.log('Conexão bem sucessida');}).catch((error)=> {console.log(`LIGA O XAMPP`);})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/*
     MODELOS 
*/

db.Nutricionistas = require('../models/nutricionistas.js')(sequelize, Sequelize.DataTypes)
db.DadosPacientes = require('../models/dadospacientes.js')(sequelize, Sequelize.DataTypes)
db.DadosAntropometricos = require('../models/dadosantropometricos.js')(sequelize, Sequelize.DataTypes)
db.DadosClinicos = require('../models/dadosclinicos.js')(sequelize, Sequelize.DataTypes)
db.DadosEvolucao = require('../models/dadosevolucao.js')(sequelize, Sequelize.DataTypes)
db.DadosPrescricao = require('../models/dadosprescicao.js')(sequelize, Sequelize.DataTypes)

/* 
     RELACIONAMENTOS DOS MODELOS ( TABELAS )
*/

// HAS
db.DadosPacientes.hasOne(db.DadosAntropometricos, { foreignKey: 'fk_pacientes' });
db.DadosPacientes.hasOne(db.DadosClinicos, { foreignKey: 'fk_pacientes' });
db.DadosPacientes.hasMany(db.DadosEvolucao, {foreignKey: 'fk_pacientes'});
db.DadosPacientes.hasMany(db.DadosPrescricao, { foreignKey: 'fk_pacientes' });

// BELONGS TO
db.DadosAntropometricos.belongsTo(db.DadosPacientes, { foreignKey: 'fk_pacientes' });
db.DadosClinicos.belongsTo(db.DadosPacientes, { foreignKey: 'fk_pacientes' });
db.DadosEvolucao.belongsTo(db.DadosPacientes, { foreignKey: 'fk_pacientes' });
db.DadosPrescricao.belongsTo(db.DadosPacientes, { foreignKey: 'fk_pacientes' })



module.exports = db;