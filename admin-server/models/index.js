const config = require("../config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = config.dbConfig.URL;
db.User = require('./users')(mongoose);

module.exports = db;