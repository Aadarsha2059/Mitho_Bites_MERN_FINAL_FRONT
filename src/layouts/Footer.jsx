import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; 2025 BhokBhoj. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="/careers" className="footer-link">Careers</a>
          </div>
        </div>
        <div className="footer-center">
          <p>Designed and Implemented by: Aadarsha Babu Dhakal</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Subscribe to our newsletter" required />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
        <div className="footer-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

