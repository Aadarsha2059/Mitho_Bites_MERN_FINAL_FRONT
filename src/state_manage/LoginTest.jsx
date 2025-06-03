import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png';
import background from '../assets/images/categories/category2.png';

const LoginTest = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMessage('please provide informations');
  }, []);

  useEffect(() => {
    if (username.trim().toLowerCase() === 'salin') {
      setMessage('welcome salin');
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('provide both username and password');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('congratulations');
      console.log('Username:', username);
      console.log('Password:', password);
    }, 1000);
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-wrapper">
        <img src={logo} alt="Mitho Bites Logo" className="login-logo" />
        <div className="login-card">
          <h2>Login Test Page</h2>
          <p className="login-subtitle">Simulated Login Process</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="signup-prompt">
            Message: <strong>{message}</strong>
          </p>
          <p className="signup-prompt">
            Don’t have an account?{' '}
            <span
              onClick={handleSignUpRedirect}
              className="signup-link"
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
