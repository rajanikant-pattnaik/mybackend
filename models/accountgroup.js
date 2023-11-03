const mongoose = require('mongoose');

// Define the AccountGroups schema
const accountGroupsSchema = new mongoose.Schema({
  grouptype: {
    type: String,
    required: true
  },
  groupname: {
    type: String,
    required: true
  },
  ID: {
    type: String,  // or whichever type you are using for ID
    unique: false  // set to false if you don't need it to be unique
  }
});



// Create the AccountGroups model
const AccountGroups = mongoose.model('AccountGroups', accountGroupsSchema);

module.exports = AccountGroups;
