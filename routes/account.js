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

router.post("/api/accounts/:id/withdraw", function(req, res){
  Account.findOne({_id: req.params.id})
  .then( function(account){
    responseObject = {}
    account.balance -= req.body.amount;

    if (account.balance < 0){
      // Add dem fees
      account.balance -= 35
      // Add errorMessage to our responseObject
      responseObject.errorMessage = "Overdraft charged. Party On."
    }
    account.save()
    .then( function(savedAccount){
      responseObject.account = savedAccount
      res.json(responseObject)
    })
  })
})

module.exports = router;
