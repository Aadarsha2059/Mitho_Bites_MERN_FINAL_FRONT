import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserEdit } from 'react-icons/fa';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import UpdateProfile from './UpdateProfile';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  useEffect(() => {
    console.log('Profile component mounted');
    console.log('User data:', user);
  }, [user]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  // Add error boundary
  if (!user) {
    console.log('No user data available');
    return (
      <div className="profile-page-full profile-floating-bg">
        <div className="profile-background">
          <div className="profile-background-overlay"></div>
        </div>
        <div className="profile-floating-container">
          <button className="profile-back-btn" onClick={handleBack} title="Back to Dashboard">
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div className="profile-content">
            <h2 className="profile-title">Your Profile</h2>
            <p className="profile-subtitle">Loading user information...</p>
            <div className="profile-card">
              <p>Please wait while we load your profile information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-full profile-floating-bg">
      <div className="profile-background">
        <div className="profile-background-overlay"></div>
      </div>
      <div className="profile-floating-container">
        <button className="profile-back-btn" onClick={handleBack} title="Back to Dashboard">
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <div className="profile-content">
          <h2 className="profile-title">Your Profile</h2>
          <p className="profile-subtitle">View and manage your account information</p>
          <div className="profile-card">
            <div className="profile-info-section">
              <div className="profile-avatar">
                <FaUserCircle className="profile-avatar-icon" />
              </div>
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="profile-info-label">
                    <FaUserCircle className="profile-info-icon" />
                    <span>Full Name</span>
                  </div>
                  <div className="profile-info-value">
                    {user?.fullname || 'Not provided'}
                  </div>
                </div>
                
                <div className="profile-info-item">
                  <div className="profile-info-label">
                    <FaUserCircle className="profile-info-icon" />
                    <span>Username</span>
                  </div>
                  <div className="profile-info-value">
                    {user?.username || 'Not provided'}
                  </div>
                </div>
                
                <div className="profile-info-item">
                  <div className="profile-info-label">
                    <FaEnvelope className="profile-info-icon" />
                    <span>Email Address</span>
                  </div>
                  <div className="profile-info-value">
                    {user?.email || 'Not provided'}
                  </div>
                </div>
                
                <div className="profile-info-item">
                  <div className="profile-info-label">
                    <FaPhone className="profile-info-icon" />
                    <span>Phone Number</span>
                  </div>
                  <div className="profile-info-value">
                    {user?.phone || 'Not provided'}
                  </div>
                </div>
                
                <div className="profile-info-item">
                  <div className="profile-info-label">
                    <FaMapMarkerAlt className="profile-info-icon" />
                    <span>Address</span>
                  </div>
                  <div className="profile-info-value">
                    {user?.address || 'Not provided'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="edit-profile-btn" onClick={() => setShowUpdateProfile(true)}>
            <FaUserEdit style={{ marginRight: 8 }} /> Edit Profile
          </button>
        </div>
      </div>
      {showUpdateProfile && (
        <div className="profile-update-modal-overlay">
          <UpdateProfile />
          <button className="profile-update-modal-close" onClick={() => setShowUpdateProfile(false)} title="Close Update Profile">×</button>
        </div>
      )}
    </div>
  );
};

export default Profile; 
