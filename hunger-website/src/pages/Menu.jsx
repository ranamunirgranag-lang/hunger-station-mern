import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

// --- Cart dynamic array hooks link parameters handle inside props ---
const Menu = ({ cartItems, setCartItems }) => {
  // Active state to track selected category filtering slot
  const [activeCategory, setActiveCategory] = useState('All');

  // 🍔 COMPLETE RAW FOOD DATABASE MATRIX WITH YOUR FIXED IMAGE LINKS
  const foodDatabase = [
    { id: 1, name: "Cheesy Blast Burger", category: "Burgers", price: 590, rating: "⭐ 4.9", img: "blastburger.jpg", desc: "Premium fresh charcoal-grilled beef patty oozing with cheddar melt." },
    { id: 2, name: "Peri Peri Pizza", category: "Pizza", price: 1150, rating: "⭐ 4.8", img: "pizza.jpg", desc: "Artisanal hand-tossed thin crust topped with flaming peri peri chicken chunks." },
    { id: 3, name: "Monster Loaded Fries", category: "Fries", price: 450, rating: "⭐ 4.7", img: "fries.jpg", desc: "Golden crispy chips completely covered in secret chipotle strings and jalapenos." },
    { id: 4, name: "Crunchy Zinger Max", category: "Burgers", price: 520, rating: "⭐ 4.6", img: "burger.jpg", desc: "Double-fried thigh fillet with dynamic crunch coatings and iceberg lettuce." },
    { id: 5, name: "Smoky BBQ Supreme Pizza", category: "Pizza", price: 1290, rating: "⭐ 4.9", img: "pizza2.webp", desc: "Rich sweet hickory smoke blend base topped with dynamic grilled red peppers." },
    { id: 6, name: "Garlic Mayo Fries Box", category: "Fries", price: 380, rating: "⭐ 4.5", img: "mayofries.jpg", desc: "Classic operational side pack splashed with hand-whipped cream garlic whip." },
    { id: 7, name: "Gourmet Mint Margarita", category: "Drinks", price: 240, rating: "⭐ 4.8", img: "mint.jpg", desc: "Ice-crushed fresh botanical mint leaves blended with fizzy soda lime frames." },
    { id: 8, name: "Premium Cold Soft Drink", category: "Drinks", price: 120, rating: "⭐ 4.5", img: "cock.jpg", desc: "Chilled operational beverage can serving maximum carbonated fizz refresh slots." }
  ];

  // Dynamic filter processing algorithm tracking category metrics
  const filteredItems = activeCategory === 'All' 
    ? foodDatabase 
    : foodDatabase.filter(item => item.category === activeCategory);

  // --- THE REAL INTERACTIVE MULTATED ADD ACTION ENGINE ---
  const handleAddToCart = (selectedFood) => {
    setCartItems(prevItems => {
      // Check to trace if product is already existing inside checkout memory slots
      const isItemExisting = prevItems.find(item => item.id === selectedFood.id);
      
      if (isItemExisting) {
        return prevItems.map(item =>
          item.id === selectedFood.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If fresh product, insert item state with default structural quantity value = 1
        return [...prevItems, { ...selectedFood, quantity: 1 }];
      }
    });
    alert(`${selectedFood.name} added to your basket! 🛒🔥`);
  };

  const categories = ['All', 'Burgers', 'Pizza', 'Fries', 'Drinks'];

  return (
    <div className="menu-container">
      
      {/* Header Banner Sub-Section */}
      <section className="menu-hero" data-aos="fade-down">
        <div className="menu-hero-overlay"></div>
        <div className="menu-hero-content">
          <span className="menu-tag">Station Masterclass</span>
          <h1>The Hunger Station Grid</h1>
          <div className="menu-underline"></div>
        </div>
      </section>

      {/* --- LIVE CATEGORY FILTER BUTTONS BAR --- */}
      <section className="filter-bar-section" data-aos="zoom-in" data-aos-delay="150">
        <div className="filter-buttons-wrapper">
          {categories.map((cat, index) => (
            <button
              key={index}
              type="button"
              className={`filter-tab-btn ${activeCategory === cat ? 'active-filter' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- FOOD ITEMS PRESENTATION GRID --- */}
      <section className="menu-grid-section">
        <div className="menu-items-grid">
          {filteredItems.map((food, index) => (
            <div 
              className="menu-food-card" 
              key={food.id}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 150} // Smart layout cascade loop staggering resets every row
            >
              {/* Highlighted Visual Frame for Pictures */}
              <div className="menu-card-img-box">
                <img src={food.img} alt={food.name} className="menu-product-img" />
                <span className="menu-card-rating">{food.rating}</span>
                <span className="menu-card-category-tag">{food.category}</span>
              </div>

              {/* Information & Action Control Block */}
              <div className="menu-card-info">
                <h3>{food.name}</h3>
                <p className="menu-product-desc">{food.desc}</p>
                
                <div className="menu-card-footer">
                  <span className="menu-card-price">PKR {food.price}</span>
                  <button 
                    type="button" 
                    className="menu-add-cart-btn"
                    onClick={() => handleAddToCart(food)} // Linked directly to array transmission framework
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Menu;
