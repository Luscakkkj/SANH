require('dotenv').config()

module.exports = {
	"development": {
		"username": process.env.DB_USER,
		"password": null,
		"database": process.env.DB_DATABASE,
		"host": process.env.DB_HOST,
		"dialect": "mysql",
		"define": {
			"timestamps": false,
			"underscore": true
		},
		"logging": false
	}
}
