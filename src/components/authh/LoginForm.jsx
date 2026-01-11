// // components/authh/LoginForm.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../auth/authProvider';

// const LoginForm = () => {
//   const { setUser } = useContext(AuthContext); 
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }
//     setError('');
//     setIsSubmitting(true);

//     // Simulate login process
//     setTimeout(() => {
//       // Simulated user authentication
//       const dummyUser = { username };
//       setUser(dummyUser); // Set user in AuthContext
//       console.log('Logged in as:', username);
//       setIsSubmitting(false);
//       navigate('/dashboard');
//     }, 1000);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="login-form">
//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </div>
//       <div className="input-group password-group">
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <a href="/forgot-password" className="forgot-password">Forgot password?</a>
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       <button type="submit" className="login-btn" disabled={isSubmitting}>
//         {isSubmitting ? 'Logging in...' : 'Login'}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;


// import React from 'react'
// import { useFormik } from 'formik'
// import * as Yup from "yup"
// import { useLoginUser } from '../../hooks/useLoginUser'

// export default function LoginForm() {
//   const { mutate, data, error, isPending } = useLoginUser()
//   const validationSchema = Yup.object(
//     {
//       username: Yup.string().required("Please fill username"),
//       password: Yup.string().min(6, "Password needs 6 character")
//         .required("Please fill the password")

//     }
//   )
//   const formik = useFormik(
//     {
//       initialValues: {
//         //states
//         username: "",
//         password: ""
//       },
//       validationSchema,
//       onSubmit: (values) => {
//         //values automatically create the object of value states
//         mutate(values)


//       }
//     }


//   )


//   return (
//     <div>LoginForm
//       <form onSubmit={formik.handleSubmit}>
//         <lable>Username</lable>
//         <input
//           type='username'
//           name='username'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.username}
//         ></input>
//         {formik.touched.username && formik.errors.username &&
//           <p>{formik.errors.username}</p>

//         }
//         <input
//           type='password'
//           name='password'
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//         ></input>

//         {
//           formik.touched.password && formik.errors.password &&
//           <p>{formik.errors.password}</p>
//         }
//         <button type='submit'>Login</button>

//       </form>
//     </div>
//   )
// }



