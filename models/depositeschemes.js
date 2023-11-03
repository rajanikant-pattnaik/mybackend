const mongoose = require('mongoose');

// Define the DepositSchemes schema
const depositSchemesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortname: {
    type: String,
    required:true

  },
  accounthead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountHead',
    required: true
  }
});

// Create the DepositSchemes model
const DepositSchemes = mongoose.model('DepositSchemes', depositSchemesSchema);

module.exports = DepositSchemes;
