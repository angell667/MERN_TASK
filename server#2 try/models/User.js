// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'user'], required: true, default: 'user' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
