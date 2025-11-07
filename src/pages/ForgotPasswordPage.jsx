import React from 'react';
import './ForgotPasswordPage.css';
import background from '../assets/images/categories/category2.png';
import logo from '../assets/images/logo/logo.png';
import ForgotPassword from '../components/authh/ForgotPassword';

function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="forgot-password-wrapper">
        <img src={logo} alt="BhokBhoj Logo" className="forgot-password-logo" />
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage; 

