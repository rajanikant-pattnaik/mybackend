const mongoose = require("mongoose");

const depositAdjuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  depositScheme: {
    type: String,
    required: true,
  },
  principalAdjustment: {
    type: Number,
    required: true,
  }
});

const depositAdjust = mongoose.model("depositadjusts", depositAdjuSchema);

module.exports = depositAdjust;
