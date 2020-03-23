module.exports = (sequelize, Sequelize) => {
	const Token = sequelize.define("tokens", {
		userId: {
			type: Sequelize.INTEGER,
		},
		tokenId: {
			type: Sequelize.STRING
		}
	});

	return Token;
};