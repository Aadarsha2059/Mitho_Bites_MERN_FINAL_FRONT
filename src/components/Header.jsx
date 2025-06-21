import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/authProvider';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch }) => {
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="welcome-text">
              Welcome, {user.username}
              {isAdmin && (
                <span style={{ 
                  marginLeft: '8px', 
                  backgroundColor: '#ff6b35', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '12px', 
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  👑 ADMIN
                </span>
              )}
            </span>
            {isAdmin && (
              <button 
                onClick={handleAdminClick}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                🛠️ Admin Panel
              </button>
            )}
          </div>
        ) : (
          <span className="welcome-text">Welcome, Foodie!</span>
        )}
      </div>
    </header>
  );
};

export default Header;
