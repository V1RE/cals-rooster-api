const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  infoweb: {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

module.exports.user = mongoose.model('User', userSchema);
