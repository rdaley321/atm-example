// Our status api
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.post("/api/accounts", function(req, res){
  const account = new Account()
  account.name = req.body.name;
  account.username = req.body.username;
  account.city = req.body.city;
  account.password = req.body.password;
  account.save()
  .then(function(account){
    res.status(201).json({account: account})
  })
  .catch( function(error){
    res.status(422).json({
      error: error,
      account: account
    })
  })
})

module.exports = router;
