import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import './HeaderElegant.css';

const Header = ({ onSearch, onShowOnboarding = () => {} }) => {
  const { user, isAdmin } = useContext(AuthContext) || {};
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleAdminClick = () => {
    navigate('/admin/adminpage');
  };

  return (
    <header className="header dashboard-header elegant-header">
      <div className="header-content">
        {/* Brand Logo */}
        <div className="dashboard-header-title elegant-brand">
          <span className="brand-icon">🍽️</span>
          <div className="brand-text">
            <span className="brand-name">BhokBhoj</span>
            <span className="brand-tagline">Food Paradise</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="header-nav elegant-nav">
          <button onClick={() => navigate('/menu')} className="nav-btn">
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </button>
          <button onClick={() => navigate('/cart')} className="nav-btn">
            <span className="nav-icon">🛒</span>
            <span className="nav-label">Cart</span>
          </button>
          <button onClick={() => navigate('/orders')} className="nav-btn">
            <span className="nav-icon">📦</span>
            <span className="nav-label">Orders</span>
          </button>
        </nav>

        {/* User Section */}
        <div className="dashboard-header-user elegant-user">
          {user && user.username ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-greeting">Welcome back,</span>
                <span className="user-name">{user.username}</span>
              </div>
              {isAdmin && (
                <>
                  <span className="admin-badge">
                    <span className="admin-icon">👑</span>
                    ADMIN
                  </span>
                  <button onClick={handleAdminClick} className="admin-panel-btn">
                    <span>🛠️</span>
                    Admin Panel
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="user-info">
              <span className="welcome-text">Welcome, Foodie! 🍕</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

