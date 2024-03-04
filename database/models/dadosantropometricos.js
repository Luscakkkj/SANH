'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class DadosAntropometricos extends Model {}

	DadosAntropometricos.init(
		{
			id_medidas: {type: DataTypes.INTEGER, primaryKey: true},
			fk_pacientes: {
				type: DataTypes.INTEGER,
				references: {model: 'DadosPacientes', key: 'id_pacientes'},
				onDelete: 'CASCADE',
			},
			peso:DataTypes.DOUBLE,
			altura: DataTypes.DOUBLE,
			peso_estimado: DataTypes.DOUBLE,
			altura_estimada: DataTypes.DOUBLE,
			imc: DataTypes.DOUBLE,
			peso_ideal: DataTypes.DOUBLE,
			situacao: DataTypes.STRING
		}, 
	
		{
			sequelize,
			modelName: 'DadosAntropometricos',
			timestamps: false
		}
	);
	return DadosAntropometricos;
};