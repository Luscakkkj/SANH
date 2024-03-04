const path = require('path')
const partialsPath = path.join(__dirname, 'views', 'pages' ,'partials');

module.exports = {
	partialsDir: partialsPath,
	extname: '.hbs',
	defaultLayout: false,
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
	helpers: {
		compare(arg1, arg2, options) {
			return arg1 == arg2 ? options.fn(this) : options.inverse(this);
		},
	},
};