require('dotenv').config()

module.exports = {
	"development": {
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_DATABASE,
		"port": process.env.DB_PORT,
		"host": process.env.DB_HOST,
		"dialect": "mysql",
		"pool": {
			"max": 50,
			"min": 0,
			"acquire": 30000,
			"idle": 10000
    },
		"define": {
			"timestamps": false,
			"underscore": true
		},
		"logging": false
	}
}
