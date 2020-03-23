const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const Token = db.token;

verifyToken = (req, res, next) => {

	if ( req.url.includes('signup') ||
		 req.url.includes('signin') ||
		 req.url.includes('new_token')
	) {
		next();
		return;
	}

	let token;

	if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return res.status(403).send({
			message: "No token provided"
		});
	}

	jwt.verify(token, config.accessSecret, {},(err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized"
			});
		}

		let newToken = jwt.sign({ id: decoded.id }, config.accessSecret, { expiresIn: 10 })
		res.setHeader('x-token', newToken);
		req.userId = decoded.id;
		next();
	});
};

module.exports = verifyToken;
