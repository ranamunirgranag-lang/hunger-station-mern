import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      
      {/* --- SECTION 1: ABOUT BANNER HEADER --- */}
      <section className="about-hero" data-aos="fade-down" data-aos-duration="1000">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-tag">Behind The Flavors</span>
          <h1>Our Kitchen Story</h1>
          <div className="about-underline"></div>
        </div>
      </section>

      {/* --- SECTION 2: THE VISION SPLIT GRID --- */}
      <section className="about-split-section">
        
        {/* Left Half Canvas: Brand Content Presentation */}
        <div className="about-text-panel" data-aos="fade-right" data-aos-delay="200">
          <span className="panel-tag">Since 2024</span>
          <h2>Crafting Lahore's Ultimate Street Food Fusion</h2>
          <p className="panel-pitch">
            Hunger Station wasn't just born out of a kitchen; it was born out of a relentless passion to disrupt the traditional fast-food ecosystem in Lahore. We believed that gourmet taste shouldn't be confined to upscale fine-dining spaces.
          </p>
          <p className="panel-sub-desc">
            Every single proprietary sauce, smoke technique, and charcoal-grilled beef patty is engineered to activate your absolute deepest flavor receptors. From Gulberg to DHA, we deliver pure culinary magic within 30 minutes flat.
          </p>
        </div>

        {/* Right Half Canvas: Premium Organic Box Frame */}
        <div className="about-image-panel" data-aos="fade-left" data-aos-delay="400">
          <img 
            src="chef.png" 
            alt="Hunger Station Professional Kitchen Chef" 
            className="about-graphic-img"
          />
        </div>

      </section>

      {/* --- SECTION 3: CORPORATE METRIC CARDS --- */}
      <section className="metrics-section">
        <div className="metrics-grid">
          
          <div className="metric-card" data-aos="zoom-in" data-aos-delay="100">
            <h3>05+</h3>
            <h5>Elite Outlets</h5>
            <p>Serving premium hot goodness across core operational zones in Lahore.</p>
          </div>

          <div className="metric-card highlighted-metric" data-aos="zoom-in" data-aos-delay="300">
            <h3>15+</h3>
            <h5>Master Artisans</h5>
            <p>Culinary experts tracking absolute quality and fresh standards daily.</p>
          </div>

          <div className="metric-card" data-aos="zoom-in" data-aos-delay="500">
            <h3>50K+</h3>
            <h5>Happy Clique</h5>
            <p>Active customers ordering their premium late-night food explosions.</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
