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

module.exports = router;
