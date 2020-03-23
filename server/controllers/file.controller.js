const db = require("../models");
const File = db.file;
const path = require('path')
const fs = require('fs')



exports.uploadFile = (req, res) => {
	if (!req.file) {
		res.status(500).send({ message: "No file received", status: 'error'});
	} else {
		File.create({
			filename: req.file.originalname,
			name: req.file.filename,
			size: req.file.size,
			mime: req.file.mimetype,
			ext: path.extname(req.file.originalname),
			userId: req.userId,
		})
			.then(file => res.status(200).send({ message: "File received", status: 'success', file: file}))
			.catch(err => res.status(500).send({ message: err.message }));
	}
};


exports.getFiles = (req, res) => {

		let limit = +req.query.list_size || 10;
		let offset = (+req.query.page || 0)*limit;

		File.findAndCountAll({ limit, offset })
			.then((files) => res.status(200).send({ status: 'success', files: files.rows, count: files.count }))
			.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
};


exports.getFile = (req, res) => {
		File.findByPk(+req.params.id)
			.then(file => res.status(200).send({ message: "Success", status: 'success', file: file}))
			.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
};


exports.downloadFile = (req, res) => {
		File.findByPk(+req.params.id)
			.then((file) => res.download(`${__dirname}/../files/${file.name}`))
			.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
};


exports.updateFile = (req, res) => {
	if (!req.file) {
		return res.status(500).send({ message: "No file received", status: 'error' });
	} else {
		File.findByPk(+req.params.id)
			.then(file => {

				return fs.unlink(path.join(__dirname + '/../files/' + file.name), (err) => {
					if (err) {
						res.status(500).send({ message: err, status: 'error' })
					}

					file.update({
						filename: req.file.originalname,
						name: req.file.filename,
						size: req.file.size,
						mime: req.file.mimetype,
						ext: path.extname(req.file.originalname),
						userId: req.userId,
					})
						.then(f => res.status(200).send({ message: "File received", status: 'success', file: f }))
						.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
				})
			})
			.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
	}
};


exports.deleteFile = (req, res) => {
		File.findByPk(+req.params.id)
			.then(files => {

				fs.unlink(path.join(__dirname + '/../files/' + files.name), (err) => {
					if (err) {
						res.status(500).send({ message: err, status: 'error' });
					}

					File.destroy({ where: { id: +req.params.id } })
						.then((files) => res.status(200).send({ message: "123", status: 'success', files: files }))
						.catch(err => res.status(500).send({ message: err.message, status: 'error' }));

				})
			})
			.catch(err => res.status(500).send({ message: err.message }));
};
