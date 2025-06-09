import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <h1>🙏 Namaste &nbsp; | &nbsp; Mitho_Bites 2025</h1>
        <nav className="nav-links space-x-4">
         
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="welcome-text">Welcome, {user.username}</span>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
