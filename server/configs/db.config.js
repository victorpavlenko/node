module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "Test123!",
	DB: "nodetest1",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};