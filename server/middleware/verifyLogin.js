const db = require("../models");
const User = db.user;

const verifyLogin = (req, res, next) => {

	User.findOne({ where: { login: req.body.login } })
		.then(user => {
			if (user) {
				res.status(400).send({ message: "Login is already in use" });
				return;
			}

			next();
	});
};

module.exports = verifyLogin;