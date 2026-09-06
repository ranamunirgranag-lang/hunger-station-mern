// --- HUNGER STATION USER PROFILE SCHEMA ACCOUNT REGISTRY ---
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your authentic full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your registered mailing node email'],
    unique: true, // Ensures no duplicate emails can bypass the sign-up gate
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide an active hotline mobile number'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Please provide a valid delivery destination coordinates address'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a strict security password string']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' // Default status parameters setup for regular clients
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatic timestamp log generator metrics
  }
});

module.exports = mongoose.model('User', UserSchema);
