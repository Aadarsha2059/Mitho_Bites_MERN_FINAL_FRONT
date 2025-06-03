import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Food Dashboard</h2>
      <ul className="sidebar-menu">
        <li>Home</li>
        <li>Menu-card</li>
        <li>Explore Party Palaces</li>
        <li>Settings & More</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
