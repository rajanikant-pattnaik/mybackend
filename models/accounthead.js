const mongoose = require('mongoose');

// Define the AccountHead schema
const accountHeadSchema = new mongoose.Schema({

  accountname: {
    type: String,
    required: true
  },
  accountgroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountGroups',
    required: true
  },
  accounttype: {
    type: String,
    required: true
  }
});

// Create the AccountHead model
const AccountHead = mongoose.model('AccountHead', accountHeadSchema);

module.exports = AccountHead;
