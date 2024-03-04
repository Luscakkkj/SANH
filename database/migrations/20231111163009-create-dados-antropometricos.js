'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DadosAntropometricos', {
			id_medidas: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},

			fk_pacientes: {
				type: Sequelize.INTEGER(5),
				unique: true,	
				references: {model: 'DadosPacientes', key: 'id_pacientes'},
				onDelete: 'CASCADE',
			},

			peso:{
				allowNull: true,
				type: Sequelize.DOUBLE(6,2)
			},

			altura: {
				allowNull: true,
				type: Sequelize.DOUBLE(6,2)
			},

			peso_estimado: {
				allowNull: true,
				type: Sequelize.DOUBLE(6,2)
			},

			altura_estimada: {
				allowNull: true,
				type: Sequelize.DOUBLE(6, 2)
			},

			imc: {
				allowNull: true,
				type: Sequelize.DOUBLE(6, 2)
			},

			peso_ideal: {
				allowNull: true,
				type: Sequelize.DOUBLE(6, 2)
			},

			situacao: {
				allowNull: false,
				type: Sequelize.STRING(20)
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('DadosAntropometricos');
	}
};