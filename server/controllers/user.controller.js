const db = require("../models");
const User = db.user;


exports.userInfo = (req, res) => {
	User.findByPk(+req.userId)
		.then(user => res.status(200).send({ message: "123", status: 'success', user }))
		.catch(err => res.status(500).send({ message: err.message, status: 'error' }));
};