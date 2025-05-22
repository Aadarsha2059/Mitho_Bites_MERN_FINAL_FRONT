// src/layouts/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo/logo.png';

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Mitho Bites Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/menu">Menu</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}




