'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class DadosClinicos extends Model { }

	DadosClinicos.init(
		{
			id_clinicos: { type: DataTypes.INTEGER, primaryKey: true },
			fk_pacientes: {
				type: DataTypes.INTEGER,
				references: { model: 'DadosPaciente', key: 'id_pacientes' },
				onDelete: 'CASCADE',
			},
			setor: DataTypes.STRING,
			data: DataTypes.DATEONLY
		},

		{
			sequelize,
			modelName: 'DadosClinicos',
			timestamps: false
		}
	);
	return DadosClinicos;
};