import React from 'react';
import './SignUp.css';
import momoBg from '../assets/momo.png'; // Import the image

function SignUpPage() {
  return (
    <div 
      className="signup-container" 
      style={{ backgroundImage: `url(${momoBg})` }}
    >
      <div className="signup-box">
        <h2 className="signup-heading">Create Your Account</h2>
        <form className="signup-form">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <input type="text" placeholder="Phone" required />
          <input type="text" placeholder="Address" required />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="login-redirect">
          <span>Already have an account?</span>
          <button className="login-button">Back to Login</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
