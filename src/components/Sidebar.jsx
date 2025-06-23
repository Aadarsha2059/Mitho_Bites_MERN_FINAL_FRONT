import React, { useState } from 'react';
import './Sidebar.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ options = [], onNavigate }) => {
  const [active, setActive] = useState(options[0]?.id || 'dashboard');
  const navigate = useNavigate();

  const handleClick = (id) => {
    setActive(id);
    if (onNavigate) onNavigate(id);
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
      <button className="sidebar-logout-btn" onClick={() => navigate('/homepage')}>
        <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;