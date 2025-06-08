import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import momoBg from '../assets/momo.png';
import RegisterForm from '../components/authh/RegisterForm';

function SignUpPage() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div 
      className="signup-container" 
      style={{ backgroundImage: `url(${momoBg})` }}
    >
      <div className="signup-box">
        <h2 className="signup-heading">Create Your Account</h2>

        <RegisterForm />

        <div className="login-redirect">
          <span>Already have an account?</span>
          <button 
            className="login-button" 
            onClick={handleBackToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
