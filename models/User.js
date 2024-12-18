const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  Fname:{
    type: String,
    required: [true, 'Please add a name']
  },
  Lname:{
    type: String,
    required: [true, 'Please add a name']
  },
  phone: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model('User', userSchema);