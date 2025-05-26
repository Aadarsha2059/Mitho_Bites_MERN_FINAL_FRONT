import React from 'react';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTwitter } from 'react-icons/fa';
import devImg from '../assets/images/aadarsha.png';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">📞 Contact Us</h1>

        <div className="contact-content">
          <div className="contact-image-wrapper">
            <img src={devImg} alt="Aadarsha Babu Dhakal" className="contact-image" />
          </div>

          <div className="contact-info">
            <h2 className="developer-name">Aadarsha Babu Dhakal</h2>
            <p className="developer-role">Frontend Developer | MERN Stack Enthusiast</p>

            <div className="info-line">
              <FaPhoneAlt className="icon" />
              <span>+977 9864000000</span>
            </div>

            <div className="info-line">
              <FaEnvelope className="icon" />
              <span>aadars111@gmail.com</span>
            </div>

            <div className="info-line">
              <FaMapMarkerAlt className="icon" />
              <span>Kathmandu, Nepal</span>
            </div>

            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon instagram" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon twitter" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-quote">
          “Crafted with dedication and MERN power – Feel free to reach out!”
        </div>
      </div>
    </div>
  );
}
