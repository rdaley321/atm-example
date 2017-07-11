const express = require("express");
const app = express();
const statusRoutes = require("./routes/status");

app.use(statusRoutes)

app.listen(3000, function(){
  console.log("Sup")
})

module.exports = app;
