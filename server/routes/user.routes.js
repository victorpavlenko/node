const controller = require("../controllers/user.controller");

module.exports = function(app) {
	app.get("/api/user/info", controller.userInfo);
};