const mongoose = require("mongoose");
const loanAppSchema = new mongoose.Schema({
  applicationNo: {
    type: String,
    unique:true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  memberName: {
    type: String,
    required: true,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  shareAmount: {
    type: Number,
    required: true,
  },
  loanScheme: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  loanPurpose: {
    type: String,
  },
  place: {
    type: String,
  },
});
const LoanApp = mongoose.model("loanapps", loanAppSchema);

module.exports = LoanApp;
