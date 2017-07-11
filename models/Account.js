const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  balance: {type: Number, default: 0, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  city: {type: String, required: true}
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account
