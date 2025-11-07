import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './Header.css';

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
    <header className="header dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 40, paddingRight: 32 }}>
      <div className="dashboard-header-title" style={{ flex: '0 0 auto', marginRight: 32 }}>
        <span className="namaste-icon" role="img" aria-label="namaste">🙏</span>
        BhokBhoj <span className="dashboard-header-year">2025</span>
      </div>
      {/* Removed search box */}
      <div className="dashboard-header-user" style={{ flex: '1 1 0', minWidth: 0, justifyContent: 'flex-start', marginLeft: 32 }}>
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
            {/* Removed App Tour (onboarding) button */}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="welcome-text">Welcome, Foodie!</span>
            {/* Removed App Tour (onboarding) button */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

