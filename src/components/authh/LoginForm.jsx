// components/authh/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authProvider';

const LoginForm = () => {
  const { setUser } = useContext(AuthContext); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate login process
    setTimeout(() => {
      // Simulated user authentication
      const dummyUser = { username };
      setUser(dummyUser); // Set user in AuthContext
      console.log('Logged in as:', username);
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-group password-group">
        <input
          type="password"
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
  );
};

export default LoginForm;
