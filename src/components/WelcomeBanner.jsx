import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { FaHeart, FaStar, FaFire } from 'react-icons/fa';
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  const { user } = useContext(AuthContext);
  const username = user?.username || user?.fullname || 'Foodie';

  return (
    <div className="welcome-banner magical-banner">
      <div className="banner-bg-animation"></div>
      
      <div className="banner-content">
        <div className="banner-icon-container">
          <div className="banner-icon-circle">
            <FaHeart className="banner-icon" />
          </div>
          <div className="banner-sparkle banner-sparkle-1">✨</div>
          <div className="banner-sparkle banner-sparkle-2">✨</div>
          <div className="banner-sparkle banner-sparkle-3">✨</div>
        </div>

        <div className="banner-text">
          <h1 className="banner-title">
            Welcome Back, <span className="banner-username">{username}</span>!
          </h1>
          <p className="banner-subtitle">
            <FaStar className="banner-subtitle-icon" />
            Your food paradise awaits
            <FaFire className="banner-subtitle-icon" />
          </p>
        </div>
      </div>

      <div className="banner-decoration banner-decoration-1"></div>
      <div className="banner-decoration banner-decoration-2"></div>
      <div className="banner-decoration banner-decoration-3"></div>
    </div>
  );
};

export default WelcomeBanner;
