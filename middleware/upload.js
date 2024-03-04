const multer = require("multer");
const path = require('path')

const imageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("z.", false);
	}
};

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve(__dirname, "../public/img/perfil/"));
	},
	filename: (req, file, cb) => {
		cb(null, `${file.originalname}`);
	},
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
