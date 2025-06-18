import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaThList,
  FaCompass,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon">🍴</span>
        <span className="logo-text">Mitho Bites</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          Home
        </NavLink>

        <NavLink to="/categories" className="sidebar-link">
          <FaThList className="sidebar-icon" />
          Categories
        </NavLink>

        <NavLink to="/restaurants" className="sidebar-link">
          <FaCompass className="sidebar-icon" />
          Explore Restaurants
        </NavLink>

        <NavLink to="/cart" className="sidebar-link">
          <FaShoppingCart className="sidebar-icon" />
          Cart
        </NavLink>

        <div className="sidebar-divider" />

        <NavLink to="/logout" className="sidebar-link logout">
          <FaSignOutAlt className="sidebar-icon" />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;