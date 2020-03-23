const verifyLogin = require("../middleware/verifyLogin");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
	app.post("/api/auth/new_token", controller.refreshToken);
	app.post("/api/auth/signup", [verifyLogin], controller.signup);
	app.post("/api/auth/signin", controller.signin);
	app.get("/api/auth/logout", controller.logout);
};