const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  balance: {type: Number, default: 0, required: true}
})

const Account = mongoose.model('Account', accountSchema);
module.exports = Account
