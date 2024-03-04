'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('DadosClinicos', {
			id_clinicos: {
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

			setor:{
				allowNull: false,
				type: Sequelize.STRING(50)
			},

			data:{
				allowNull: false,
				type: Sequelize.DATEONLY
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('DadosClinicos');
	}
};