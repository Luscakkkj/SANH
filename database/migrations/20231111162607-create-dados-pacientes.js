'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DadosPacientes', {
			id_pacientes: {
				allowNull: false,
				unique: true,
				primaryKey: true,
				type: Sequelize.INTEGER(5)
			},

			nome: {
				allowNull: false,
				type: Sequelize.STRING(150)
			},

			telefone: {
				allowNull: true,
				type: Sequelize.STRING(30)
			},

			foto:{
				allowNull: true,
				type: Sequelize.STRING
			},

			idade: {
				allowNull: false,
				type: Sequelize.INTEGER(2)
			},

			data_nascimento:{
				allowNull: false,
				type: Sequelize.DATEONLY
			},

			sexo: {
				allowNull: false,
				type: Sequelize.CHAR(1)
			},

			genero:{
				allowNull: false,
				type: Sequelize.STRING
			},

			raca: {
				allowNull: false,
				type: Sequelize.STRING(10)
			},

			cidade: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('DadosPacientes');
	}
};