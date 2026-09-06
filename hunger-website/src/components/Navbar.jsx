import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ cartCount = 0, currentUserSession }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Safely extracts the first two letters of user name for the dynamic profile avatar bubble
  const getUserInitials = () => {
    if (!currentUserSession || !currentUserSession.name) return "US";
    return currentUserSession.name.toString().substring(0, 2).toUpperCase();
  };

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="navbar-logo">
        <Link to="/">Hunger<span>Station</span></Link>
      </div>

      {/* Hamburger Icon For Mobile */}
      <div className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Center Navigation Links */}
      <ul className={`navbar-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
        <li><Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link></li>
        <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
      </ul>

      {/* Right Side Actions Panel */}
      <div className="navbar-actions">
        
        {/* 🎯 THE WOW CONDITIONAL AVATAR ENGINE MODULE */}
        {currentUserSession && currentUserSession.isLoggedIn ? (
          /* If user session active: Display dynamic slick Initials DP bubble link */
          <div 
            className="navbar-profile-avatar-bubble"
            onClick={() => navigate('/dashboard')}
            title="Go to User Dashboard Control Tower"
          >
            {getUserInitials()}
          </div>
        ) : (
          /* Fallback default state: If logged out, render standard Sign In links */
          <Link to="/login" className="login-link">Sign In</Link>
        )}

        <Link to="/cart" className="cart-btn">
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
