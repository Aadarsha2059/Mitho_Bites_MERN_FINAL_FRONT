import React, { useState } from 'react';
import Footer from '../layouts/Footer';
import './Homepage.css';
import HomepageBody from '../components/HomepageBody';
import HomepageHeader from '../layouts/HomepageHeader';
import ModalContainer from '../components/common/ModalContainer';
import LoginForm from '../components/authh/LoginForm';
import ForgotPassword from '../components/authh/ForgotPassword';
import RegisterForm from '../components/authh/RegisterForm';
import Joyride from 'react-joyride';
import Modal from 'react-modal';
import WebTour from '../components/WebTour';

const Homepage = () => {
  const [modalType, setModalType] = useState(null); // 'login', 'forgot-password', 'signup'
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const tourPages = [
    {
      title: 'Welcome to BhokBhoj!',
      icon: '🚦',
      content: (
        <>
          <div style={{fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>Welcome to the Highway of Fooding!</div>
          <div style={{fontSize: 16}}>Hop in and let us drive you through BhokBhoj. Each stop is a feature you can use to make your food journey amazing!</div>
        </>
      ),
    },
    {
      title: 'Login',
      icon: '🔑',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Login</div>
          <div>Already have an account? Click <b>Login</b> to access your dashboard, order food, track your orders, and manage your profile securely.</div>
        </>
      ),
    },
    {
      title: 'Sign Up',
      icon: '📝',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Sign Up</div>
          <div>New to BhokBhoj? Create an account to unlock all features, save your favorites, and get personalized recommendations!</div>
        </>
      ),
    },
    {
      title: 'Dashboard',
      icon: '🏠',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Dashboard</div>
          <div>After login, your dashboard is your home base. See recommendations, quick links to categories, and your recent activity.</div>
        </>
      ),
    },
    {
      title: 'Categories',
      icon: '🍽️',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Categories</div>
          <div>Browse food categories to discover a variety of cuisines and dishes. Click any category to see available items and add them to your cart.</div>
        </>
      ),
    },
    {
      title: 'Cart',
      icon: '🛒',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Cart</div>
          <div>Add your favorite foods to the cart. Review your selections, update quantities, and proceed to checkout when ready.</div>
        </>
      ),
    },
    {
      title: 'Order',
      icon: '📦',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Order</div>
          <div>Place your order with a single click. Track your order status in real time and get notified when your food is on the way!</div>
        </>
      ),
    },
    {
      title: 'Order History',
      icon: '📜',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Order History</div>
          <div>View all your past orders, reorder your favorites, and keep track of your food journey. Never forget a great meal!</div>
        </>
      ),
    },
    {
      title: 'Feedbacks',
      icon: '💬',
      content: (
        <>
          <div style={{fontWeight: 'bold'}}>Feedbacks</div>
          <div>Share your experience! Leave feedback on your orders to help us improve and help other foodies choose better. Your voice matters!</div>
        </>
      ),
    },
    {
      title: 'Thank You!',
      icon: '🏁',
      content: (
        <>
          <div style={{fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>Thank you!</div>
          <div style={{fontSize: 16}}>You’ve reached the end of the highway. 🍽️ Enjoy your journey with BhokBhoj! Welcome to the highway of fooding 🚗💨</div>
        </>
      ),
    },
  ];

  const highwayStops = [
    { icon: '🚦', label: 'Start' },
    { icon: '🔑', label: 'Login' },
    { icon: '📝', label: 'Sign Up' },
    { icon: '🏠', label: 'Dashboard' },
    { icon: '🍽️', label: 'Categories' },
    { icon: '🛒', label: 'Cart' },
    { icon: '📦', label: 'Order' },
    { icon: '📜', label: 'History' },
    { icon: '💬', label: 'Feedback' },
    { icon: '🏁', label: 'End' },
  ];

  const openTour = () => {
    setTourStep(0);
    setShowOnboarding(true);
  };
  const closeTour = () => setShowOnboarding(false);
  const nextTour = () => setTourStep((s) => Math.min(s + 1, tourPages.length - 1));
  const prevTour = () => setTourStep((s) => Math.max(s - 1, 0));

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
            <LoginForm closeModal={closeModal} />
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
            <RegisterForm closeModal={closeModal} />
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
        return 'Welcome Back to BhokBhoj';
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
      <HomepageHeader onLoginClick={() => openModal('login')} onShowOnboarding={openTour} />
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
      <WebTour isOpen={showOnboarding} onClose={closeTour} />
    </div>
  );
};

export default Homepage;


