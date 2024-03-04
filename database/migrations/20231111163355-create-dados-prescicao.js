'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DadosPrescricao', {
			id_prescricao: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},

			fk_pacientes: {
				type: Sequelize.INTEGER(5),
				references: { model: 'DadosPacientes', key: 'id_pacientes' },
				onDelete: 'CASCADE',
			},

			data: {
				allowNull: false,
				type: Sequelize.DATEONLY
			},

			dieta: {
				allowNull: false,
				type: Sequelize.TEXT
			},

			suplementos: {
				allowNull: false,
				type: Sequelize.TEXT
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('DadosPrescricao');
	}
};