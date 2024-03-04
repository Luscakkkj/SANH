'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class DadosPacientes extends Model {}
	
	DadosPacientes.init(
		{
			id_pacientes: {type: DataTypes.INTEGER, primaryKey: true},
			nome: DataTypes.STRING,
			foto: DataTypes.STRING,
			idade: DataTypes.INTEGER,
			data_nascimento: DataTypes.DATEONLY,
			sexo: DataTypes.CHAR,
			raca: DataTypes.STRING,
			genero: DataTypes.STRING,
			telefone: DataTypes.STRING,
			cidade: DataTypes.STRING,
		}, 
	
		{	
			sequelize,
			modelName: 'DadosPaciente',
			timestamps: false
		}
	);
	return DadosPacientes;
};