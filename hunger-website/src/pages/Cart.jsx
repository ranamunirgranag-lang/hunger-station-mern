import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // 🎯 Absolute critical import to bridge database channels
import '../styles/Cart.css';

const Cart = ({ cartItems, setCartItems, currentUserSession, setActiveOrdersList, onOrderPlaced }) => {
  const [customerName, setCustomerName] = useState(currentUserSession?.name || '');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUserSession?.address || '');
  const [phone, setPhone] = useState(currentUserSession?.phone || '');
  
  const navigate = useNavigate();

  // 🎯 REAL-TIME LOCALHOST BACKEND ORDER ENDPOINT LINK
  const ORDERS_API_URL = "http://localhost:5000/api/orders/place-order";

  const updateQuantity = (id, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharges = cartItems.length > 0 ? 120 : 0;
  const totalBill = subtotal + deliveryCharges;

  // --- THE AXIOS REAL-TIME DATA DISPATCH DISPATCH ENGINE ---
  const handlePlaceOrderDirectly = async (e) => {
    e.preventDefault();

    if (!customerName || !deliveryAddress || !phone) {
      alert("Please fill in all Delivery credentials parameters completely! 📍");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your basket is empty! Browse items from the menu first. 🛒");
      return;
    }

    const uniqueOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const freshOrderPayload = {
      id: uniqueOrderId,
      customerName: customerName,
      phone: phone,
      deliveryAddress: deliveryAddress,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        img: item.img
      })),
      totalBill: totalBill
    };

    try {
      // 🚀 AXIOS POST CHANNEL: Dispatches the exact payload array to your Node/Express database disk
      const response = await axios.post(ORDERS_API_URL, freshOrderPayload);
      
      if (response.data.status === "success") {
        // Synchronizes the localized react contexts reactively
        setActiveOrdersList(prevOrders => [response.data.order, ...prevOrders]);
        
        alert(`Order Locked inside MongoDB Database! ⚡ Tracking Code: ${uniqueOrderId}`);
        
        setCartItems([]); // Cleans shopping basket memory instantly right after checkout
        
        // 🎯 CRITICAL SYSTEM RETRIEVAL BRIDGE: Forces App.jsx to instantly re-fetch counts from MongoDB disk
        if (onOrderPlaced) {
          onOrderPlaced();
        }
        
        navigate('/dashboard'); // Direct forward user to user portal timeline dashboard
      }
    } catch (error) {
      alert(error.response?.data?.message || "Network Engine transmission fail! Is your backend server terminal running?");
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-wrapper">
        
        {/* Left Side: Dynamic Basket Item Card Slots */}
        <div className="cart-items-panel" data-aos="fade-right">
          <h2>Your Food Basket ({cartItems.length})</h2>
          <div className="cart-divider-line"></div>

          {cartItems.length === 0 ? (
            <div className="empty-basket-fallback">
              <span className="empty-basket-icon">🛒</span>
              <h3>Your basket is completely empty</h3>
              <p>Explore our masterclass food slots and claim your dynamic vouchers today!</p>
              <Link to="/menu" className="return-menu-btn">Browse Menu 🍔</Link>
            </div>
          ) : (
            <div className="cart-items-stack">
              {cartItems.map(item => (
                <div className="cart-row-card" key={item.id}>
                  <img src={item.img} alt={item.name} className="cart-item-thumbnail" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <span className="cart-item-unit-price">PKR {item.price} each</span>
                  </div>
                  <div className="cart-qty-counter">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <span className="cart-item-total-price">PKR {item.price * item.quantity}</span>
                  <button type="button" className="cart-remove-item-btn" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Checkout Input Matrix Form Panel */}
        <div className="cart-summary-panel" data-aos="fade-left" data-aos-delay="100">
          <div className="summary-card-box">
            <h3>Checkout Details</h3>
            <div className="cart-divider-line"></div>

            <form className="summary-delivery-form" onSubmit={handlePlaceOrderDirectly}>
              <div className="summary-form-group">
                <label>Receiver Name</label>
                <input 
                  type="text" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  required 
                />
              </div>
              <div className="summary-form-group">
                <label>Hotline Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
              <div className="summary-form-group">
                <label>Exact Delivery Address (Lahore)</label>
                <input 
                  type="text" 
                  value={deliveryAddress} 
                  onChange={(e) => setDeliveryAddress(e.target.value)} 
                  required 
                />
              </div>

              <div className="invoice-receipt-sheet">
                <div className="invoice-row"><span>Items Subtotal</span><span>PKR {subtotal}</span></div>
                <div className="invoice-row"><span>Delivery Fee</span><span>PKR {deliveryCharges}</span></div>
                <div className="invoice-row calculation-total-line"><span>Total Payable</span><span>PKR {totalBill}</span></div>
              </div>

              <button type="submit" className="summary-checkout-whatsapp-btn">
                Place Order Internally ⚡
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
