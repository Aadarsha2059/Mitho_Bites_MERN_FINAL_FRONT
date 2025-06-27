import React, { useState, useEffect } from 'react';
import './Contact.css';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaInstagram, 
  FaTwitter, 
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaCode,
  FaRocket
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import devImg from '../assets/images/aadarsha.png';

export default function Contact() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="contact-page-wrapper">
      {/* Animated Background */}
      <div className="contact-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Enhanced Back Button */}
      <button
        className="contact-back-btn"
        onClick={() => navigate('/homepage')}
        aria-label="Back to homepage"
      >
        <FaArrowLeft className="contact-back-icon" />
        <span className="contact-back-text">Back to Home</span>
      </button>

      {/* Main Content */}
      <div className="contact-main-container">
        <div className={`contact-card ${isVisible ? 'fade-in' : ''}`}>
          {/* Header Section */}
          <div className="contact-header">
            <div className="contact-title-wrapper">
              <FaRocket className="contact-title-icon" />
              <h1 className="contact-title">Get In Touch</h1>
            </div>
            <p className="contact-subtitle">Let's connect and bring your ideas to life!</p>
          </div>

          {/* Content Section */}
          <div className="contact-content">
            {/* Developer Image Section */}
            <div className="contact-image-section">
              <div className="image-container">
                <div className="image-border">
                  <img src={devImg} alt="Aadarsha Babu Dhakal" className="contact-image" />
                </div>
                <div className="image-overlay">
                  <FaCode className="overlay-icon" />
                </div>
              </div>
              <div className="developer-badge">
                <FaHeart className="badge-icon" />
                <span>Available for Projects</span>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="contact-info-section">
              <div className="developer-intro">
                <h2 className="developer-name">Aadarsha Babu Dhakal</h2>
                <p className="developer-role">Frontend Developer | MERN Stack Enthusiast</p>
                <div className="developer-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Express</span>
                </div>
              </div>

              <div className="contact-details">
                <div className="info-card">
                  <FaPhoneAlt className="info-icon phone" />
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>+977 9864000000</p>
                  </div>
                </div>

                <div className="info-card">
                  <FaEnvelope className="info-icon email" />
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>aadars111@gmail.com</p>
                  </div>
                </div>

                <div className="info-card">
                  <FaMapMarkerAlt className="info-icon location" />
                  <div className="info-content">
                    <h3>Location</h3>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h3 className="social-title">Connect With Me</h3>
                <div className="social-icons">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <FaInstagram className="social-icon" />
                    <span>Instagram</span>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                    <FaTwitter className="social-icon" />
                    <span>Twitter</span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link github">
                    <FaGithub className="social-icon" />
                    <span>GitHub</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <FaLinkedin className="social-icon" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="contact-footer">
            <div className="footer-quote">
              <FaHeart className="quote-icon" />
              <p>"Crafted with dedication and MERN power – Feel free to reach out!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
