const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true,
  },
  voucherNo: {
    type: Number,
    required: true,
  },
  details: {
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
  acName: String,
  debitCredit: String,
  receiptSent: String,
});

const notes = mongoose.model("notes", notesSchema);

module.exports = notes;
