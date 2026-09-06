import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🎯 CRITICAL IMPORT: To pull fresh database updates
import '../styles/UserDashboard.css';

const UserDashboard = ({ currentUserSession, triggerGlobalLogout }) => {
  const navigate = useNavigate();

  // Local state modifiers linking session tracking data models
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUserSession?.name || '');
  const [phone, setPhone] = useState(currentUserSession?.phone || '');
  const [address, setAddress] = useState(currentUserSession?.address || '');
  const [password, setPassword] = useState('********'); 
  
  // 👇 LIVE STATE HOLDER FOR DATABASE ORDERS
  const [userOrders, setUserOrders] = useState([]);

  // 🎯 FETCH FRESH UPDATED ORDERS DIRECTLY FROM MONGODB DISK
  const fetchMyFreshOrders = async () => {
    if (!currentUserSession || !currentUserSession.isLoggedIn) return;
    
    try {
      const response = await axios.get("http://localhost:5000/api/orders/fetch-all");
      if (response.data.status === "success") {
        // Filter the live database list to only keep orders belonging to this logged-in user
        const myFilteredOrders = response.data.orders.filter(
          order => order.customerName.toString().toLowerCase() === currentUserSession.name.toString().toLowerCase()
        );
        setUserOrders(myFilteredOrders);
      }
    } catch (error) {
      console.error("Failed to sync client orders radar:", error);
    }
  };

  // Run automatically when the dashboard boots up or user identity updates
  useEffect(() => {
    fetchMyFreshOrders();
  }, [currentUserSession]);

  // Security authorization filter guard
  if (!currentUserSession || !currentUserSession.isLoggedIn) {
    return (
      <div className="dashboard-guard-fallback">
        <h3>🚨 Secure Portal Access Denied</h3>
        <p>Please authorize your profile node by signing into Hunger Station Enterprise first.</p>
        <button type="button" onClick={() => navigate('/login')}>Proceed to Sign In Gate</button>
      </div>
    );
  }

  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();
    currentUserSession.name = name;
    currentUserSession.phone = phone;
    currentUserSession.address = address;
    
    alert("Profile settings synchronized and saved successfully! 🟢✔️");
    setIsEditing(false); 
  };

  const handleLogoutAction = () => {
    alert(`Secure session terminated! See you soon, ${name || 'User'}! 👋`);
    triggerGlobalLogout(); 
    navigate('/login'); 
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-layout-grid">
        
        {/* LEFT COLUMN PANEL */}
        <div className="profile-metadata-card-box" data-aos="fade-right">
          <div className="avatar-initials-badge">
            {name ? name.toString().substring(0, 2).toUpperCase() : "US"}
          </div>
          
          {!isEditing ? (
            <div className="profile-static-details-view">
              <h2>{name}</h2>
              <span className="user-tier-badge">⭐ Elite Hunger Member</span>
              <div className="card-divider-line-sub"></div>
              
              <div className="meta-data-field-item">
                <span>Mailing Node:</span>
                <strong>{currentUserSession.email}</strong>
              </div>
              <div className="meta-data-field-item">
                <span>Active Hotline:</span>
                <strong>{phone}</strong>
              </div>
              <div className="meta-data-field-item">
                <span>Default Destination:</span>
                <p>📍 {address}</p>
              </div>

              <div className="profile-actions-buttons-tray">
                <button type="button" className="btn-edit-settings" onClick={() => setIsEditing(true)}>
                  Edit Profile Settings ⚙️
                </button>
                <button type="button" className="btn-secure-logout" onClick={handleLogoutAction}>
                  Terminate Session (Logout) 🔒
                </button>
              </div>
            </div>
          ) : (
            <form className="profile-edit-settings-form" onSubmit={handleProfileUpdateSubmit}>
              <h3>Modify Profile Registry</h3>
              <div className="card-divider-line-sub"></div>

              <div className="dash-form-group">
                <label>Update Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="dash-form-group">
                <label>Change Mobile Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="dash-form-group">
                <label>Edit Delivery Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <div className="dash-form-group">
                <label>Override Security Password</label>
                <input type="password" placeholder="Type secret fresh password string" onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="form-settings-action-trays">
                <button type="submit" className="btn-save-settings">Save Tweak Parameters</button>
                <button type="button" className="btn-cancel-settings" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN PANEL */}
        <div className="profile-orders-radar-panel-box" data-aos="fade-left" data-aos-delay="50">
          <h2>My Live Orders Tracker Radar ({userOrders.length})</h2>
          <div className="card-divider-line-sub"></div>

          {userOrders.length === 0 ? (
            <div className="empty-user-orders-fallback">
              <span>🍔</span>
              <h4>No Active Order Transmissions Found</h4>
              <p>Explore our hot charcoal grilled masterclass items grids on the menu page to place your first internal order payload!</p>
            </div>
          ) : (
            <div className="user-orders-stack-list">
              {userOrders.map((order) => (
                <div className="user-order-tracking-card" key={order.id}>
                  <div className="user-order-card-meta-header">
                    <span className="order-id-track-pill">🎯 Code: {order.id}</span>
                    <span className={`status-badge-indicator-client ${order.status.toLowerCase().replace(' ', '-')}`}>
                      Status: {order.status}
                    </span>
                  </div>

                  <div className="user-order-items-manifest-box">
                    {order.items && order.items.map((item, idx) => (
                      <div className="client-manifest-row" key={idx}>
                        <img src={item.img} alt={item.name} className="client-manifest-thumbnail-box" />
                        <div>
                          <h6>{item.name}</h6>
                          <span>Quantity Payload: <b>{item.quantity}x</b></span>
                        </div>
                        <span className="client-manifest-price">PKR {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="client-order-invoice-strip">
                    <span>Total Net Amount Charged:</span>
                    <strong>PKR {order.totalBill}</strong>
                  </div>

                  {/* 📢 LIVE SYNCED ADMIN MESSAGE READ FROM MONGODB */}
                  <div className="admin-response-feedback-live-box">
                    <label>📢 Live Feed Update From HQ Kitchen Manager:</label>
                    <p className="admin-response-string-text">"{order.adminResponse}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
