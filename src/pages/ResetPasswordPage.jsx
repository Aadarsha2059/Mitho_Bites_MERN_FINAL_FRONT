import React from 'react';
import './ResetPasswordPage.css';
import background from '../assets/images/categories/category2.png';
import ResetPassword from '../components/authh/ResetPassword';

function ResetPasswordPage() {
  return (
    <div className="reset-password-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="reset-password-wrapper">
        <ResetPassword />
      </div>
    </div>
  );
}

export default ResetPasswordPage; 

