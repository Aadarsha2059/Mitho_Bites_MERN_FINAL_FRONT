import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useVerifyOTP } from '../../hooks/useVerifyOTP';
import './OTPVerification.css';

export default function OTPVerification({ userId, email, onClose, onSuccess, otp: providedOtp, previewUrl, emailProvider }) {
  const { mutate, isPending } = useVerifyOTP();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be 6 digits')
      .required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '', // ✅ Always start empty - don't autofill OTP
    },
    validationSchema,
    enableReinitialize: false, // ✅ Don't reinitialize with provided OTP
    onSubmit: (values) => {
      mutate(
        { userId, otp: values.otp },
        {
          onSuccess: (data) => {
            if (onSuccess) onSuccess(data);
          },
        }
      );
    },
  });

  // Handle individual digit input
  const handleDigitChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const digits = formik.values.otp.split('');
    digits[index] = value;
    const newOtp = digits.join('');
    formik.setFieldValue('otp', newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      formik.setFieldValue('otp', pastedData);
      // Focus last filled input
      const lastIndex = Math.min(pastedData.length - 1, 5);
      inputRefs[lastIndex].current?.focus();
    }
  };

  return (
    <div className="otp-verification-overlay" onClick={onClose}>
      <div className="otp-verification-modal" onClick={(e) => e.stopPropagation()}>
        <div className="otp-header">
          <div className="otp-icon">
            <span role="img" aria-label="lock">🔐</span>
          </div>
          <h2 className="otp-title">Enter Verification Code</h2>
          <p className="otp-subtitle">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>
          {previewUrl && (
            <div style={{
              marginTop: '8px', 
              padding: '6px 10px', 
              background: '#f0fdf4', 
              borderRadius: '6px', 
              border: '1px solid #14b8a6',
              fontSize: '12px',
              display: 'inline-block'
            }}>
              <span style={{color: '#0f766e', marginRight: '6px'}}>📧</span>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#14b8a6',
                  textDecoration: 'none',
                  fontSize: '12px'
                }}
              >
                View OTP Email
              </a>
            </div>
          )}
        </div>

        <form onSubmit={formik.handleSubmit} className="otp-form">
          <div className="otp-inputs" onPaste={handlePaste}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                className="otp-digit-input"
                value={formik.values.otp[index] || ''}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isPending || timeLeft === 0}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {formik.touched.otp && formik.errors.otp && (
            <div className="otp-error">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.otp}
            </div>
          )}

          <div className="otp-timer">
            {timeLeft > 0 ? (
              <>
                <span role="img" aria-label="timer">⏱️</span>
                <span>Code expires in: <strong>{formatTime(timeLeft)}</strong></span>
              </>
            ) : (
              <>
                <span role="img" aria-label="expired">⏰</span>
                <span className="expired-text">Code has expired. Please login again.</span>
              </>
            )}
          </div>

          <button
            type="submit"
            className="otp-submit-btn"
            disabled={isPending || timeLeft === 0 || formik.values.otp.length !== 6}
          >
            {isPending ? (
              <>
                <span role="img" aria-label="loading">⏳</span> Verifying...
              </>
            ) : (
              <>
                <span role="img" aria-label="check">✅</span> Verify & Login
              </>
            )}
          </button>

          <div className="otp-help">
            <p>Didn't receive the code?</p>
            <button
              type="button"
              className="resend-btn"
              onClick={onClose}
              disabled={isPending}
            >
              <span role="img" aria-label="back">⬅️</span> Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
