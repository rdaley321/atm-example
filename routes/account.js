// Our status api
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.patch("/api/accounts/:id", function(req, res){
  Account.findOne({_id: req.params.id, username: req.user.username})
  .then( function(account){
    account.name = req.body.name;
    account.save()
    .then(function(account){
      res.json({account: account})
    })
  })
})

router.get("/api/accounts/:id",
  function(req, res){
    Account.findOne({_id: req.params.id, username: req.user.username})
    .then( function(account){
      if (account){
        res.json({account: account})
      } else {
        res.status(401).send("NICE TRY")
      }
    })
  }
)

function validateProperAmount(req,res,next){
  if (req.body.amount < 0){
    res.status(422).json({errorMessage: "Invalid Transation Entry"})
  } else {
    next()
  }
}

router.post("/api/accounts/:id/deposit", validateProperAmount, function(req, res){

  Account.findOne({_id: req.params.id, username: req.user.username})
  .then( function(account){
    account.balance += req.body.amount;
    account.save()
    .then( function(savedAccount){
      res.json({account: savedAccount})
    })
  })
})

router.post("/api/accounts/:id/withdraw", validateProperAmount, function(req, res){

  Account.findOne({_id: req.params.id, username: req.user.username})
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
