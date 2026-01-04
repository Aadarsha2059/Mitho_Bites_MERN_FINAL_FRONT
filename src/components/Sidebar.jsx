import React, { useState } from 'react';
import { FaSignOutAlt, FaHome, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ options = [], onNavigate, onLogout }) => {
  const [active, setActive] = useState(options[0]?.id || 'dashboard');
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const handleClick = (id) => {
    setActive(id);
    if (onNavigate) onNavigate(id);
    
    // Handle navigation for admin routes
    if (id === 'place-order') {
      navigate('/admin/place-order');
    } else if (id === 'adminpage') {
      navigate('/admin/adminpage');
    } else if (id === 'product') {
      navigate('/admin/product');
    } else if (id === 'users') {
      navigate('/admin/users');
    } else if (id === 'category') {
      navigate('/admin/category');
    } else if (id === 'restaurant') {
      navigate('/admin/restaurant');
    } else if (id === 'transaction-history') {
      navigate('/admin/transaction-history');
    } else if (id === 'business-rise-flows') {
      navigate('/admin/business-rise-flows');
    } else if (id === 'adminsettings') {
      navigate('/admin/adminsettings');
    }
  };

  const handleLogout = () => {
    // Call the original logout function if provided
    if (onLogout) {
      onLogout();
    }
    // Navigate to homepage
    navigate('/homepage');
  };

  return (
    <aside className="sidebar magical-sidebar">
      {/* Animated Background */}
      <div className="sidebar-bg-animation"></div>
      
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="sidebar-logo-circle">
            <span className="sidebar-logo-icon">🍽️</span>
          </div>
          <div className="sidebar-sparkle sidebar-sparkle-1">✨</div>
          <div className="sidebar-sparkle sidebar-sparkle-2">✨</div>
          <div className="sidebar-sparkle sidebar-sparkle-3">✨</div>
        </div>
        <div className="sidebar-heading">
          <span className="sidebar-brand">BhokBhoj</span>
          <span className="sidebar-sub">Your Food Paradise</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {options.map((opt, index) => (
          <div
            key={opt.id}
            className={`sidebar-link ${active === opt.id ? 'active' : ''} ${hoveredItem === opt.id ? 'hovered' : ''}`}
            onClick={() => handleClick(opt.id)}
            onMouseEnter={() => setHoveredItem(opt.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="sidebar-link-bg"></div>
            <span className="sidebar-icon">{opt.icon}</span>
            <span className="sidebar-label">{opt.label}</span>
            {active === opt.id && (
              <div className="sidebar-active-indicator">
                <FaStar />
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-logout-wrapper">
        <button
          className="sidebar-logout-btn magical-logout-btn"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>
          <span className="sidebar-label">Logout</span>
          <div className="logout-ripple"></div>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="sidebar-decoration sidebar-decoration-1"></div>
      <div className="sidebar-decoration sidebar-decoration-2"></div>
    </aside>
  );
};

export default Sidebar;
