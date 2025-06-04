import React, { useEffect, useState } from 'react';

export default function RegisterForm() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Please provide information');
  }, []);

  useEffect(() => {
    if (fullname.toLowerCase().includes('aadarsha')) {
      setMessage('Welcome aadarsha');
    }
  }, [fullname]);

  const handleSubmit = () => {
    if (!fullname || !username || !password || !confirmPassword || !phone || !address) {
      setMessage('Provide all information');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setMessage('Signed up successfully');
  };

  return (
    <div className="signup-form">
      <div className="form-group">
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          autoComplete="name"
        />
        <label htmlFor="fullname" className="floating-label">Full Name</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          autoComplete="username"
        />
        <label htmlFor="username" className="floating-label">Username</label>
      </div>

      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          autoComplete="new-password"
        />
        <label htmlFor="password" className="floating-label">Password</label>
      </div>

      <div className="form-group">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          autoComplete="new-password"
        />
        <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
      </div>

      <div className="form-group">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          pattern="[0-9+()-\s]*"
          autoComplete="tel"
        />
        <label htmlFor="phone" className="floating-label">Phone</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=" "
          className="floating-input"
          required
          autoComplete="street-address"
        />
        <label htmlFor="address" className="floating-label">Address</label>
      </div>

      <button className="signup-button" onClick={handleSubmit}>Submit</button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
