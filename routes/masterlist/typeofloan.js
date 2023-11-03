const express = require('express');
const router = express.Router();
const TypeOfLoan = require('../../models/typeOfLoan');

// Add a new Type of Loan
router.post('/add', async (req, res) => {
  try {
    const { name, shortname, accountHead, interest, maximumloan, maximumemi } = req.body;

    const newTypeOfLoan = new TypeOfLoan({
      name,
      shortname,
      accountHead,
      interest,
      maximumloan,
      maximumemi,
    });

    await newTypeOfLoan.save();

    res.status(201).json({ message: 'Type of Loan added successfully', typeOfLoan: newTypeOfLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all Types of Loans with populated AccountHead
router.get('/all', async (req, res) => {
  try {
    const typesOfLoan = await TypeOfLoan.find().populate('accountHead');
    res.status(200).json(typesOfLoan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a Type of Loan by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const typeOfLoanId = req.params.id;

    // Check if the Type of Loan exists
    const typeOfLoan = await TypeOfLoan.findById(typeOfLoanId);
    if (!typeOfLoan) {
      return res.status(404).json({ message: 'Type of Loan not found' });
    }

    await TypeOfLoan.findByIdAndDelete(typeOfLoanId);

    res.status(200).json({ message: 'Type of Loan deleted successfully', deletedTypeOfLoan: typeOfLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a Type of Loan by ID
router.put('/update/:id', async (req, res) => {
  try {
    const typeOfLoanId = req.params.id;
    const { name, shortName, accountHead, interest, maximumloan, maximumemi } = req.body;

    // Check if the Type of Loan exists
    const typeOfLoan = await TypeOfLoan.findById(typeOfLoanId);
    if (!typeOfLoan) {
      return res.status(404).json({ message: 'Type of Loan not found' });
    }

    // Update Type of Loan fields
    typeOfLoan.name = name;
    typeOfLoan.shortName = shortName;
    typeOfLoan.accountHead = accountHead;
    typeOfLoan.interest = interest;
    typeOfLoan.maximumloan = maximumloan;
    typeOfLoan.maximumemi = maximumemi;

    // Save the updated Type of Loan
    await typeOfLoan.save();

    res.status(200).json({ message: 'Type of Loan updated successfully', updatedTypeOfLoan: typeOfLoan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
