import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/authProvider';
import './Header.css';

const Header = ({ onSearch }) => {
  const { user } = useContext(AuthContext) || {};
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="header dashboard-header">
      <div className="dashboard-header-title">
        <span className="namaste-icon" role="img" aria-label="namaste">🙏</span>
        Mitho Bites <span className="dashboard-header-year">2025</span>
      </div>
      <div className="dashboard-header-search">
        <input
          type="text"
          className="dashboard-search-input"
          placeholder="Search foods, restaurants..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="dashboard-header-user">
        {user && user.username ? (
          <span className="welcome-text">Welcome, {user.username}</span>
        ) : (
          <span className="welcome-text">Welcome, Foodie!</span>
        )}
      </div>
    </header>
  );
};

export default Header;
