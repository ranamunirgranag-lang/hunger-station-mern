// --- HUNGER STATION LIVE INCOMING ORDERS RADAR SCHEMA ---
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // Dynamic unique code trigger ORD-xxxx setup tracking matrix
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true,
    trim: true
  },
  // 👇 IN THE BASKET: Dynamic array storing full payload of multiple food products
  items: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      img: { type: String, required: true } // Preserves exact product image strings links!
    }
  ],
  totalBill: {
    type: Number,
    required: true
  },
  // 👇 THE INTERACTIVE FEEDBACK RESPONSE MATRIX LINKS
  adminResponse: {
    type: String,
    default: "Awaiting Chef Confirmation... ⏳" // Initial default entry string state
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Dispatched 🚀'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
