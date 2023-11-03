const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortname: {
    type: String,
    required: true
  },
  accounthead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountHead',
    required: true
  }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
