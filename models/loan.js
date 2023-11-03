const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
  },
  loanTypNme: {
    type: String,
    required: true,
  },
  loanTypId: {
    type: String,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  emi: {
    type: Number,
    required: true,
  },
  roi: {
    type: Number,
    required: true,
  },
  loanAmt: {
    type: Number,
    required: true,
  },
  amtLeft: {
    type: Number,
    required: true,
  },
  noofInst: {
    type: Number,
    required: true,
  },
  sanction: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const Loan = mongoose.model("loans", loanSchema);

module.exports = Loan;
