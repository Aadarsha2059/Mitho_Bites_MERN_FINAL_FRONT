import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const { mutate, isPending } = useForgotPassword();

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
        mutate(values);
      } catch (error) {
        console.error('Error sending reset email:', error);
      }
    },
  });

  return (
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
  );
} 