module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define("files", {
		filename: {
			type: Sequelize.STRING
		},
		name: {
			type: Sequelize.STRING
		},
		size: {
			type: Sequelize.STRING
		},
		mime: {
			type: Sequelize.STRING
		},
		ext: {
			type: Sequelize.STRING
		},
		userId: {
			type: Sequelize.INTEGER
		}
	});

	return File;
};