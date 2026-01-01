// src/layouts/HomepageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomepageHeader.css';
import logo from '../assets/images/logo/logo.png';

export default function HomepageHeader({ onLoginClick, onShowOnboarding }) {
  return (
    <header className="homepage-header">
      <div className="homepage-logo-container">
        <Link to="/">
          {/* Removed the logo image and replaced with attractive BhokBhoj text */}
          <div className="bhokbhoj-brand">
            <h1 className="bhokbhoj-name">BHOKBHOJ</h1>
            <p className="bhokbhoj-slogan">Authentic Flavors, Fast Delivery</p>
          </div>
        </Link>
      </div>
      <nav className="homepage-nav-links">
        <Link to="/menu" className="homepage-nav-link cooking-link">Menu</Link>
        <button
          className="onboarding-btn homepage-nav-link"
          onClick={onShowOnboarding}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
        >
          Web Tour
        </button>
        <button 
          onClick={onLoginClick} 
          className="homepage-nav-link login-link"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
        <Link to="/about" className="homepage-nav-link">About</Link>
        <Link to="/contact" className="homepage-nav-link">Contact</Link>
      </nav>
    </header>
  );
}

