import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ options = [], onNavigate }) => {
  const [active, setActive] = useState(options[0]?.id || 'dashboard');

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
    </aside>
  );
};

export default Sidebar;