const express = require("express");
const app = express();
const mongoose = require("mongoose");
const statusRoutes = require("./routes/status");
const accountRoutes = require("./routes/account");

// Connect and stuff
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://127.0.0.1:27017/atm")

app.use(statusRoutes)
app.use(accountRoutes)

app.listen(3000, function(){
  console.log("Sup")
})

module.exports = app;