// components/authh/LoginForm.jsx
import './LoginForm.css'
import React, { useEffect, useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthProvider'
import { toast } from 'react-toastify'
import googleLogo from '../../assets/google_logo.png';
import facebookLogo from '../../assets/facebook_logo.png';
import OTPVerification from './OTPVerification';

// Login attempt tracking
const LOGIN_ATTEMPTS_KEY = 'login_attempts';
const LOCKOUT_TIME_KEY = 'lockout_until';
const MAX_ATTEMPTS = 10; // Changed from 5 to 10 attempts
const LOCKOUT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export default function LoginForm({ closeModal }) {
  const { mutate, data, error, isPending } = useLoginUser()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [isLocked, setIsLocked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otpData, setOtpData] = useState(null)

  // Check lockout status on component mount
  useEffect(() => {
    checkLockoutStatus();
    const interval = setInterval(checkLockoutStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if account is locked
  const checkLockoutStatus = () => {
    const lockoutUntil = localStorage.getItem(LOCKOUT_TIME_KEY);
    const attempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0');
    
    setAttemptCount(attempts);
    
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      const now = Date.now();
      
      if (now < lockoutTime) {
        setIsLocked(true);
        const remaining = Math.ceil((lockoutTime - now) / 1000);
        setRemainingTime(remaining);
      } else {
        // Lockout expired, reset
        localStorage.removeItem(LOCKOUT_TIME_KEY);
        localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
        setIsLocked(false);
        setRemainingTime(0);
        setAttemptCount(0);
      }
    } else {
      setIsLocked(false);
      setRemainingTime(0);
    }
  };

  // Handle failed login attempt
  const handleFailedAttempt = () => {
    const currentAttempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0') + 1;
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, currentAttempts.toString());
    setAttemptCount(currentAttempts);
    
    if (currentAttempts >= MAX_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem(LOCKOUT_TIME_KEY, lockoutUntil.toString());
      setIsLocked(true);
      toast.error(`Too many failed attempts! Account locked for 10 minutes.`);
    } else {
      const remaining = MAX_ATTEMPTS - currentAttempts;
      toast.warning(`Login failed! ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining before lockout.`);
    }
  };

  // Handle successful login
  const handleSuccessfulLogin = () => {
    // Clear login attempts on successful login
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_TIME_KEY);
    setAttemptCount(0);
    setIsLocked(false);
  };

  useEffect(() => {
    if (data && !error) {
      console.log('Login response received:', data);
      
      // ✅ PASSWORD EXPIRY: Check if password expired
      if (data.requirePasswordReset) {
        toast.error(data.message || "Password expired. Please reset your password.");
        // Optionally redirect to password reset or change password page
        setTimeout(() => {
          navigate('/settings/change-password');
        }, 2000);
        return;
      }
      
      // ✅ PASSWORD EXPIRY: Store warning if password is expiring soon
      if (data.warning) {
        localStorage.setItem('passwordExpiryWarning', data.warning);
        toast.warning(data.warning);
      }
      
      // Check if OTP is required
      if (data.requireOTP) {
        console.log('OTP required. Showing OTP modal...');
        
        // Show simple OTP message
        toast.info("Please enter the verification code to continue.");
        
        // Get preview URL from response (prefer emailPreviewUrl, fallback to previewUrl)
        const previewUrl = data.emailPreviewUrl || data.previewUrl || null;
        
        setOtpData({
          userId: data.userId,
          email: data.email,
          otp: null, // ✅ Don't include OTP - user must enter manually
          previewUrl: previewUrl, // Include preview URL if available
          emailProvider: data.emailProvider || 'ethereal',
          warning: data.warning || null // Pass warning to OTP modal
        });
        setShowOTPModal(true);
      } else {
        // Direct login (no OTP required)
        console.log('Login successful! Data received:', data);
        
        // Clear failed attempts
        handleSuccessfulLogin();
        
        // Login the user with the response data
        login(data.user, data.token)
        
        // Close modal if provided
        if (closeModal) closeModal();
        
        // ✅ SECURED: Use server-provided role instead of hardcoded username
        // Admin status is determined by role from database (set server-side)
        // admin_aadarsha has role='admin' in database, backend returns role in response
        if (data.user.role === 'admin') {
          console.log('Admin user detected! Navigating to admin page...');
          navigate('/admin/adminpage')
        } else {
          console.log('Regular user detected! Navigating to dashboard...');
          navigate('/dashboard')
        }
      }
    } else if (error) {
      // Handle failed login attempt
      handleFailedAttempt();
    }
  }, [data, error, navigate, login, closeModal])

  const validationSchema = Yup.object({
    username: Yup.string().required('Please fill username'),
    password: Yup.string().min(6, 'Password needs 6 characters').required('Please fill the password'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (isLocked) {
        toast.error(`Account is locked. Please wait ${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')} minutes.`);
        return;
      }
      mutate(values)
    },
  })

  // Format remaining time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Handle OTP verification success
  const handleOTPSuccess = (otpData) => {
    console.log('OTP verified successfully:', otpData);
    
    // Clear failed attempts
    handleSuccessfulLogin();
    
    // Login the user (if not already logged in by useVerifyOTP hook)
    if (otpData?.user && otpData?.token) {
      login(otpData.user, otpData.token);
    }
    
    // Close OTP modal
    setShowOTPModal(false);
    setOtpData(null);
    
    // Close login modal if provided
    if (closeModal) closeModal();
    
    // ✅ SECURED: Navigate based on server-provided role
    // Use role from server response (not hardcoded username)
    // Admin status is determined by role='admin' from database
    const userRole = otpData?.user?.role;
    
    if (userRole === 'admin') {
      console.log('Admin user detected! Navigating to admin page...');
      setTimeout(() => navigate('/admin/adminpage'), 100);
    } else {
      console.log('Regular user detected! Navigating to dashboard...');
      setTimeout(() => navigate('/dashboard'), 100);
    }
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-form-header">
          <div className="login-icon">
            <span role="img" aria-label="login">🍽️</span>
          </div>
          <h3 className="login-subtitle">Welcome to BhokBhoj! Let's get you signed in</h3>
        </div>

      {isLocked && (
        <div className="lockout-warning">
          <span role="img" aria-label="locked">🔒</span>
          <div>
            <strong>Account Locked</strong>
            <p>Too many failed login attempts. Please wait {formatTime(remainingTime)} before trying again.</p>
          </div>
        </div>
      )}

      {!isLocked && attemptCount > 0 && attemptCount < MAX_ATTEMPTS && (
        <div className="attempt-warning">
          <span role="img" aria-label="warning">⚠️</span>
          <p>{MAX_ATTEMPTS - attemptCount} attempt{MAX_ATTEMPTS - attemptCount !== 1 ? 's' : ''} remaining before account lockout</p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="input-group">
          <div className="input-wrapper">
            <div className="input-icon">
              <span role="img" aria-label="user">👤</span>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Enter your username"
              className="login-input"
              disabled={isLocked}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="error-message">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.username}
            </p>
          )}
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <div className="input-icon">
              <span role="img" aria-label="lock">🔒</span>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
              className="login-input"
              disabled={isLocked}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.password}
            </p>
          )}
        </div>

        <button type="submit" className="login-btn enhanced-login-btn" disabled={isPending || isLocked}>
          {isLocked ? (
            <>
              <span role="img" aria-label="locked">🔒</span> Account Locked
            </>
          ) : isPending ? (
            <>
              <span role="img" aria-label="loading">⏳</span> Signing in...
            </>
          ) : (
            <>
              <span role="img" aria-label="arrow">➡️</span> Sign In
            </>
          )}
        </button>

        {error && !isLocked && (
          <div className="error-container">
            <span role="img" aria-label="error">❌</span>
            <p className="error-message">Login failed. Please check your credentials and try again.</p>
          </div>
        )}
      </form>
      </div>

      {/* OTP Verification Modal */}
      {showOTPModal && otpData && (
        <OTPVerification
          userId={otpData.userId}
          email={otpData.email}
          otp={otpData.otp || null}
          previewUrl={otpData.previewUrl || null}
          emailProvider={otpData.emailProvider || 'gmail'}
          onClose={() => {
            setShowOTPModal(false);
            setOtpData(null);
          }}
          onSuccess={handleOTPSuccess}
        />
      )}
    </>
  )
}

