import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // WhatsApp Function
  const handleWhatsAppRedirect = () => {

    // Check required fields
    if (!formData.name || !formData.email || !formData.message) {

      alert("Please fill in your Name, Email and Message first! 😊");

      return;
    }

    // Professional WhatsApp message
    const textMessage = `🍔 *Hunger Station - New Customer Inquiry*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📧 *Email:* ${encodeURIComponent(formData.email)}%0A` +
      `📌 *Subject:* ${encodeURIComponent(formData.subject || "General Inquiry")}%0A%0A` +
      `💬 *Message:* ${encodeURIComponent(formData.message)}%0A%0A` +
      `Thank you for contacting Hunger Station! 🍔`;

    // WhatsApp URL
    const whatsappUrl =
      `https://wa.me/923466545171?text=${textMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

  };


  return (

    <div className="contact-container">

      {/* --- SECTION 1: HEADER HERO --- */}

      <section className="contact-hero" data-aos="fade-down">

        <div className="contact-hero-overlay"></div>

        <div className="contact-hero-content">

          <span className="contact-tag">
            Get In Touch
          </span>

          <h1>
            Connect With The Station
          </h1>

          <div className="contact-underline"></div>

        </div>

      </section>


      {/* --- SECTION 2: THE SPLIT COMMUNICATIONS GRID --- */}

      <section className="contact-split-section">


        {/* Left Side */}

        <div
          className="contact-info-panel"
          data-aos="fade-right"
        >

          <span className="panel-tag">
            HQ Matrix
          </span>

          <h2>
            We Are Located In The Heart Of Lahore
          </h2>

          <p className="panel-desc">

            Have a question about our secret charcoal grill technique,
            looking for bulk corporate catering, or need instant assistance
            with a delayed delivery slot? Reach out directly!

          </p>


          <div className="matrix-list">


            <div className="matrix-item">

              <span className="matrix-icon">
                📍
              </span>

              <div>

                <h5>
                  Main Flagship Hub
                </h5>

                <p>
                  MM Alam Road, Block B2, Gulberg III,
                  Lahore, Pakistan
                </p>

              </div>

            </div>


            <div className="matrix-item">

              <span className="matrix-icon">
                📞
              </span>

              <div>

                <h5>
                  Hotline Support
                </h5>

                <p>
                  +92 300 1234567
                  (Available 11:00 AM - 02:00 AM)
                </p>

              </div>

            </div>


            <div className="matrix-item">

              <span className="matrix-icon">
                ✉️
              </span>

              <div>

                <h5>
                  Enterprise Mailing
                </h5>

                <p>
                  support@hungerstation.com
                </p>

              </div>

            </div>


          </div>

        </div>


        {/* Right Side */}

        <div
          className="contact-form-panel"
          data-aos="fade-left"
        >

          <div className="premium-contact-form">


            {/* Name */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Hamza Ali"
                required
              />

            </div>


            {/* Email */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="yourname@gmail.com"
                required
              />

            </div>


            {/* Subject */}

            <div className="form-group">

              <label>
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Inquiry about catering..."
                required
              />

            </div>


            {/* Message */}

            <div className="form-group">

              <label>
                Your Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Type your message with crisp clarity here..."
                required
              ></textarea>

            </div>


            {/* WhatsApp Button */}

            <button
              type="button"
              className="form-submit-btn"
              onClick={handleWhatsAppRedirect}
            >

              Send To WhatsApp 💬

            </button>


          </div>

        </div>

      </section>


      {/* --- SECTION 3: UTILITY DIVISION PORTALS --- */}

      <section className="utility-portals-section">

        <div className="portals-grid">


          <div className="portal-box">

            <h4>
              🎉 Bulk Catering
            </h4>

            <p>
              Planning a university event or corporate party
              in Lahore? We handle custom menus and live
              grilling stalls setups.
            </p>

            <span className="portal-link">
              events@hungerstation.com
            </span>

          </div>


          <div className="portal-box highlighted-portal">

            <h4>
              💼 Join The Crew
            </h4>

            <p>
              Want to build elite fast-food software or join
              our culinary masterclass artisans team?
              Drop your resume today.
            </p>

            <span className="portal-link">
              hr@hungerstation.com
            </span>

          </div>


          <div className="portal-box">

            <h4>
              🤝 Franchise Queries
            </h4>

            <p>
              Partner with Lahore's fastest growing food
              network startup. Expand Hunger Station
              footprints to other cities.
            </p>

            <span className="portal-link">
              partner@hungerstation.com
            </span>

          </div>


        </div>

      </section>


    </div>

  );

};

export default Contact;