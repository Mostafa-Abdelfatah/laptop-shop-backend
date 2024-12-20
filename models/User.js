const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: [true, 'First name is required'],
  },
  Lname: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);
