import React, { useState } from 'react';
import { FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ options = [], onNavigate, onLogout }) => {
  const [active, setActive] = useState(options[0]?.id || 'dashboard');
  const navigate = useNavigate();

  const handleClick = (id) => {
    setActive(id);
    if (onNavigate) onNavigate(id);
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
    <aside className="sidebar">
      <div className="sidebar-heading">Mitho Bites<br /><span className="sidebar-sub">Dashboard</span></div>
      <div className="sidebar-logo">🍽️</div>
      <nav className="sidebar-nav">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`sidebar-link${active === opt.id ? ' active' : ''}`}
            onClick={() => handleClick(opt.id)}
          >
            <span className="sidebar-icon">{opt.icon}</span>
            <span className="sidebar-label">{opt.label}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-logout-wrapper">
        <button
          className="sidebar-logout-btn"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>
          <span className="sidebar-label">Logout to Homepage</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;