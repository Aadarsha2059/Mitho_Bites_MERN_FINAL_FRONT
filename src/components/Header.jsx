import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';// Ensure correct capitalization
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <h1>🙏 Namaste &nbsp; | &nbsp; Mitho_Bites 2025</h1>
        <nav className="nav-links space-x-4">
          <NavLink to="/">Home</NavLink>
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="welcome-text">Welcome, {user.email}</span>
              <NavLink to="/" onClick={logout}>Logout</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
