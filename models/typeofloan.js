const mongoose = require('mongoose');

// Define the TypeOfLoan schema
const typeOfLoanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortname: {
    type: String,
    required: true
  },
  accountHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountHead',
    required: true
  },
  interest: {
    type: Number,
    required: true
  },
  maximumloan: {
    type: Number,
    required: true
  },
  maximumemi: {
    type: Number,
    required: true
  }
});

// Create the TypeOfLoan model
const TypeOfLoan = mongoose.model('TypeOfLoan', typeOfLoanSchema);

module.exports = TypeOfLoan;
