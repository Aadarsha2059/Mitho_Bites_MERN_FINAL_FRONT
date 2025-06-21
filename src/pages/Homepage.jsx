import React, { useState } from 'react';
import Footer from '../layouts/Footer';
import './Homepage.css';
import HomepageBody from '../components/HomepageBody';
import HomepageHeader from '../layouts/HomepageHeader';
import ModalContainer from '../components/common/ModalContainer';
import LoginForm from '../components/authh/LoginForm';
import ForgotPassword from '../components/authh/ForgotPassword';
import RegisterForm from '../components/authh/RegisterForm';

const Homepage = () => {
  const [modalType, setModalType] = useState(null); // 'login', 'forgot-password', 'signup'

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'login':
        return (
          <div>
            <LoginForm />
            <div className="modal-actions">
              <button 
                className="modal-action-btn forgot-password-btn"
                onClick={() => setModalType('forgot-password')}
              >
                Forgot Password?
              </button>
              <div className="signup-prompt">
                <span>Don't have an account? </span>
                <button 
                  className="modal-action-btn signup-btn"
                  onClick={() => setModalType('signup')}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        );
      case 'forgot-password':
        return (
          <div>
            <ForgotPassword />
            <div className="modal-actions">
              <button 
                className="modal-action-btn back-to-login-btn"
                onClick={() => setModalType('login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      case 'signup':
        return (
          <div>
            <RegisterForm />
            <div className="modal-actions">
              <button 
                className="modal-action-btn back-to-login-btn"
                onClick={() => setModalType('login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'login':
        return 'Welcome Back to Mitho Bites';
      case 'forgot-password':
        return 'Forgot Password';
      case 'signup':
        return 'Create Your Account';
      default:
        return '';
    }
  };

  return (
    <div className="homepage">
      <HomepageHeader onLoginClick={() => openModal('login')} />
      <main style={{ marginTop: '70px', flex: 1 }}>
        <HomepageBody />
      </main>
      <Footer />
      
      <ModalContainer 
        isOpen={modalType !== null}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {renderModalContent()}
      </ModalContainer>
    </div>
  );
};

export default Homepage;
