const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  Fname: {
    type: String,
    required: [true, 'Please add a name']
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
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Date_created: {
    type: Date,
    default: Date.now,
  },
  Date_updated: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ Date_updated: new Date() });
  next();
});

userSchema.pre('updateOne', function (next) {
  this.set({ Date_updated: new Date() });
  next();
});

// userSchema.pre('save', function (next) {
//   if (this.isNew) {
//     this.Date_updated = this.Date_created;
//   }
//   next();
// });


module.exports = mongoose.model('User', userSchema);