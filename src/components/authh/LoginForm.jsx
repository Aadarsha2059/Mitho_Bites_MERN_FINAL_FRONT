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
import React, { useEffect, useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLoginUser } from '../../hooks/useLoginUser'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthProvider'
import googleLogo from '../../assets/google_logo.png';
import facebookLogo from '../../assets/facebook_logo.png';

export default function LoginForm({ closeModal }) {
  const { mutate, data, error, isPending } = useLoginUser()
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    if (data && !error) {
      console.log('Login successful! Data received:', data);
      console.log('User data:', data.user);
      console.log('Username:', data.user?.username);
      
      // Login the user with the response data
      login(data.user, data.token)
      
      // Close modal if provided
      if (closeModal) closeModal();
      
      // Check if user is admin based on hardcoded credentials
      if (data.user.username === 'admin_aadarsha') {
        console.log('Admin user detected! Navigating to admin page...');
        navigate('/admin/adminpage')
      } else {
        console.log('Regular user detected! Navigating to dashboard...');
        navigate('/dashboard')
      }
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
      mutate(values)
    },
  })

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <div className="login-icon">
          <span role="img" aria-label="login">🍽️</span>
        </div>
        <h3 className="login-subtitle">Welcome to BhokBhoj! Let's get you signed in</h3>
      </div>

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
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">
              <span role="img" aria-label="error">⚠️</span> {formik.errors.password}
            </p>
          )}
        </div>

        <button type="submit" className="login-btn enhanced-login-btn" disabled={isPending}>
          {isPending ? (
            <>
              <span role="img" aria-label="loading">⏳</span> Signing in...
            </>
          ) : (
            <>
              <span role="img" aria-label="arrow">➡️</span> Sign In
            </>
          )}
        </button>

        {error && (
          <div className="error-container">
            <span role="img" aria-label="error">❌</span>
            <p className="error-message">Login failed. Please check your credentials and try again.</p>
          </div>
        )}
      </form>
      <div className="social-login-divider">
        {/* <span>or sign in with</span> */}
      </div>
      {/* <div className="social-login-buttons"> */}
        <button
          // type="button"
          // className="social-btn facebook-btn"
          // style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1877f2', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 16px', fontWeight: 500, cursor: 'pointer', width: '100%', justifyContent: 'center' }}
          // onClick={() => { window.location.href = 'http://localhost:5051/api/auth/facebook'; }}
        >
          {/* <img src={facebookLogo} alt="Facebook" className="social-icon" style={{ width: '24px', height: '24px' }} onError={e => e.target.style.display='none'} /> */}
          {/* Sign in with Facebook */}
        </button>
      </div>
    // </div>
  )
}

