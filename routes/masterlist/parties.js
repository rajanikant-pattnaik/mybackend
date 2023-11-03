const express = require('express');
const router = express.Router();
const Parties = require('../../models/parties');

// Middleware to parse JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Add a new Party
router.post('/add', async (req, res) => {
  try {
    const { name, type, address, mobileno, email } = req.body;

    const newParty = new Parties({
      name,
      type,
      address,
      mobileno,
      email,
    });

    await newParty.save();

    res.status(201).json({ message: 'Party added successfully', party: newParty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all Parties
router.get('/all', async (req, res) => {
  try {
    const parties = await Parties.find();
    res.status(200).json(parties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a Party by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const partyId = req.params.id;

    // Check if the Party exists
    const party = await Parties.findById(partyId);
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    await Parties.findByIdAndDelete(partyId);

    res.status(200).json({ message: 'Party deleted successfully', deletedParty: party });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a Party by ID
router.put('/update/:id', async (req, res) => {
  try {
    const partyId = req.params.id;
    const { name, type, address, mobileno, email } = req.body;

    // Check if the Party exists
    const party = await Parties.findById(partyId);
    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    // Update Party fields
    party.name = name;
    party.type = type;
    party.address = address;
    party.mobileno = mobileno;
    party.email = email;

    // Save the updated Party
    await party.save();

    res.status(200).json({ message: 'Party updated successfully', updatedParty: party });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
