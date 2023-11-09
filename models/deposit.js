const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  depositScheme: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  voucherNo:{
    type:String,
    required:true
  },
  type:String,
  debitAccount:String,
  creditAccount:String
});

const deposit = mongoose.model("deposits", depositSchema);

module.exports = deposit;
