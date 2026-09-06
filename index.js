// --- HUNGER STATION CENTRAL DATABASE BACKEND ENGINE ---
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Database Handshake Gateway Import
const connectDatabaseEngine = require('./config/db');

// 👇 EXPLICIT ROUTING PIPELINES IMPORTS LAYER
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Production Middleware Configuration Sheets
app.use(cors());
app.use(express.json()); // Allows server to process raw JSON data payloads

// Trigger Handshake Connection Pipeline With MongoDB Cloud Database
connectDatabaseEngine();

// 🎯 REGISTERING DYNAMIC ENDPOINT ACCESS SYSTEM ROUTES
app.use('/api/auth', authRoutes);   // Handles login registries and profile structures mapping
app.use('/api/orders', orderRoutes); // Handles cart checkout payloads and admin save reply logic

// Base Route Matrix Verification (Initial tracking validation logs)
app.get('/', (req, res) => {
  res.json({ 
    status: "success", 
    message: "🟢 Hunger Station Live Production Database Server Running Flawlessly!" 
  });
});

// Launching operational port tracking listening logs
app.listen(PORT, () => {
  console.log(`🚀 Database Engine active and tracking live channels on Port: ${PORT}`);
});
