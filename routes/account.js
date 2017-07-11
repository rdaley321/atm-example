// Our status api
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.get("/api/accounts/:id", function(req, res){
  Account.findOne({_id: req.params.id})
  .then( function(account){
    res.json({account: account})
  })
})

router.post("/api/accounts/:id/deposit", function(req, res){
  Account.findOne({_id: req.params.id})
  .then( function(account){
    account.balance += req.body.amount;
    account.save()
    .then( function(savedAccount){
      res.json({account: savedAccount})
    })
  })
})

module.exports = router;
