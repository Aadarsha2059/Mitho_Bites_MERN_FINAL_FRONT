import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useResetPassword';
import './ResetPassword.css';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const { mutate, isPending } = useResetPassword();

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

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2 className="reset-password-heading">Reset Your Password</h2>
        <p className="reset-password-subtitle">
          Enter your new password below.
        </p>

        <form onSubmit={formik.handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your new password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm your new password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="form-error">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="back-to-login">
          <span>Remember your password?</span>
          <button className="back-button" onClick={handleBackToLogin}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
} 