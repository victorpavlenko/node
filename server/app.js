const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const rimraf = require("rimraf");
const verifyToken = require("./middleware/verifyToken");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let dir = path.join(__dirname + '/files');
		fs.mkdir(dir, () => cb(null, dir));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
});
const upload = multer({ storage }).single('file');


const app = express()
const PORT = 3000;

app.use(cors({
	exposedHeaders: ['x-token'],
	origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");

db.sequelize.sync({force: true}).then(() => {
	console.log('Drop DB');
	rimraf.sync(path.join(__dirname + '/files'));
});

app.use(verifyToken);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/file.routes')(app, upload);


const server = app.listen(PORT, (error) => {
	if (error) return console.log(`Error: ${error}`);

	console.log(`Server listening on port ${server.address().port}`);
});