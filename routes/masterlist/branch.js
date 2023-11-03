const router = require('express').Router();
const Branch = require('../../models/branch');

// Add a new branch
router.post('/add', async (req, res) => {
    try {
        const { branchcode, branchname, branchaddress, incharge, mobileno } = req.body;

        const newBranch = new Branch({
            branchcode,
            branchname,
            branchaddress,
            incharge,
            mobileno,
        });

        await newBranch.save();

        res.status(201).json({ message: 'Branch added successfully', branch: newBranch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all branches
router.get('/all', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a branch by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const branchId = req.params.id;

        // Check if the branch exists
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        await Branch.findByIdAndDelete(branchId);

        res.status(200).json({ message: 'Branch deleted successfully', deletedBranch: branch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a branch by ID
router.put('/update/:id', async (req, res) => {
    try {
        const branchId = req.params.id;
        const { branchcode, branchname, branchaddress, incharge, mobileno } = req.body;

        // Check if the branch exists
        const branch = await Branch.findById(branchId);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        // Update branch fields
        branch.branchcode = branchcode;
        branch.branchname = branchname;
        branch.branchaddress = branchaddress;
        branch.incharge = incharge;
        branch.mobileno = mobileno;

        // Save the updated branch
        await branch.save();

        res.status(200).json({ message: 'Branch updated successfully', updatedBranch: branch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
