const express = require('express');
const router = express.Router();
const AccountHead = require('../../models/accounthead');
const AccountGroups = require('../../models/accountgroup'); // Import the AccountGroups model if not already imported



// Add a new Account Head
router.post('/add', async (req, res) => {
  try {
    const { accountname, accountgroup, accounttype } = req.body;

    const newAccountHead = new AccountHead({
      accountname,
      accountgroup,
      accounttype,
    });

    await newAccountHead.save();

    res.status(201).json({ message: 'Account Head added successfully', accountHead: newAccountHead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all Account Heads
router.get('/all', async (req, res) => {
  try {
    const accountHeads = await AccountHead.find().populate('accountgroup', 'grouptype groupname');
    res.status(200).json(accountHeads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an Account Head by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const accountHeadId = req.params.id;

    // Check if the Account Head exists
    const accountHead = await AccountHead.findById(accountHeadId);
    if (!accountHead) {
      return res.status(404).json({ message: 'Account Head not found' });
    }

    await AccountHead.findByIdAndDelete(accountHeadId);

    res.status(200).json({ message: 'Account Head deleted successfully', deletedAccountHead: accountHead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an Account Head by ID
router.put('/update/:id', async (req, res) => {
  try {
    const accountHeadId = req.params.id;
    const { accountname, accountgroup, accounttype } = req.body;

    // Check if the Account Head exists
    const accountHead = await AccountHead.findById(accountHeadId);
    if (!accountHead) {
      return res.status(404).json({ message: 'Account Head not found' });
    }

    // Update Account Head fields
    accountHead.accountname = accountname;
    accountHead.accountgroup = accountgroup;
    accountHead.accounttype = accounttype;

    // Save the updated Account Head
    await accountHead.save();

    res.status(200).json({ message: 'Account Head updated successfully', updatedAccountHead: accountHead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
