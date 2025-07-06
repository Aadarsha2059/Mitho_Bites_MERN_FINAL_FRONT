// pages/Login.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../assets/images/logo/logo.png'
import background from '../assets/images/categories/category2.png'
import loginImage from '../assets/login&signup/login web image.png'
import { AuthContext } from '../auth/authProvider'
import LoginForm from '../components/authh/LoginForm'

const Login = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignUpRedirect = () => {
    navigate('/register')
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-wrapper">
        <div className="login-container">
          {/* Left side - Image */}
          <div className="login-image-section">
            <img src={loginImage} alt="Login" className="login-image" />
          </div>
          
          {/* Right side - Form */}
          <div className="login-form-section">
            <img src={logo} alt="Mitho Bites Logo" className="login-logo" />
            <div className="login-card">
              <h2>Welcome Back to Mitho Bites</h2>
              <p className="login-subtitle">Your favorite food is just a click away!</p>
              <LoginForm />
              <p className="signup-prompt">
                Don&apos;t have an account?{' '}
                <span onClick={handleSignUpRedirect} className="signup-link">
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
