const config = module.exports = {};

config.dbConfig = {
    DB_NAME: process.env.ADMIN_SERVER_INITDB_DATABASE || 'ADMIN_DATABASE',
    URL:  process.env.ADMIN_SERVER_INITDB_URL || 'mongodb://localhost:27017'
}

config.dbAdmin = {
    ADMINDB_ROOT_USERNAME:  process.env.ADMIN_SERVER_INITDB_ROOT_USERNAME || 'admin',
    ADMINDB_ROOT_PASSWORD:  process.env.ADMIN_SERVER_INITDB_ROOT_PASSWORD || 'password'
}

config.PORT = process.env.ADMIN_SERVER_PORT || 3000;
config.DEFAULT_SUBMIT_WAIT = 5000;

config.SALT_ROUNDS = 10;
config.JWT_SECRET = "EntA Votex Services"
config.PUBLIC_KEY = '024d4671a139a4a1d8b45b5863af2f3abfc160c4426de282fde43a1397012c060e';

config.swagger = {
    swaggerDefinition: {
        info: {
            description: "Admin Data Server",
            title: "Swagger",
            version: "1.0.0",
        },
        host: "localhost:"+config.PORT,
        basePath: "/",
        produces: [
            "application/json"
        ],
        schemes: ["https", "http"]
    },
    basedir: `${__dirname}`, //app absolute path
    files: ["../api/routes/**/*js"] //Path to the API handle folder, ../ because __dirname potins here, not to the app.js
};