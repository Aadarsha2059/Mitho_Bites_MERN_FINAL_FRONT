import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useChangePassword } from '../../hooks/useChangePassword';
import './ChangePassword.css';

// Password strength checker
const checkPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: '', color: '', suggestions: [] };
  
  let strength = 0;
  const suggestions = [];
  
  if (password.length >= 8) strength += 1;
  else suggestions.push('Use at least 8 characters');
  
  if (password.length >= 12) strength += 1;
  
  if (/[A-Z]/.test(password)) strength += 1;
  else suggestions.push('Add uppercase letters (A-Z)');
  
  if (/[a-z]/.test(password)) strength += 1;
  else suggestions.push('Add lowercase letters (a-z)');
  
  if (/[0-9]/.test(password)) strength += 1;
  else suggestions.push('Add numbers (0-9)');
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
  else suggestions.push('Add special characters (!@#$%^&*)');
  
  let label, color, percentage;
  if (strength <= 2) {
    label = 'Weak';
    color = '#8B0000';
    percentage = 25;
  } else if (strength <= 4) {
    label = 'Fair';
    color = '#FFA500';
    percentage = 50;
  } else if (strength <= 5) {
    label = 'Good';
    color = '#FFD700';
    percentage = 75;
  } else {
    label = 'Strong';
    color = '#48bb78';
    percentage = 100;
  }
  
  return { strength, label, color, percentage, suggestions };
};

export default function ChangePassword({ onClose }) {
  const { mutate, isPending } = useChangePassword();
  const [passwordStrength, setPasswordStrength] = useState({ 
    strength: 0, label: '', color: '', percentage: 0, suggestions: [] 
  });

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required')
      .test('different', 'New password must be different from current password', function(value) {
        return value !== this.parent.oldPassword;
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        mutate({ 
          oldPassword: values.oldPassword, 
          newPassword: values.newPassword 
        }, {
          onSuccess: () => {
            if (onClose) onClose();
          }
        });
      } catch (error) {
        console.error('Error changing password:', error);
      }
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    const strength = checkPasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  return (
    <div className="change-password-modal">
      <div className="change-password-header">
        <div className="change-password-icon">
          <span role="img" aria-label="lock">🔐</span>
        </div>
        <h3 className="change-password-title">Change Password</h3>
        <p className="change-password-subtitle">
          Secure your BHOKBHOJ account with a new password
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="change-password-form">
        <div className="form-group">
          <div className="input-wrapper">
            <div className="input-icon">
              <span role="img" aria-label="old-key">🔑</span>
            </div>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              placeholder=" "
            />
            <label htmlFor="oldPassword" className="floating-label">
              Current Password
            </label>
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div className="form-error">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.oldPassword}
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <div className="input-icon">
              <span role="img" aria-label="new-lock">🔒</span>
            </div>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="form-input"
              onChange={handlePasswordChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              placeholder=" "
            />
            <label htmlFor="newPassword" className="floating-label">
              New Password
            </label>
          </div>
          
          {/* Password Strength Indicator */}
          {passwordStrength.label && (
            <div className="password-strength-container">
              <div className="strength-bar-wrapper">
                <div 
                  className="strength-bar-fill" 
                  style={{ 
                    width: `${passwordStrength.percentage}%`,
                    background: passwordStrength.color 
                  }}
                />
              </div>
              <div className="strength-info">
                <span className="strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label === 'Weak' && '🔴'}
                  {passwordStrength.label === 'Fair' && '🟠'}
                  {passwordStrength.label === 'Good' && '🟡'}
                  {passwordStrength.label === 'Strong' && '🟢'}
                  {' '}{passwordStrength.label}
                </span>
              </div>
              
              {passwordStrength.suggestions.length > 0 && (
                <div className="password-suggestions">
                  <div className="suggestion-header">
                    💡 <strong>Strengthen your password:</strong>
                  </div>
                  <ul className="suggestion-list">
                    {passwordStrength.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {passwordStrength.label === 'Strong' && (
                <div className="password-strong-message">
                  ✅ <strong>Excellent!</strong> Your password is strong and secure.
                </div>
              )}
            </div>
          )}
          
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="form-error">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.newPassword}
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <div className="input-icon">
              <span role="img" aria-label="check">✅</span>
            </div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder=" "
            />
            <label htmlFor="confirmPassword" className="floating-label">
              Confirm New Password
            </label>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="form-error">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onClose}
            disabled={isPending}
          >
            <span role="img" aria-label="cancel">❌</span> Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span role="img" aria-label="loading">⏳</span> Changing...
              </>
            ) : (
              <>
                <span role="img" aria-label="save">💾</span> Change Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
