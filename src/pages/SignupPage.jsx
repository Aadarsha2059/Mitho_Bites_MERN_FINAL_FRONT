import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import momoBg from '../assets/momo.png';
import signupImage from '../assets/login&signup/sign up web image.png';
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
      {/* Floating food icons/confetti */}
      <span className="signup-float-icon" style={{top:'12%',left:'8%'}}>🍔</span>
      <span className="signup-float-icon icon2">🍕</span>
      <span className="signup-float-icon icon3">🍟</span>
      <span className="signup-float-icon icon4">🍲</span>
      <div className="signup-wrapper">
        <div className="signup-layout" style={{maxWidth: '1300px', gap: '80px', minHeight: '650px'}}>
          {/* Left side - Image */}
          <div className="signup-image-section">
            <img src={signupImage} alt="Sign Up" className="signup-image enhanced-signup-image" />
          </div>
          {/* Right side - Form */}
          <div className="signup-form-section">
            <div className="signup-box enhanced-signup-box" style={{boxShadow:'0 24px 60px #34d39944, 0 0 24px #fff4',backdropFilter:'blur(22px) saturate(200%)',border:'3px solid #fff4',background:'rgba(255,255,255,0.18)', maxWidth: '540px', padding: '60px 48px 70px'}}>
              <h2 className="signup-heading" style={{color:'#fff',fontWeight:900,letterSpacing:'0.5px',textShadow:'0 2px 8px #34d39933', fontSize: '2.5rem'}}>Create Your Account</h2>
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
        </div>
      </div>
      <style>{`
        @keyframes signupGradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float1 { 0%{transform:translateY(0);} 100%{transform:translateY(-18px);} }
        @keyframes float2 { 0%{transform:translateY(0);} 100%{transform:translateY(-12px);} }
        @keyframes float3 { 0%{transform:translateY(0);} 100%{transform:translateY(-22px);} }
        @keyframes float4 { 0%{transform:translateY(0);} 100%{transform:translateY(-15px);} }
      `}</style>
    </div>
  );
}

export default SignUpPage;

