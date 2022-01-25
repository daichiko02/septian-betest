const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  identityNumber: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema);
