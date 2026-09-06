// --- HUNGER STATION PRODUCTION ORDER LIFECYCLE MANAGEMENT ROUTES ---
const express = require('express');
const Order = require('../models/Order'); // Import local database orders model schema

const router = express.Router();

// 🎯 ROUTE 1: INCOMING ORDER SUBMISSION TRANSPORTER (Saves fresh items from Cart)
router.post('/place-order', async (req, res) => {
  try {
    const { id, customerName, phone, deliveryAddress, items, totalBill } = req.body;

    // Direct instantiation mapping properties onto structural orders dataset schema models
    const freshOrderPacket = new Order({
      id,
      customerName,
      phone,
      deliveryAddress,
      items, // Spreads exact products loops list image array copies into MongoDB safely!
      totalBill
    });

    await freshOrderPacket.save(); // Permanently locks data inside database harddrive cluster
    res.status(201).json({ status: "success", message: "Order records locked inside cloud database successfully! ⚡", order: freshOrderPacket });

  } catch (error) {
    res.status(500).json({ status: "server_error", message: `Order Dispatch Database Error: ${error.message}` });
  }
});

// 🎯 ROUTE 2: CENTRAL RADAR STREAM FETCH TRACKER (Loads full order history streams)
router.get('/fetch-all', async (req, res) => {
  try {
    // Reads absolute entries from database collection sorted by newly created timelines
    const fullOrdersManifestList = await Order.find().sort({ createdAt: -1 });
    res.json({ status: "success", count: fullOrdersManifestList.length, orders: fullOrdersManifestList });
    
  } catch (error) {
    res.status(500).json({ status: "server_error", message: `Database Read Error: ${error.message}` });
  }
});

// 🎯 ROUTE 3: ADMIN KITCHEN CHANNELS REPLY OVERWRITE DISPATCHER (Save Reply Logic!)
router.put('/admin-reply/:id', async (req, res) => {
  try {
    const orderTrackingCodeId = req.params.id; // Extracts order code parameter from the link target query string URL
    const { adminResponse, status } = req.body;

    // Dynamic query search to target specific code id entry inside database disk
    const updatedOrderInstance = await Order.findOneAndUpdate(
      { id: orderTrackingCodeId },
      { 
        adminResponse: adminResponse, // Overwrites static waiting message logs with custom reply string
        status: status || 'Dispatched 🚀' 
      },
      { new: true } // Returns the fresh updated document right after completing mutation inside disk
    );

    if (!updatedOrderInstance) {
      return res.status(404).json({ status: "error", message: "Target order tracking profile id not found inside memory records! ❌" });
    }

    res.json({ status: "success", message: "Admin reply dispatched and saved permanently to server disk! ✔️", order: updatedOrderInstance });

  } catch (error) {
    res.status(500).json({ status: "server_error", message: `Admin Response Transmission Fail: ${error.message}` });
  }
});

module.exports = router;
