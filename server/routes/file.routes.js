const controller = require("../controllers/file.controller");


module.exports = function(app, upload) {
	app.post("/api/file/upload", [upload], controller.uploadFile);
	app.get("/api/file/list", controller.getFiles);
	app.get("/api/file/:id", controller.getFile);
	app.get("/api/file/download/:id", controller.downloadFile);
	app.put("/api/file/update/:id", [upload], controller.updateFile);
	app.delete("/api/file/delete/:id", controller.deleteFile);
};