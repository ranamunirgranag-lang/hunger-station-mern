import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginSignup from './pages/LoginSignup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [activeOrdersList, setActiveOrdersList] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const [currentUserSession, setCurrentUserSession] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // 🎯 FETCH EVERYTHING FROM BACKEND AUTOMATICALLY
  const fetchAllDataFromBackend = async () => {
    try {
      // 1. Fetch live orders from MongoDB
      const ordersRes = await axios.get("http://localhost:5000/api/orders/fetch-all");
      if (ordersRes.data.status === "success") {
        setActiveOrdersList(ordersRes.data.orders);
      }
    } catch (err) {
      console.log("Backend offline or connection waiting...");
    }
  };

  const triggerGlobalLogout = () => {
    setCurrentUserSession({ isLoggedIn: false, name: "", email: "", phone: "", address: "" });
    setCartItems([]);
  };

  const cartCountCalculated = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    AOS.init({ duration: 400, once: false, mirror: true, offset: 40, easing: 'ease-out-quad' });
    fetchAllDataFromBackend(); // Loads MongoDB data instantly when website opens!
  }, []);

  return (
    <Router>
      <div className="main-wrapper">
        <Navbar cartCount={cartCountCalculated} currentUserSession={currentUserSession} />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginSignup setRegisteredUsers={setRegisteredUsers} setCurrentUserSession={setCurrentUserSession} onLoginSuccess={fetchAllDataFromBackend} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} currentUserSession={currentUserSession} setActiveOrdersList={setActiveOrdersList} onOrderPlaced={fetchAllDataFromBackend} />} />
            <Route path="/dashboard" element={<UserDashboard currentUserSession={currentUserSession} activeOrdersList={activeOrdersList} triggerGlobalLogout={triggerGlobalLogout} />} />
            <Route path="/admin" element={<AdminDashboard activeOrdersList={activeOrdersList} setActiveOrdersList={setActiveOrdersList} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
