const env = process.env.NODE_ENV || "global"
    , config = require("./config."+env);

module.exports = config;