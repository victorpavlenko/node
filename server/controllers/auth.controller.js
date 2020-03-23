const db = require("../models");
const config = require("../configs/auth.config");
const uuid = require('uuid/v4');
const User = db.user;
const Token = db.token;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
	User.create({ login: req.body.login, password: bcrypt.hashSync(req.body.password, 1)})
		.then(({ id, login }) => res.status(200).send({ id, login }))
		.catch(err => res.status(500).send({ message: err.message }));
};

exports.logout = (req, res) => {
	Token.update({ expired: new Date().getTime() }, { where: { userId: req.userId }})
		.then(() => res.status(200).send({ success: 'true' }))
		.catch(() => res.status(200).send({ success: 'true' }));
};

exports.signin = (req, res) => {
	User.findOne({ where: { login: req.body.login } })
		.then(user => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					refreshToken: null,
					message: "Invalid Password"
				});
			}

			let tokenId = uuid()
			let accessToken = jwt.sign({ id: user.id }, config.accessSecret, { expiresIn: 10 });
			let refreshToken = jwt.sign({ id: tokenId }, config.refreshSecret, { expiresIn: 86400 });

			return Token.create({
				tokenId: tokenId,
				userId: user.id
			}).then(() => {
				res.status(200).send({
					id: user.id,
					login: user.login,
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
			})

		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};


exports.refreshToken = (req, res) => {

	return jwt.verify(req.body.refreshToken, config.refreshSecret, {},(err, decoded) => {

		if (err) {
			return res.status(401).send({ message: "Unauthorized" });
		}

		let tokenId = decoded.id;

		return Token.findOne({ where: { tokenId: tokenId }})
			.then(token => {
				if (!token) {
					return res.status(401).send({ message: "Unauthorized" });
				}

				return token
			})
			.then((token) => {

				let tokenId = uuid();

				return token.update({ tokenId }).then(() => {
					return {
						refreshToken: jwt.sign({ id: tokenId }, config.refreshSecret, { expiresIn: 86400 }),
						userId: token.userId,
					};
				})
			})
			.then(({ refreshToken, userId }) => {
				let accessToken = jwt.sign({ id: userId }, config.accessSecret, { expiresIn: 10 });

				return res.status(200).send({
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
			})
			.catch(err => {
				res.status(500).send({ message: err.message });
			});

	});
};