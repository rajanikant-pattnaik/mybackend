const mongoose = require("mongoose");

const loanSanctSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sanctionNo: {
    type: String,
    unique:true,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
  loanScheme: {
    type: String,
    required: true,
  },
  noOfInstallment: {
    type: Number,
    required: true,
  },
  sanctionAmount: {
    type: Number,
    required: true,
  },
  netAmount: {
    type: Number,
    required: true,
  },
  collectionToStart: {
    type: Date,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  chequeNo: {
    type: String,
    required: true,
  },
  monthlyDeduction: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  cashOrBank: {
    type: String,
    required: true,
  },
  closeDate:{
    type:Date
  }
});

const LoanSanct = mongoose.model("loansanction", loanSanctSchema);

module.exports = LoanSanct;
