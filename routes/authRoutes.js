// --- HUNGER STATION SECURE ACCESS AUTHENTICATION ROUTES CONTROLLER ---
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import local database schema model

const router = express.Router();

// 🎯 ROUTE 1: PROFILE ACCOUNT REGISTRY ENTRY POINT (Create Profile Handler)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    // Checks registry parameters to see if profile node already exists
    let userInstance = await User.findOne({ email });
    if (userInstance) {
      return res.status(400).json({ status: "error", message: "Profile already provisioned with this email address node! ❌" });
    }

    // Dynamic Hashing Mechanism: Secure encryption layer protects passwords using bcrypt algorithms parameters
    const encryptionSalt = await bcrypt.genSalt(10);
    const encryptedPasswordString = await bcrypt.hash(password, encryptionSalt);

    // Save fresh structural account data straight to cloud disk harddrive memory matching the model schemas
    userInstance = new User({
      name,
      email,
      phone,
      address,
      password: encryptedPasswordString // Overwrites raw text password with secure hash matching safety rules
    });

    await userInstance.save();
    res.status(201).json({ status: "success", message: "Account profile provisioned inside cloud successfully! 🟢" });

  } catch (error) {
    res.status(500).json({ status: "server_error", message: `Registry Pipeline Failure: ${error.message}` });
  }
});

// 🎯 ROUTE 2: PROFILE SECURE LOG-IN VALIDATOR GATEWAY (Sign In User and Admin Verification Handshake)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Core verification checking parameters matching registered email collections
    const userInstance = await User.findOne({ email });
    if (!userInstance) {
      return res.status(400).json({ status: "error", message: "Invalid email node or password parameters! ❌" });
    }

    // 2. Cryptographic password string tracking validation match
    const isPasswordMatching = await bcrypt.compare(password, userInstance.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ status: "error", message: "Invalid email node or password parameters! ❌" });
    }

    // 3. Generating JSON Web Token (JWT) session security string tracker to pass dashboard keys safely
    const customSessionToken = jwt.sign(
      { userId: userInstance._id, role: userInstance.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Session remains active for exactly one week timelines parameters
    );

    // 4. Output response package matches all conditions to pass data to frontend state context hooks
    res.json({
      status: "success",
      token: customSessionToken,
      user: {
        id: userInstance._id,
        name: userInstance.name,
        email: userInstance.email,
        phone: userInstance.phone,
        address: userInstance.address,
        role: userInstance.role // Direct pass user vs admin roles indicators!
      }
    });

  } catch (error) {
    res.status(500).json({ status: "server_error", message: `Login Engine Handshake Crash: ${error.message}` });
  }
});

module.exports = router;
