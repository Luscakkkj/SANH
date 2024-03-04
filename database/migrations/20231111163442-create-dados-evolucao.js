'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DadosEvolucaos', {
			id_evolucao: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},

			fk_pacientes: {
				allowNull: false,
				type: Sequelize.INTEGER(5),
				references: { model: 'DadosPacientes', key: 'id_pacientes' },
				onDelete: 'CASCADE',
			},

			texto: {
				type: Sequelize.TEXT
			},

			data: {
				allowNull: false,
				type: Sequelize.DATEONLY
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('DadosEvolucaos');
	}
};