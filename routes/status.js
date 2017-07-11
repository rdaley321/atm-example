// Our status api
const express = require("express");
const router = express.Router();

router.get("/api/status", function(req, res){
  res.json({status: "ok"})
})

module.exports = router;
