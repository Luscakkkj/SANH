'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Nutricionistas extends Model {}
	
	Nutricionistas.init(
		{
			id_nutri: {type: DataTypes.INTEGER, primaryKey: true},
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
			senha: DataTypes.STRING
		}, 
	
		{
			sequelize,
			modelName: 'Nutricionistas',
			timestamps: false
		}
	);

	return Nutricionistas;
};