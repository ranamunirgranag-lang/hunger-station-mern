import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  // Live local states tracking database arrays
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [activeOrdersList, setActiveOrdersList] = useState([]);
  const [responseTexts, setResponseTexts] = useState({});

  // 🎯 CENTRAL REAL-TIME BACKEND ENDPOINTS
  const FETCH_ORDERS_URL = "http://localhost:5000/api/orders/fetch-all";
  const REPLY_ORDERS_BASE_URL = "http://localhost:5000/api/orders/admin-reply";

  // --- AUTOMATED DATABASE FETCH REFRESH ENGINE ---
  const fetchFreshDatabaseRecords = async () => {
    try {
      // 🚀 1. Fetch all live orders directly from MongoDB disk
      const ordersResponse = await axios.get(FETCH_ORDERS_URL);
      if (ordersResponse.data.status === "success") {
        setActiveOrdersList(ordersResponse.data.orders);
        
        // 🚀 2. Automatically build the clients directory using unique real customer names from orders!
        const uniqueCustomersMap = {};
        ordersResponse.data.orders.forEach(order => {
          if (!uniqueCustomersMap[order.customerName]) {
            uniqueCustomersMap[order.customerName] = {
              name: order.customerName,
              phone: order.phone,
              address: order.deliveryAddress,
              email: `${order.customerName.toLowerCase().replace(/\s+/g, '')}@hunger.com`
            };
          }
        });
        setRegisteredUsers(Object.values(uniqueCustomersMap));
      }
    } catch (error) {
      console.error("Database connection failure:", error);
    }
  };

  // Run automatically when the admin dashboard boots up
  useEffect(() => {
    fetchFreshDatabaseRecords();
  }, []);

  const handleInputChange = (orderId, val) => {
    setResponseTexts({ ...responseTexts, [orderId]: val });
  };

  // --- SAVE REPLY LIVE TRANSMISSION FUNCTION (MongoDB Overwrite) ---
  const handleSendResponseUpdate = async (orderId) => {
    const dispatchText = responseTexts[orderId];
    if (!dispatchText) {
      alert("Please enter a custom reply text first! 📝");
      return;
    }

    try {
      // 🚀 Sends input string straight to MongoDB update endpoint router
      const response = await axios.put(`${REPLY_ORDERS_BASE_URL}/${orderId}`, {
        adminResponse: dispatchText,
        status: "Dispatched 🚀"
      });

      if (response.data.status === "success") {
        alert(`Reply saved to database permanently for Code: ${orderId}! ✔️`);
        setResponseTexts({ ...responseTexts, [orderId]: '' });
        fetchFreshDatabaseRecords(); // Refreshes screen instantly with fresh database values
      }
    } catch (error) {
      alert("Failed to sync reply with database. Ensuring server is active!");
    }
  };

  return (
    <div className="admin-container">
      
      <div className="admin-header-pane" data-aos="fade-down">
        <span className="admin-tag">Central Command Station</span>
        <h1>Hunger Station Headquarters Management Panel</h1>
        <div className="admin-title-line"></div>
      </div>

      {/* --- REGISTERED CLIENT ACCOUNTS DIRECTORY (Pulled from Real Data) --- */}
      <section className="admin-section-block" data-aos="fade-up">
        <h2>Registered Client Accounts Directory ({registeredUsers.length})</h2>
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Profile Name</th>
                <th>Registered Email</th>
                <th>Hotline Phone</th>
                <th>Default Delivery Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td className="bold-user-name">👤 {user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="muted-address-cell">📍 {user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- INCOMING LIVE ORDERS FEED RADAR (100% Mapped to MongoDB) --- */}
      <section className="admin-section-block" data-aos="fade-up" data-aos-delay="50">
        <h2>Incoming Live Orders Feed Radar ({activeOrdersList.length})</h2>
        
        {activeOrdersList.length === 0 ? (
          <div className="empty-radar-fallback">🟢 No active orders inside database tracking records!</div>
        ) : (
          <div className="admin-orders-grid-cards">
            {activeOrdersList.map((order) => (
              <div className="admin-order-card" key={order.id}>
                
                <div className="card-order-meta-header">
                  <span className="order-id-pill">{order.id}</span>
                  <span className={`status-badge-indicator ${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-customer-credentials">
                  <h4>Customer: {order.customerName}</h4>
                  <p>📞 Phone: {order.phone}</p>
                  <p>📍 Destination: {order.deliveryAddress}</p>
                </div>

                <div className="card-divider-line-sub"></div>

                <div className="order-products-manifest-box">
                  <h5>Items Basket Payload:</h5>
                  <div className="manifest-items-stack">
                    {order.items && order.items.map((item, idx) => (
                      <div className="manifest-row-item-card" key={idx}>
                        <img src={item.img} alt={item.name} className="admin-product-thumbnail-cell" />
                        <div className="manifest-item-details-pane">
                          <h6>{item.name}</h6>
                          <span>Qty: <b>{item.quantity}x</b> | Unit: PKR {item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="manifest-total-invoice-strip">
                    <span>Total Cash Due Volume:</span>
                    <strong>PKR {order.totalBill}</strong>
                  </div>
                </div>

                <div className="card-divider-line-sub"></div>

                <div className="order-admin-feedback-action-hub">
                  <label>Current Status/Transmission Message Log:</label>
                  <div className="live-log-status-pill">{order.adminResponse}</div>
                  
                  <div className="admin-input-action-form-group">
                    <input 
                      type="text"
                      value={responseTexts[order.id] || ''}
                      onChange={(e) => handleInputChange(order.id, e.target.value)}
                      placeholder="e.g., 1 gnty tk pohnch jay ga! 🔥" 
                      className="admin-dispatch-reply-input"
                    />
                    <button 
                      type="button" 
                      className="admin-dispatch-reply-btn"
                      onClick={() => handleSendResponseUpdate(order.id)}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default AdminDashboard;
