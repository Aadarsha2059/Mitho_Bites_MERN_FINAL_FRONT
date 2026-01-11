import React, { useState, useContext } from 'react';
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import api from '../../api/api';
import './ChangePassword.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordExpiryWarning, setPasswordExpiryWarning] = useState('');

  // Check for password expiry warning from login response
  React.useEffect(() => {
    const warning = localStorage.getItem('passwordExpiryWarning');
    if (warning) {
      setPasswordExpiryWarning(warning);
      localStorage.removeItem('passwordExpiryWarning');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  // Client-side password strength validation
  const validatePasswordStrength = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    if (!validatePasswordStrength(formData.newPassword)) {
      setError('Password too weak. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.success) {
        setSuccess(response.data.message || 'Password changed successfully. Your new password expires in 90 days.');
        // Clear form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Clear password expiry warning after successful change
        setPasswordExpiryWarning('');
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="change-password-page">
      <div className="change-password-container">
        <button className="change-password-back-btn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>

        <div className="change-password-content">
          <div className="change-password-header">
            <FaLock className="change-password-icon" />
            <h2 className="change-password-title">Change Password</h2>
            <p className="change-password-subtitle">Update your account password</p>
          </div>

          {/* Password Expiry Warning Banner */}
          {passwordExpiryWarning && (
            <div className="password-expiry-warning">
              <p>⚠️ {passwordExpiryWarning}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="change-password-alert change-password-alert-error">
              <p>{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="change-password-alert change-password-alert-success">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="change-password-form">
            {/* Current Password */}
            <div className="change-password-field">
              <label htmlFor="currentPassword" className="change-password-label">
                Current Password
              </label>
              <div className="change-password-input-wrapper">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="change-password-input"
                  placeholder="Enter your current password"
                  required
                />
                <button
                  type="button"
                  className="change-password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="change-password-field">
              <label htmlFor="newPassword" className="change-password-label">
                New Password
              </label>
              <div className="change-password-input-wrapper">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="change-password-input"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  className="change-password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="change-password-hint">
                Must be at least 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Confirm New Password */}
            <div className="change-password-field">
              <label htmlFor="confirmPassword" className="change-password-label">
                Confirm New Password
              </label>
              <div className="change-password-input-wrapper">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="change-password-input"
                  placeholder="Confirm your new password"
                  required
                />
                <button
                  type="button"
                  className="change-password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="change-password-submit-btn"
              disabled={loading}
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
