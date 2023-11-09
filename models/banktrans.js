const mongoose = require("mongoose");

const banktransSchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true,
  },
  voucherNo: {
    type: Number,
    required: true,
  },
  voucherType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  narration: String,
  accountHead: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bankAccount: String,
  chequeNo: String,
  chequeDate: Date,
});

const banktrans = mongoose.model("banktrans", banktransSchema);

module.exports = banktrans;
