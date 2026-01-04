import React, { useEffect, useState } from 'react';
import { 
  FaTimes, 
  FaMoon, 
  FaGlobe, 
  FaCompress, 
  FaBell, 
  FaPalette, 
  FaUserCircle, 
  FaHistory, 
  FaHeadset, 
  FaEnvelopeOpenText, 
  FaCog 
} from 'react-icons/fa';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'np', label: 'Nepali' },
  { code: 'hi', label: 'Hindi' },
];

const SettingsDialog = ({ onClose }) => {
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

  return (
    <div className="mitho-dialog-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.25)',
      zIndex: 3000
    }}>
      <div className="mitho-dialog" style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
        borderRadius: '2.5rem',
        boxShadow: '0 16px 64px rgba(33, 150, 243, 0.2), 0 2px 12px rgba(0,0,0,0.1)',
        padding: '48px 56px',
        minWidth: '540px',
        maxWidth: '850px',
        width: '92vw',
        position: 'fixed',
        top: '56px',
        right: '50%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 3100,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '82vh',
        border: '2.5px solid #e3f2fd',
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: 22,
            right: 38,
            background: 'none',
            border: 'none',
            fontSize: '2.3rem',
            color: '#e53935',
            cursor: 'pointer',
            zIndex: 3200,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <FaTimes />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          marginBottom: '28px',
          justifyContent: 'center'
        }}>
          <FaCog style={{ fontSize: '2.7rem', color: '#2196f3' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '2.3rem',
            color: '#2196f3',
            letterSpacing: '1.2px'
          }}>Settings</h2>
        </div>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '28px',
          fontWeight: 500
        }}>Customize your BhokBhoj experience</p>

        <div style={{
          width: '100%',
          background: '#fff',
          borderRadius: '1.7rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          padding: '28px 32px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#2196f3',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaPalette /> Appearance
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Dark Mode
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Switch to dark theme for better visibility
                </div>
              </div>
              <div
                style={{
                  width: '50px',
                  height: '26px',
                  borderRadius: '13px',
                  background: darkMode ? '#2196f3' : '#ccc',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: darkMode ? '24px' : '2px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Theme
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Choose your preferred color theme
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="Default">Default</option>
                <option value="Ocean">Ocean</option>
                <option value="Forest">Forest</option>
                <option value="Sunset">Sunset</option>
              </select>
            </div>
          </div>

          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Compact Mode
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Reduce spacing for more content
                </div>
              </div>
              <div
                style={{
                  width: '50px',
                  height: '26px',
                  borderRadius: '13px',
                  background: compactMode ? '#2196f3' : '#ccc',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setCompactMode(!compactMode)}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: compactMode ? '24px' : '2px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{
          width: '100%',
          background: '#fff',
          borderRadius: '1.7rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          padding: '28px 32px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#2196f3',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaGlobe /> Preferences
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Language
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Select your preferred language
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e0e0e0',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#333',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Notifications
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Receive updates about orders
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {notifications ? <FaBell style={{ color: '#2196f3' }} /> : <FaEnvelopeOpenText style={{ color: '#999' }} />}
                <div
                  style={{
                    width: '50px',
                    height: '26px',
                    borderRadius: '13px',
                    background: notifications ? '#2196f3' : '#ccc',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: '2px',
                    left: notifications ? '24px' : '2px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#333', marginBottom: '4px' }}>
                  Privacy Mode
                </div>
                <div style={{ fontSize: '0.95rem', color: '#666' }}>
                  Hide sensitive information
                </div>
              </div>
              <div
                style={{
                  width: '50px',
                  height: '26px',
                  borderRadius: '13px',
                  background: privacyMode ? '#2196f3' : '#ccc',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setPrivacyMode(!privacyMode)}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: privacyMode ? '24px' : '2px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDialog;

