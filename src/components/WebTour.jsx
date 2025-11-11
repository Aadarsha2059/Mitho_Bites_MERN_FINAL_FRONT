import React from 'react';
import Modal from 'react-modal';
import './WebTour.css';

const tourPages = [
  { 
    title: 'Welcome to BhokBhoj!', 
    icon: '🍽️', 
    content: 'Discover the easiest way to order delicious food in Kathmandu. Let us guide you through all the amazing features that make BhokBhoj your perfect food companion!' 
  },
  { 
    title: 'Browse & Search', 
    icon: '🔍', 
    content: 'Explore 500+ restaurants and thousands of dishes. Use our smart search to find exactly what you\'re craving - from traditional Nepali to international cuisines.' 
  },
  { 
    title: 'Create Account', 
    icon: '👤', 
    content: 'Sign up in seconds to unlock personalized recommendations, save your favorite restaurants, and track your orders in real-time.' 
  },
  { 
    title: 'Add to Cart', 
    icon: '🛒', 
    content: 'Found something delicious? Add it to your cart! Customize your order, adjust quantities, and review everything before checkout.' 
  },
  { 
    title: 'Secure Checkout', 
    icon: '💳', 
    content: 'Choose from multiple payment options - cash on delivery, card, or digital wallets. Your payment information is always secure.' 
  },
  { 
    title: 'Track Delivery', 
    icon: '📍', 
    content: 'Watch your order come to life! Track your delivery in real-time and get notified at every step - from preparation to your doorstep.' 
  },
  { 
    title: 'Enjoy & Review', 
    icon: '⭐', 
    content: 'Enjoy your delicious meal! Share your experience by rating and reviewing to help other food lovers make great choices.' 
  },
  { 
    title: 'You\'re All Set!', 
    icon: '🎉', 
    content: 'That\'s it! You\'re ready to start your food journey with BhokBhoj. Order now and experience the best food delivery in Kathmandu!' 
  },
];

export default function WebTour({ isOpen, onClose }) {
  const [tourStep, setTourStep] = React.useState(0);
  
  const nextTour = () => setTourStep((s) => Math.min(s + 1, tourPages.length - 1));
  const prevTour = () => setTourStep((s) => Math.max(s - 1, 0));
  
  React.useEffect(() => { 
    if (!isOpen) setTourStep(0); 
  }, [isOpen]);

  const progress = ((tourStep + 1) / tourPages.length) * 100;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Web Tour"
      className="modern-webtour-modal"
      overlayClassName="modern-webtour-overlay"
    >
      <div className="modern-webtour-container">
        <button className="modern-webtour-close" onClick={onClose}>✕</button>
        
        {/* Progress Bar */}
        <div className="modern-webtour-progress-bar">
          <div className="modern-webtour-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="modern-webtour-content">
          <div className="modern-webtour-icon">{tourPages[tourStep].icon}</div>
          <h2 className="modern-webtour-title">{tourPages[tourStep].title}</h2>
          <p className="modern-webtour-description">{tourPages[tourStep].content}</p>
          
          {/* Step Indicator */}
          <div className="modern-webtour-steps">
            {tourPages.map((_, idx) => (
              <div 
                key={idx} 
                className={`modern-webtour-step-dot ${idx === tourStep ? 'active' : ''} ${idx < tourStep ? 'completed' : ''}`}
                onClick={() => setTourStep(idx)}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="modern-webtour-navigation">
          <button
            onClick={prevTour}
            disabled={tourStep === 0}
            className="modern-webtour-btn modern-webtour-btn-prev"
          >
            ← Previous
          </button>
          
          <span className="modern-webtour-counter">
            {tourStep + 1} / {tourPages.length}
          </span>
          
          {tourStep < tourPages.length - 1 ? (
            <button
              onClick={nextTour}
              className="modern-webtour-btn modern-webtour-btn-next"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="modern-webtour-btn modern-webtour-btn-finish"
            >
              Get Started 🚀
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
