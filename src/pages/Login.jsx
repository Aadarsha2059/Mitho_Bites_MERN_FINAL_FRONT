// pages/Login.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import logo from '../assets/images/logo/logo.png'
import background from '../assets/images/categories/category2.png'
import loginImage from '../assets/login&signup/login web image.png'
import { AuthContext } from '../auth/AuthProvider'
import LoginForm from '../components/authh/LoginForm'

const Login = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignUpRedirect = () => {
    navigate('/register')
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      {/* Floating food icons/confetti */}
      <span className="login-float-icon" style={{top:'12%',left:'8%'}}>🍔</span>
      <span className="login-float-icon icon2">🍕</span>
      <span className="login-float-icon icon3">🍟</span>
      <span className="login-float-icon icon4">🍲</span>
      <div className="login-wrapper">
        <div className="login-container">
          {/* Left side - Image */}
          <div className="login-image-section">
            <img src={loginImage} alt="Login" className="login-image" />
          </div>
          {/* Right side - Form */}
          <div className="login-form-section">
            <img src={logo} alt="BhokBhoj Logo" className="login-logo" style={{filter:'drop-shadow(0 6px 18px #ffcc0077)'}} />
            <div className="login-card" style={{boxShadow:'0 16px 40px #ffcc0033, 0 0 18px #fff2',backdropFilter:'blur(18px) saturate(180%)',border:'2.5px solid #fff3',background:'rgba(255,255,255,0.13)'}}>
              <h2 style={{color:'#fff',fontWeight:900,letterSpacing:'0.5px',textShadow:'0 2px 8px #ffcc0033'}}>Welcome Back to BhokBhoj</h2>
              <p className="login-subtitle" style={{color:'#ffe082',fontWeight:600}}>Your favorite food is just a click away!</p>
              <LoginForm />
              <p className="signup-prompt">
                Don&apos;t have an account?{' '}
                <span onClick={handleSignUpRedirect} className="signup-link">
                  Sign Up
                </span>
              </p>
              <a href="/api/auth/facebook" className="facebook-login-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: '#1877f2', color: '#fff', border: '1px solid #1877f2', borderRadius: '4px', padding: '8px 16px', fontWeight: 500, marginTop: '12px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '24px' }}>
                  <img
                    src={require('../assets/facebook_logo.png')}
                    alt="Facebook logo"
                    style={{ width: '100%', height: '100%' }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='24' height='24'><rect width='48' height='48' rx='8' fill='#1877f2'/><path d='M33 24c0-5-4-9-9-9s-9 4-9 9c0 4.5 3.3 8.2 7.6 8.9v-6.3h-2.3v-2.6h2.3v-2c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .1 2 .1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4v1.8h2.5l-.4 2.6h-2.1v6.3C29.7 32.2 33 28.5 33 24z' fill='#fff'/></svg>`;
                    }}
                  />
                </span>
                <span>Sign in with Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loginGradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float1 { 0%{transform:translateY(0);} 100%{transform:translateY(-18px);} }
        @keyframes float2 { 0%{transform:translateY(0);} 100%{transform:translateY(-12px);} }
        @keyframes float3 { 0%{transform:translateY(0);} 100%{transform:translateY(-22px);} }
        @keyframes float4 { 0%{transform:translateY(0);} 100%{transform:translateY(-15px);} }
      `}</style>
    </div>
  )
}

export default Login


