import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCog, FaMoon, FaGlobe, FaCompress, FaBell, FaPalette, FaSignOutAlt, FaUserCircle, FaHistory, FaHeadset, FaEnvelopeOpenText } from 'react-icons/fa';
import './Settings.css';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'np', label: 'Nepali' },
  { code: 'hi', label: 'Hindi' },
];

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [compactMode, setCompactMode] = useState(() => localStorage.getItem('compactMode') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [theme, setTheme] = useState('Default');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    if (compactMode) {
      document.body.classList.add('compact-mode');
      localStorage.setItem('compactMode', 'true');
    } else {
      document.body.classList.remove('compact-mode');
      localStorage.setItem('compactMode', 'false');
    }
  }, [compactMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleProfile = () => navigate('/profile');
  const handleOrderHistory = () => navigate('/orders');
  const handleSupport = () => window.open('mailto:support@BhokBhoj.com', '_blank');

  return (
    <div className="settings-page-full settings-floating-bg">
      <div className="settings-background pro-bg">
        <div className="settings-background-overlay pro-bg-overlay"></div>
      </div>
      <div className="settings-floating-container">
        <button className="settings-back-btn" onClick={handleBack} title="Back to Dashboard">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <div className="settings-content">
          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">Customize your BhokBhoj experience</p>
          <div className="settings-quick-actions">
            <button className="quick-action-btn" onClick={handleProfile} title="Profile">
              <FaUserCircle className="quick-action-icon" /> Profile
            </button>
            <button className="quick-action-btn" onClick={handleOrderHistory} title="Order History">
              <FaHistory className="quick-action-icon" /> Order History
            </button>
            <button className="quick-action-btn" onClick={handleSupport} title="Support">
              <FaHeadset className="quick-action-icon" /> Support
            </button>
          </div>
          <div className="settings-card">
            <div className="settings-section">
              <h3 className="settings-section-title">Appearance</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Dark Mode</div>
                  <div className="setting-description">Switch to dark theme for better visibility in low light</div>
                </div>
                <div className="setting-control">
                  <div 
                    className={`toggle-switch ${darkMode ? 'active' : ''}`}
                    onClick={() => setDarkMode((d) => !d)}
                    title="Toggle dark mode"
                  ></div>
                </div>
              </div>
              <div className="setting-item theme-preview-item">
                <div className="setting-info">
                  <div className="setting-label">Theme</div>
                  <div className="setting-description">Choose your preferred color theme</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="setting-select"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="Default">Default</option>
                    <option value="Ocean">Ocean</option>
                    <option value="Forest">Forest</option>
                    <option value="Sunset">Sunset</option>
                  </select>
                  <span className={`theme-preview theme-${theme.toLowerCase()}`}></span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Compact Mode</div>
                  <div className="setting-description">Reduce spacing for more content on screen</div>
                </div>
                <div className="setting-control">
                  <div 
                    className={`toggle-switch ${compactMode ? 'active' : ''}`}
                    onClick={() => setCompactMode((c) => !c)}
                    title="Toggle compact mode"
                  ></div>
                </div>
              </div>
            </div>
            <hr className="settings-divider" />
            <div className="settings-section">
              <h3 className="settings-section-title">Preferences</h3>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Language</div>
                  <div className="setting-description">Select your preferred language</div>
                </div>
                <div className="setting-control">
                  <select 
                    className="setting-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Notifications</div>
                  <div className="setting-description">Receive updates about your orders and promotions</div>
                </div>
                <div className="setting-control">
                  <div 
                    className={`toggle-switch ${notifications ? 'active' : ''}`}
                    onClick={() => setNotifications(!notifications)}
                    title="Toggle notifications"
                  ></div>
                  {notifications && <FaBell className="notif-on" title="Notifications enabled" />}
                  {!notifications && <FaEnvelopeOpenText className="notif-off" title="Notifications disabled" />}
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Privacy Mode</div>
                  <div className="setting-description">Hide sensitive information from others</div>
                </div>
                <div className="setting-control">
                  <div 
                    className={`toggle-switch ${privacyMode ? 'active' : ''}`}
                    onClick={() => setPrivacyMode(!privacyMode)}
                    title="Toggle privacy mode"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 


