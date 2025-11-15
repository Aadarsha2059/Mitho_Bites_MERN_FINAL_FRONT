import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useResetPassword';
import './ResetPassword.css';

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

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { mutate, isPending } = useResetPassword();
  const [passwordStrength, setPasswordStrength] = useState({ 
    strength: 0, label: '', color: '', percentage: 0, suggestions: [] 
  });

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        mutate({ token, password: values.password });
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    const strength = checkPasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <div className="reset-password-icon">
          <span role="img" aria-label="lock">🔐</span>
        </div>
        <h2 className="reset-password-heading">Reset Your Password</h2>
        <p className="reset-password-subtitle">
          Create a strong new password for your BHOKBHOJ account
        </p>

        <form onSubmit={formik.handleSubmit} className="reset-password-form">
          <div className="form-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <span role="img" aria-label="lock">🔒</span>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                className="form-input"
                onChange={handlePasswordChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder=" "
              />
              <label htmlFor="password" className="floating-label">
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
            
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">
                <span role="img" aria-label="error">⚠️</span> {formik.errors.password}
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

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? (
              <>
                <span role="img" aria-label="loading">⏳</span> Resetting Password...
              </>
            ) : (
              <>
                <span role="img" aria-label="key">🔑</span> Reset Password
              </>
            )}
          </button>
        </form>

        <div className="back-to-login">
          <span>Remember your password?</span>
          <button className="back-button" onClick={handleBackToLogin}>
            <span role="img" aria-label="back">⬅️</span> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
} 
