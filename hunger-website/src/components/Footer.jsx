import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Welcome to the Hunger Clique! 🔥 Vouchers arriving soon.");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Info (Stable - No AOS) */}
        <div className="footer-brand">
          <h3>Hunger<span>Station</span></h3>
          <p className="brand-pitch">
            Lahore's ultimate premium online food hub. We craft culinary masterpieces, 
            delivering smoking hot gourmet burgers and fusions straight to your doorstep.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-tag">IG</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-tag">FB</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-tag">GH</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-tag">LN</a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home Portal</Link></li>
            <li><Link to="/menu">Explore Menu</Link></li>
            <li><Link to="/about">Our Kitchen Story</Link></li>
            <li><Link to="/contact">Reach Out</Link></li>
          </ul>
        </div>

        {/* Column 3: Timing Modules */}
        <div className="footer-timing">
          <h4>Opening Hours</h4>
          <div className="time-block">
            <h5>📅 Weekdays</h5>
            <p>Mon - Fri: 11:00 AM - 12:00 AM</p>
          </div>
          <div className="time-block">
            <h5>🔥 Late Nights</h5>
            <p>Sat - Sun: 11:00 AM - 02:00 AM</p>
          </div>
          <span className="operational-badge">🟢 Accepting Live Orders</span>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-contact">
          <h4>Contact Matrix</h4>
          <p className="contact-item">📍 MM Alam Road, Gulberg III, Lahore</p>
          <p className="contact-item">📞 +92 300 1234567</p>
          <p className="contact-item">✉️ help@hungerstation.com</p>
        </div>

        {/* Column 5: Newsletter Subscribe Box */}
        <div className="footer-newsletter">
          <h4>Join The Clique</h4>
          <p>Get 50% secret midnight flash deals and chef special promo vouchers.</p>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter email..." 
              required 
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-btn">Join</button>
          </form>
        </div>

      </div>

      {/* Bottom Legal compliance bar */}
      <div className="footer-bottom">
        <div className="bottom-wrap">
          <p>&copy; {new Date().getFullYear()} Hunger Station Enterprise. All Rights Reserved. Designed for Premium Internship Portfolio.</p>
          <div className="legal-links">
            <Link to="/about">Privacy</Link>
            <span className="dot-separator">•</span>
            <Link to="/about">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
