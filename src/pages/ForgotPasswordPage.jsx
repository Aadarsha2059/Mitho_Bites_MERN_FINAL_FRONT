import React from 'react';
import './ForgotPasswordPage.css';
import background from '../assets/images/categories/category2.png';
import ForgotPassword from '../components/authh/ForgotPassword';

function ForgotPasswordPage() {
  return (
    <div className="forgot-password-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="forgot-password-wrapper">
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ForgotPasswordPage; 

