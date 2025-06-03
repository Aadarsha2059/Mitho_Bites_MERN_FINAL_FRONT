// src/layouts/HomepageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomepageHeader.css';
import logo from '../assets/images/logo/logo.png';

export default function HomepageHeader() {
  return (
    <header className="homepage-header">
      <div className="homepage-logo-container">
        <Link to="/">
          <img src={logo} alt="Mitho Bites Logo" className="homepage-logo" />
        </Link>
      </div>
      <nav className="homepage-nav-links">
        <Link to="/menu" className="homepage-nav-link">What's Cooking?</Link>
        <Link to="/login" className="homepage-nav-link login-link">Login</Link>
        <Link to="/about" className="homepage-nav-link">About</Link>
        <Link to="/contact" className="homepage-nav-link">Contact</Link>
      </nav>
    </header>
  );
}
