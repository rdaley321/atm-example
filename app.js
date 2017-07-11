const express = require("express");
const app = express();
const mongoose = require("mongoose");
const statusRoutes = require("./routes/status");
const accountRoutes = require("./routes/account");
const bodyParser = require("body-parser");
// Connect and stuff
mongoose.Promise = require("bluebird");

// if an outside force has set the "NODE_ENV", use it. default to "development"
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
// If we are testing, use "mongodb://127.0.0.1:27017/atm_test"
console.log("We are using config.mongoUrl", config.mongoUrl)
mongoose.connect(config.mongoUrl)

app.use(bodyParser.json())
app.use(statusRoutes)
app.use(accountRoutes)

app.listen(3000, function(){
  console.log("Sup")
})

module.exports = app;
