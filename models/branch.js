const mongoose = require('mongoose');

// Define the Branch schema
const branchSchema = new mongoose.Schema({
  branchcode: {
    type: String,
    required: true
  },
  branchname: {
    type: String,
    required: true
  },
  branchaddress: {
    type: String,
    required: true
  },
  incharge: {
    type: String,
    required: true
  },
  mobileno: {
    type: String,
    required: true
  }
});

// Create the Branch model
const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
