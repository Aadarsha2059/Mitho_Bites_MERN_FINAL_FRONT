import React, { useState } from 'react';
import './AdminSettingsPage.css';
import { FaUser, FaPhone, FaLock, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminSettingsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }
    setMessage('✅ Settings updated successfully');
    // Add your API logic here
  };

  return (
    <div className="settings-page-wrapper" style={{position:'relative'}}>
      <button
        className="admin-back-button"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(76,81,191,0.13)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
        onClick={() => navigate('/admin/adminpage')}
      >
        ← Back
      </button>
      <div className="settings-form-container">
        <h2>Update Admin Settings</h2>
        {message && <div className="form-message">{message}</div>}
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <div className="input-icon-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-icon-wrapper">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">New Password</label>
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-icon-wrapper">
              <FaCheck className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="save-settings-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

