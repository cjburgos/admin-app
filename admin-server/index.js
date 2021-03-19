const config = require('./config');
const api = require('./api');
const express = require('express');
const db = require('./models');
const expressSwaggerGenerator = require("express-swagger-generator");

const app = express();
const expressSwagger = expressSwaggerGenerator(app);
const port = config.PORT;

/**
 *  App Configuration
 */

expressSwagger(config.swagger);

/**
 * Routes Definitions
 */

app.use('/',api)

db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(port, () => {
    console.log(`Admin Database Server listening on port ${port}`)
})
