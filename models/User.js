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
    required: [true, 'email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    validate: {
      validator: (value) => {
        return value.trim().length >= 6;
      },
      message: 'Password must be at least 6 characters long',
    },
  },
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);
