const express = require('express');
const router = express.Router();
const AccountGroups = require('../../models/accountgroup');



// Add a new Account Group
router.post('/add', async (req, res) => {
  try {
    const { grouptype, groupname } = req.body;

    const newAccountGroup = new AccountGroups({
      grouptype,
      groupname,
    });

    await newAccountGroup.save();

    res.status(201).json({ message: 'Account Group added successfully', accountGroup: newAccountGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// Get all Account Groups
router.get('/all', async (req, res) => {
  try {
    const accountGroups = await AccountGroups.find();
    res.status(200).json(accountGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an Account Group by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const accountGroupId = req.params.id;

    // Check if the Account Group exists
    const accountGroup = await AccountGroups.findById(accountGroupId);
    if (!accountGroup) {
      return res.status(404).json({ message: 'Account Group not found' });
    }

    await AccountGroups.findByIdAndDelete(accountGroupId);

    res.status(200).json({ message: 'Account Group deleted successfully', deletedAccountGroup: accountGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an Account Group by ID
router.put('/update/:id', async (req, res) => {
  try {
    const accountGroupId = req.params.id;
    const { grouptype, groupname } = req.body;

    // Check if the Account Group exists
    const accountGroup = await AccountGroups.findById(accountGroupId);
    if (!accountGroup) {
      return res.status(404).json({ message: 'Account Group not found' });
    }

    // Update Account Group fields
    accountGroup.grouptype = grouptype;
    accountGroup.groupname = groupname;

    // Save the updated Account Group
    await accountGroup.save();

    res.status(200).json({ message: 'Account Group updated successfully', updatedAccountGroup: accountGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
