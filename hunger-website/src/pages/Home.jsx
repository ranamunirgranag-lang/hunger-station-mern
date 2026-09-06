import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  // --- REAL-TIME SCROLL ANIMATION TRACKER ---
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const splitSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.15 } // 15% section screen par aate hi animation trigger hogi
    );

    if (splitSectionRef.current) {
      observer.observe(splitSectionRef.current);
    }

    return () => {
      if (splitSectionRef.current) {
        observer.unobserve(splitSectionRef.current);
      }
    };
  }, []);

  // Customers favorites top foods data setup
  const popularItems = [
    {
      id: 1,
      name: "Cheesy Blast Burger",
      price: "PKR 590",
      rating: "⭐ 4.9",
      img: "blastburger.jpg"
    },
    {
      id: 2,
      name: "Peri Peri Pizza",
      price: "PKR 1,150",
      rating: "⭐ 4.8",
      img: "pizza.jpg"
    },
    {
      id: 3,
      name: "Overloaded Monster Fries",
      price: "PKR 450",
      rating: "⭐ 4.7",
      img: "fries.jpg"
    }
  ];

  return (
    <div className="home-container">
      
      {/* --- SECTION 1: HERO BANNER (DARK THEME) --- */}
            {/* --- SECTION 1: HERO BANNER (DARK THEME WITH PREMIUM AOS) --- */}
      <section className="hero-section">
        
        {/* Left Side: Dynamic Cascade Content Group */}
        <div className="hero-content">
          <span 
            className="hero-tagline" 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            ✨ Crave. Order. Enjoy.
          </span>
          
          <h1 
            className="hero-title" 
            data-aos="fade-right" 
            data-aos-delay="300"
            data-aos-duration="1200"
          >
            Satisfy Your Hunger <br />
            With <span>Station's</span> Finest!
          </h1>
          
          <p 
            className="hero-description" 
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            Experience Lahore's ultimate street food fusion and gourmet burgers. 
            Delivered smoking hot, fresh, and straight to your comfort zone within 30 minutes.
          </p>
          
          <div 
            className="hero-buttons" 
            data-aos="fade-up" 
            data-aos-delay="700"
            data-aos-duration="800"
          >
            <Link to="/menu" className="btn-primary">Explore Menu 🍔</Link>
            <Link to="/about" className="btn-secondary">Our Story</Link>
          </div>
        </div>

        {/* Right Side: Visual Image Splash Frame */}
        <div 
          className="hero-image-wrapper"
          data-aos="zoom-in-up"
          data-aos-delay="400"
          data-aos-duration="1400"
        >
          <div className="hero-image-bg-glow"></div>
          <img 
            src="burger.jpg" 
            alt="Girl enjoying delicious burger" 
            className="hero-main-img"
          />
        </div>

        {/* --- Minimal Smooth Curve Divider (XML Fixed Standard) --- */}
        <div className="curve-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://w3.org">
            <path d="M0,0V60c120,40,350,50,600,0s480-40,600,0V0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

           {/* --- SECTION 2: PROMO FOOD CARDS (WHITE CLEAN THEME WITH CASCADE AOS) --- */}
      <section className="promo-section">
        
        {/* Header Content Section */}
        <div className="promo-header" data-aos="fade-up" data-aos-duration="900">
          <span className="promo-tag">Customer Favorites</span>
          <h2 className="promo-title">Most Popular Delectables</h2>
          <div className="title-underline"></div>
        </div>

        {/* Dynamic Card Grid Layout with Mathematical Index Delay Stagger */}
        <div className="promo-grid">
          {popularItems.map((item, index) => (
            <div 
              className="food-promo-card" 
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 200} // Math magic: 0ms, then 200ms, then 400ms delay automatically!
              data-aos-duration="1000"
            >
              <div className="card-img-box">
                <img src={item.img} alt={item.name} />
                <span className="card-rating">{item.rating}</span>
              </div>
              <div className="card-info">
                <h3>{item.name}</h3>
                <div className="card-footer">
                  <span className="card-price">{item.price}</span>
                  <Link to="/menu" className="card-add-btn">Add +</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


           {/* --- SECTION 4: WHY CHOOSE US (VERTICAL SPLIT LAYER UPGRADED WITH AOS) --- */}
      <section className="features-split-section">
        
        {/* Left Side: 50% Balanced Image Frame (Fades from left side smoothly) */}
        <div 
          className="features-image-panel"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <img 
            src="girleatbg.png" 
            alt="Girl enjoying burger custom" 
            className="features-bg-img"
          />
        </div>

        {/* Right Side: Content Header & Animated Row Cards */}
        <div className="features-text-panel">
          <div className="features-content-wrap">
            
            {/* Split Grid Section Title Header */}
            <div className="features-split-header" data-aos="fade-up" data-aos-duration="1000">
              <span className="features-split-tag">Our Secret Spice</span>
              <h2 className="features-split-title">Why Hunger Station Rules Lahore?</h2>
              <div className="features-split-underline"></div>
            </div>

            {/* Vertical Row Layout with Sequential Stagger Entries */}
            <div className="features-vertical-list">
              
              {/* Feature Row Box 1 */}
              <div 
                className="feature-row-card"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="800"
              >
                <div className="feature-row-icon">🔥</div>
                <div className="feature-row-info">
                  <h3>100% Charcoal Grilled</h3>
                  <p>No frozen shortcuts. Every single patty is crafted from premium fresh beef and grilled on real charcoal smoke.</p>
                </div>
              </div>

              {/* Feature Row Box 2 */}
              <div 
                className="feature-row-card"
                data-aos="fade-left"
                data-aos-delay="400"
                data-aos-duration="800"
              >
                <div className="feature-row-icon">⚡</div>
                <div className="feature-row-info">
                  <h3>Bullet Fast Delivery</h3>
                  <p>Our fleet bypasses Lahore's heaviest traffic to deliver your cheese explosion warm and juicy within 30 minutes flat.</p>
                </div>
              </div>

              {/* Feature Row Box 3 */}
              <div 
                className="feature-row-card"
                data-aos="fade-left"
                data-aos-delay="600"
                data-aos-duration="800"
              >
                <div className="feature-row-icon">👨‍🍳</div>
                <div className="feature-row-info">
                  <h3>Gourmet Artisans</h3>
                  <p>Designed by elite culinary specialists who know exactly how to trigger your ultimate flavor receptors.</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>
      {/* --- SECTION 5: PREMIUM CUSTOMER REVIEWS (NEUMORPHIC MOTION SLIDER) --- */}
      <section className="reviews-section">
        
        {/* Section Header */}
        <div className="reviews-header" data-aos="fade-up" data-aos-duration="1000">
          <span className="reviews-tag">Word On The Street</span>
          <h2 className="reviews-title">What Our Hunger Clique Says</h2>
          <div className="reviews-underline"></div>
        </div>

        {/* Dynamic Multi-Directional Animated Grid */}
        <div className="reviews-grid">
          
          {/* Review Card 1: Fades & Slides from Left */}
          <div 
            className="review-card"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <div className="quote-vector">“</div>
            <p className="review-text">
              "The Cheesy Blast Burger is an absolute masterpiece! The charcoal smoke flavor is perfectly balanced, and delivery took exactly 22 minutes to DHA. Hunger Station rules Lahore!"
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">AH</div>
              <div>
                <h4>Ahmed Ali</h4>
                <span>DHA Phase 5, Lahore</span>
              </div>
            </div>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Review Card 2: Zooms and Scales up from Center */}
          <div 
            className="review-card highlighted-review"
            data-aos="zoom-in-up"
            data-aos-delay="400"
            data-aos-duration="1100"
          >
            <div className="quote-vector">“</div>
            <p className="review-text">
              "Ordered the Peri Peri Pizza for a midnight party. It arrived steaming hot! The crust was thin, crispy, and loaded with cheese. Absolute value for money project."
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar pink-avatar">ZK</div>
              <div>
                <h4>Zainab Khan</h4>
                <span>Gulberg III, Lahore</span>
              </div>
            </div>
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Review Card 3: Fades & Slides from Right */}
          <div 
            className="review-card"
            data-aos="fade-left"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            <div className="quote-vector">“</div>
            <p className="review-text">
              "Highly professional web ordering process. The interface is clean, fast, and the Overloaded Fries are to die for. Will definitely be ordering again!"
            </p>
            <div className="reviewer-info">
              <div className="reviewer-avatar orange-avatar">OM</div>
              <div>
                <h4>Omer Malik</h4>
                <span>Johar Town, Lahore</span>
              </div>
            </div>
            <div className="review-stars">⭐⭐⭐⭐★</div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

