import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCog, FaMoon, FaGlobe, FaCompress, FaBell, FaPalette, FaSignOutAlt } from 'react-icons/fa';
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

  return (
    <div className="settings-page-full">
      <div className="settings-background">
        <div className="settings-background-overlay"></div>
      </div>
      
      <button className="settings-back-btn" onClick={handleBack} title="Back to Dashboard">
        <FaArrowLeft />
        <span>Back</span>
      </button>
      
      <div className="settings-content">
        <h2 className="settings-title">Settings</h2>
        <p className="settings-subtitle">Customize your experience</p>
        
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
                ></div>
              </div>
            </div>

            <div className="setting-item">
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
                ></div>
              </div>
            </div>
          </div>

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
                ></div>
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
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 