'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DadosPrescricao extends Model {}

	DadosPrescricao.init(
		{
			id_prescricao: {type: DataTypes.INTEGER, primaryKey: true},
			fk_pacientes: {
				type: DataTypes.INTEGER,
				references: {model: 'DadosPacientes', key: 'id_pacientes'},
				onDelete: 'CASCADE',
			},
			data: DataTypes.DATEONLY,
			dieta: DataTypes.TEXT,
			suplementos: DataTypes.TEXT
		}, 
		
		{
			sequelize,
			modelName: 'DadosPrescricao',
			tableName: 'DadosPrescricao',
			timestamps: false
		}
	);
	return DadosPrescricao;
};