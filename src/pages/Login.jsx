
import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/images/logo/logo.png';
import background from '../assets/images/categories/category2.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    console.log('Username:', username);
    console.log('Password:', password);
    
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-wrapper">
        <img src={logo} alt="Mitho Bites Logo" className="login-logo" />
        <div className="login-card">
          <h2>Welcome Back to Mitho Bites</h2>
          <p className="login-subtitle">Your favorite food is just a click away!</p>
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
              <a href="/forgot-password" className="forgot-password">Forgot password?</a>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="signup-prompt">
            Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;