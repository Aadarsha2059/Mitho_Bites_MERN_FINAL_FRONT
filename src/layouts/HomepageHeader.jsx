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
          <img src={logo} alt="BhokBhoj Logo" className="homepage-logo" />
        </Link>
      </div>
      <nav className="homepage-nav-links">
        <Link to="/menu" className="homepage-nav-link cooking-link">What's Cooking?</Link>
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

