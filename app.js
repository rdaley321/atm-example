const express = require("express");
const app = express();
const passport = require("passport");
const BasicStrategy = require('passport-http').BasicStrategy;
const mongoose = require("mongoose");
const statusRoutes = require("./routes/status");
const accountRoutes = require("./routes/account");
const registrationRoutes = require("./routes/registration");

const bodyParser = require("body-parser");
// Connect and stuff
mongoose.Promise = require("bluebird");

// if an outside force has set the "NODE_ENV", use it. default to "development"
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
// If we are testing, use "mongodb://127.0.0.1:27017/atm_test"
console.log("We are using config.mongoUrl", config.mongoUrl)
mongoose.connect(config.mongoUrl)

const Account = require("./models/Account");

app.use(bodyParser.json())


passport.use(new BasicStrategy(
  function(username, password, done) {

    Account.findOne({username: username, password: password})
    .then( function(account){
      if(account){
        done(null, account)
      } else {
        done(null, false)
      }
    })
  }
));



app.use(statusRoutes)
app.use(registrationRoutes)
app.use(passport.authenticate('basic', {session: false}))
app.use(accountRoutes)

app.listen(3000, function(){
  console.log("Sup")
})

module.exports = app;
