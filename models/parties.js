const mongoose = require('mongoose');

// Define the Parties schema
const partiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobileno: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Create the Parties model
const Parties = mongoose.model('Parties', partiesSchema);

module.exports = Parties;
