const express = require('express');
const router = express.Router();
const DepositSchemes = require('../../models/depositeschemes');



// Add a new Deposit Scheme
router.post('/add', async (req, res) => {
  try {
    const { name, shortname, accounthead } = req.body;

    const newDepositScheme = new DepositSchemes({
      name,
      shortname,
      accounthead,
    });

    await newDepositScheme.save();

    res.status(201).json({ message: 'Deposit Scheme added successfully', depositScheme: newDepositScheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all Deposit Schemes
router.get('/all', async (req, res) => {
  try {
    const depositSchemes = await DepositSchemes.find().populate('accounthead', 'accountname accountgroup accounttype');
    res.status(200).json(depositSchemes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a Deposit Scheme by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const depositSchemeId = req.params.id;

    // Check if the Deposit Scheme exists
    const depositScheme = await DepositSchemes.findById(depositSchemeId);
    if (!depositScheme) {
      return res.status(404).json({ message: 'Deposit Scheme not found' });
    }

    await DepositSchemes.findByIdAndDelete(depositSchemeId);

    res.status(200).json({ message: 'Deposit Scheme deleted successfully', deletedDepositScheme: depositScheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a Deposit Scheme by ID
router.put('/update/:id', async (req, res) => {
  try {
    const depositSchemeId = req.params.id;
    const { name, shortname, accounthead } = req.body;

    // Check if the Deposit Scheme exists
    const depositScheme = await DepositSchemes.findById(depositSchemeId);
    if (!depositScheme) {
      return res.status(404).json({ message: 'Deposit Scheme not found' });
    }

    // Update Deposit Scheme fields
    depositScheme.name = name;
    depositScheme.shortname = shortname;
    depositScheme.accounthead = accounthead;

    // Save the updated Deposit Scheme
    await depositScheme.save();

    res.status(200).json({ message: 'Deposit Scheme updated successfully', updatedDepositScheme: depositScheme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:error });
  }
});

module.exports = router;
