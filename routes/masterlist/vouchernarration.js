const express = require('express');
const router = express.Router();
const Voucher = require('../../models/vouchernarration');

// Middleware to parse JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Add a new Voucher
router.post('/add', async (req, res) => {
  try {
    const { name, shortname, accounthead } = req.body;

    const newVoucher = new Voucher({
      name,
      shortname,
      accounthead,
    });

    await newVoucher.save();

    res.status(201).json({ message: 'Voucher added successfully', voucher: newVoucher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all Vouchers
router.get('/all', async (req, res) => {
  try {
    const vouchers = await Voucher.find().populate('accounthead', 'accountname accountgroup accounttype');
    res.status(200).json(vouchers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a Voucher by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const voucherId = req.params.id;

    // Check if the Voucher exists
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }

    await Voucher.findByIdAndDelete(voucherId);

    res.status(200).json({ message: 'Voucher deleted successfully', deletedVoucher: voucher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a Voucher by ID
router.put('/update/:id', async (req, res) => {
  try {
    const voucherId = req.params.id;
    const { name, shortname, accounthead } = req.body;

    // Check if the Voucher exists
    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }

    // Update Voucher fields
    voucher.name = name;
    voucher.shortname = shortname;
    voucher.accounthead = accounthead;

    // Save the updated Voucher
    await voucher.save();

    res.status(200).json({ message: 'Voucher updated successfully', updatedVoucher: voucher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
