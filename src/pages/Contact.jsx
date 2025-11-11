import React, { useState } from 'react';
import { FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="modern-contact-page">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <button className="contact-back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back
        </button>
        
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info-side">
              <h2>Contact Information</h2>
              <p className="contact-info-desc">
                Have questions? We're here to help. Reach out to us through any of these channels.
              </p>

              <div className="contact-info-cards">
                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-info-details">
                    <h3>Phone</h3>
                    <p>+977 9812345678</p>
                    <p>+977 9876543210</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-info-details">
                    <h3>Email</h3>
                    <p>support@bhokbhoj.com</p>
                    <p>info@bhokbhoj.com</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-info-details">
                    <h3>Address</h3>
                    <p>Kathmandu, Nepal</p>
                    <p>Thamel, Ward No. 26</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-info-icon">
                    <FaClock />
                  </div>
                  <div className="contact-info-details">
                    <h3>Working Hours</h3>
                    <p>Mon - Sat: 9:00 AM - 10:00 PM</p>
                    <p>Sunday: 10:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-side">
              <div className="contact-form-card">
                <h2>Send Us a Message</h2>
                <p className="form-description">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="contact-container">
          <h2 className="map-title">Find Us Here</h2>
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1234567890!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BhokBhoj Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
