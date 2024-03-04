'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class DadosEvolucaos extends Model {}

	DadosEvolucaos.init(
		{
			id_evolucao: {type: DataTypes.INTEGER, primaryKey: true},
			fk_pacientes: {
				type: DataTypes.INTEGER,
				references: {model: 'DadosPacientes', key: 'id_pacientes'},
				onDelete: 'CASCADE',
			},
			texto: DataTypes.TEXT,
			data: DataTypes.DATEONLY
		}, 
		
		{
			sequelize,
			modelName: 'DadosEvolucaos',
			timestamps: false
		}
	);
	return DadosEvolucaos;
};