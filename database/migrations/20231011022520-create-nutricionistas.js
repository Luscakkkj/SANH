'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Nutricionistas', {

			id_nutri: {
				allowNull: false,
				unique: true,
				primaryKey: true,
				type: Sequelize.INTEGER(5)
			},

			nome: {
				allowNull: false,
				type: Sequelize.STRING(150)
			},

			email: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING(250)
			},
			
			senha: {
				allowNull: false,
				type: Sequelize.STRING(150)
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Nutricionistas');
	}
};