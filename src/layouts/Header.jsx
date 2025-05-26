// src/layouts/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo/logo.png';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Mitho Bites Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/login" className="nav-link login-link">Login</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}
