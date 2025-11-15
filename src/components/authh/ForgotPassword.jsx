import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const { mutate, isPending } = useForgotPassword();
  const navigate = useNavigate();
  const [showEmailNotFoundModal, setShowEmailNotFoundModal] = useState(false);
  const [attemptedEmail, setAttemptedEmail] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setAttemptedEmail(values.email);
        mutate(values, {
          onError: (error) => {
            if (error.emailNotFound) {
              setShowEmailNotFoundModal(true);
            }
          }
        });
      } catch (error) {
        console.error('Error sending reset email:', error);
      }
    },
  });

  const handleCloseModal = () => {
    setShowEmailNotFoundModal(false);
    formik.resetForm();
  };

  const handleGoToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="forgot-password-modal">
        <div className="forgot-password-header">
          <div className="forgot-password-icon">
            <span role="img" aria-label="key">🔑</span>
          </div>
          <h3 className="forgot-password-subtitle">
            Don't worry! We'll help you reset your password
          </h3>
        </div>

        <form onSubmit={formik.handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <span role="img" aria-label="email">📧</span>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="forgot-password-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email address"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">
                <span role="img" aria-label="error">⚠️</span> {formik.errors.email}
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? (
              <>
                <span role="img" aria-label="loading">⏳</span> Sending Reset Link...
              </>
            ) : (
              <>
                <span role="img" aria-label="send">📤</span> Send Reset Link
              </>
            )}
          </button>
        </form>
      </div>

      {/* Email Not Found Modal */}
      {showEmailNotFoundModal && (
        <div className="email-not-found-overlay" onClick={handleCloseModal}>
          <div className="email-not-found-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-warning">
              <span role="img" aria-label="warning">⚠️</span>
            </div>
            <h2 className="modal-title">Email Not Registered</h2>
            <p className="modal-message">
              The email address <strong>{attemptedEmail}</strong> is not registered with BHOKBHOJ.
            </p>
            <div className="modal-info-box">
              <p className="info-text">
                <span role="img" aria-label="info">💡</span> 
                <strong>Please check:</strong>
              </p>
              <ul className="info-list">
                <li>Make sure you entered the correct email address</li>
                <li>Check for any typos or spelling errors</li>
                <li>Verify you're using the email you registered with</li>
              </ul>
            </div>
            <div className="modal-actions">
              <button className="modal-btn-secondary" onClick={handleCloseModal}>
                <span role="img" aria-label="back">⬅️</span> Try Again
              </button>
              <button className="modal-btn-primary" onClick={handleGoToSignup}>
                <span role="img" aria-label="signup">📝</span> Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
