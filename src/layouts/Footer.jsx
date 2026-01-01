import React, { useState } from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import FAQModal from '../components/FAQModal';

export default function Footer() {
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">BHOKBHOJ</h3>
            <p className="footer-slogan">Authentic Flavors, Fast Delivery</p>
            <p className="footer-copyright">&copy; 2025 BhokBhoj. All rights reserved.</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/menu" className="footer-link">Menu</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li>
                <button 
                  className="footer-link footer-link-button" 
                  onClick={() => setIsFAQOpen(true)}
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
            <li><a href="/terms" className="footer-link">Terms of Service</a></li>
            <li><a href="/careers" className="footer-link">Careers</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Subscribe to our newsletter" required />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
    <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </>
  );
}