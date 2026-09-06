import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Elite corporate eye icons pack vectors
import axios from 'axios'; // Imported Axios Messenger
import '../styles/LoginSignup.css';

const LoginSignup = ({ setRegisteredUsers, setCurrentUserSession }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Registration data fields states matrix
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 👇 VISIBILITY TOGGLE ENGINE CORE STATES
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // 🎯 LIVE BACKEND GATEWAY LINK: (Abhi local chalega, baad me Railway ka direct link yahan replace kr denge)
  const BACKEND_URL = "http://localhost:5000/api/auth"; 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // --- SECRET ADMIN BACKDOOR PIPELINE LINK ---
    if (isLoginMode && email === "admin@hungerstation.com" && password === "admin123") {
      alert("System Master Verified! 🟢 Welcome back, Commander Admin.");
      navigate('/admin');
      return;
    }

    try {
      if (isLoginMode) {
        // --- 🚀 REAL TIME LIVE LOGIN AXIOS API ENGINE REQUEST ---
        const response = await axios.post(`${BACKEND_URL}/login`, { email, password });
        
        if (response.data.status === "success") {
          alert(`Welcome back! Login successful.`);
          
          // Setting reactive profile parameters directly from database cluster returning tokens
          setCurrentUserSession({ 
            isLoggedIn: true, 
            name: response.data.user.name, 
            email: response.data.user.email,
            phone: response.data.user.phone,
            address: response.data.user.address
          });
          
          navigate('/dashboard'); // Direct forward user safely inside active tracking panel
        }
      } else {
        if (password !== confirmPassword) {
          alert("Password mismatch! Please cross-check your password field slots. ❌");
          return;
        }

        // --- 🚀 REAL TIME LIVE SIGNUP AXIOS API ENGINE REQUEST ---
        const response = await axios.post(`${BACKEND_URL}/register`, { name, email, phone, address, password });
        
        if (response.data.status === "success") {
          alert(`Account successfully created for ${name}! Please sign in now using your fresh credentials. 👤`);
          setIsLoginMode(true); // Switches user smoothly back to log in framework dashboard
        }
      }
    } catch (error) {
      // Graceful error prompt alerts if server connection fails
      alert(error.response?.data?.message || "Database connection pipeline break! Please ensure backend is active.");
    }

    // Cleaning form states memory fields
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container">
      <div className="auth-split-wrapper">
        
        {/* Left Side: Visual Pitch */}
        <div className="auth-visual-panel" data-aos="fade-right">
          <div className="visual-overlay"></div>
          <div className="visual-content">
            <span className="visual-tag">The Hunger Station Clique</span>
            <h2>Unlock Premium Taste Slots & Midnight Flash Coupons</h2>
            <p>Join over 50,000+ food artisans and street food connoisseurs across Lahore tracking hot cheese explosions live daily.</p>
          </div>
        </div>

        {/* Right Side: High Contrast Input Matrix Elements */}
        <div className="auth-form-panel" data-aos="fade-left">
          <div className="auth-card-box">
            
            <div className="auth-toggle-headers">
              <button 
                type="button" 
                className={`toggle-tab-btn ${isLoginMode ? 'active-tab' : ''}`}
                onClick={() => setIsLoginMode(true)}
              >
                Sign In
              </button>
              <button 
                type="button" 
                className={`toggle-tab-btn ${!isLoginMode ? 'active-tab' : ''}`}
                onClick={() => setIsLoginMode(false)}
              >
                Create Profile
              </button>
            </div>

            <form className="auth-core-form" onSubmit={handleFormSubmit}>
              
              {!isLoginMode && (
                <>
                  <div className="auth-group input-pop">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Hamza Ali" 
                      required 
                    />
                  </div>

                  <div className="auth-group input-pop">
                    <label>Active Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 03001234567" 
                      required 
                    />
                  </div>

                  <div className="auth-group input-pop">
                    <label>Delivery Home Address</label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g., House 45, Phase 6, DHA, Lahore" 
                      required 
                    />
                  </div>
                </>
              )}

              <div className="auth-group">
                <label>Registered Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                />
              </div>

              {/* SECURITY PASSWORD INPUT FIELDS BLOCK WITH INTERACTIVE EYE BUTTON (👁️) */}
              <div className="auth-group">
                <label>Security Password</label>
                <div className="password-input-wrapper-mesh">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-eye-action-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} color="#718096" /> : <Eye size={18} color="#718096" />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD INPUT FIELDS BLOCK WITH INTERACTIVE EYE BUTTON (👁️) */}
              {!isLoginMode && (
                <div className="auth-group input-pop">
                  <label>Confirm Password</label>
                  <div className="password-input-wrapper-mesh">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type password safely" 
                      required 
                    />
                    <button 
                      type="button" 
                      className="password-toggle-eye-action-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} color="#718096" /> : <Eye size={18} color="#718096" />}
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className="auth-action-btn">
                {isLoginMode ? 'Access My Account →' : 'Register Account'}
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
