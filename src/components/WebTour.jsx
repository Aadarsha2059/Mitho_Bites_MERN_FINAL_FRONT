/**
 * WebTour.jsx - Horizontal highway with car, smoke, and bus stops
 */
import React from 'react';
import Modal from 'react-modal';
import './WebTour.css';

const tourPages = [
  { title: 'Welcome to BhokBhoj!', icon: '🚦', content: (<><div className="webtour-title">Welcome to the Highway of Fooding!</div><div className="webtour-desc">Hop in and let us drive you through BhokBhoj. Each stop is a feature you can use to make your food journey amazing!</div></>) },
  { title: 'Login', icon: '🔑', content: (<><div className="webtour-step-title">Login</div><div>Already have an account? Click <b>Login</b> to access your dashboard, order food, track your orders, and manage your profile securely.</div></>) },
  { title: 'Sign Up', icon: '📝', content: (<><div className="webtour-step-title">Sign Up</div><div>New to BhokBhoj? Create an account to unlock all features, save your favorites, and get personalized recommendations!</div></>) },
  { title: 'Dashboard', icon: '🏠', content: (<><div className="webtour-step-title">Dashboard</div><div>After login, your dashboard is your home base. See recommendations, quick links to categories, and your recent activity.</div></>) },
  { title: 'Categories', icon: '🍽️', content: (<><div className="webtour-step-title">Categories</div><div>Browse food categories to discover a variety of cuisines and dishes. Click any category to see available items and add them to your cart.</div></>) },
  { title: 'Cart', icon: '🛒', content: (<><div className="webtour-step-title">Cart</div><div>Add your favorite foods to the cart. Review your selections, update quantities, and proceed to checkout when ready.</div></>) },
  { title: 'Order', icon: '📦', content: (<><div className="webtour-step-title">Order</div><div>Place your order with a single click. Track your order status in real time and get notified when your food is on the way!</div></>) },
  { title: 'Order History', icon: '📜', content: (<><div className="webtour-step-title">Order History</div><div>View all your past orders, reorder your favorites, and keep track of your food journey. Never forget a great meal!</div></>) },
  { title: 'Feedbacks', icon: '💬', content: (<><div className="webtour-step-title">Feedbacks</div><div>Share your experience! Leave feedback on your orders to help us improve and help other foodies choose better. Your voice matters!</div></>) },
  { title: 'Thank You!', icon: '🏁', content: (<><div className="webtour-title">Thank you!</div><div className="webtour-desc">You’ve reached the end of the highway. 🍽️ Enjoy your journey with BhokBhoj! Welcome to the highway of fooding 🚗💨</div></>) },
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

export default function WebTour({ isOpen, onClose }) {
  const [tourStep, setTourStep] = React.useState(0);
  const nextTour = () => setTourStep((s) => Math.min(s + 1, tourPages.length - 1));
  const prevTour = () => setTourStep((s) => Math.max(s - 1, 0));
  React.useEffect(() => { if (!isOpen) setTourStep(0); }, [isOpen]);

  // Debug: log when modal is rendered and open state
  console.log('WebTour rendered, isOpen:', isOpen);

  const reversedStops = [...highwayStops].reverse();
  const totalStops = reversedStops.length;
  const reversedTourStep = totalStops - 1 - tourStep;
  // Calculate car position (left %) for horizontal highway
  const carLeft = `calc(${(reversedTourStep/(totalStops-1))*100}% - 32px)`;
  // Calculate smoke position (behind car)
  const smokeLeft = `calc(${(reversedTourStep/(totalStops-1))*100}% - 60px)`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Web Tour"
      className="webtour-modal webtour-modal-large"
      overlayClassName="webtour-overlay"
    >
      <button className="webtour-close-btn" onClick={onClose} title="Close Tour">✖</button>
      <div className="webtour-content webtour-content-large">
        {/* Animated flying crows background */}
        <div className="webtour-crows-bg">
          <span className="webtour-drop" style={{ left: '12%', animationDelay: '0s' }}>💧</span>
          <span className="webtour-drop" style={{ left: '28%', animationDelay: '0.7s' }}>💧</span>
          <span className="webtour-drop" style={{ left: '45%', animationDelay: '1.3s' }}>💧</span>
          <span className="webtour-drop" style={{ left: '62%', animationDelay: '0.4s' }}>💧</span>
          <span className="webtour-drop" style={{ left: '80%', animationDelay: '1.8s' }}>💧</span>
        </div>
        <div className="webtour-header webtour-header-large">{tourPages[tourStep].icon} {tourPages[tourStep].title}</div>
        <div className="webtour-body webtour-body-large">{tourPages[tourStep].content}</div>
        {/* Horizontal Highway Progress */}
        <div className="webtour-highway-horizontal">
          {/* Highway road line */}
          <div className="webtour-highway-road" />
          {/* Stops (bus stops) */}
          {reversedStops.map((stop, idx) => (
            <div key={idx} className="webtour-highway-stop-horizontal" style={{ left: `calc(${(idx/(totalStops-1))*100}% - 24px)` }}>
              <div className="webtour-highway-busstop" style={{ background: idx === 0 ? '#ffd166' : idx === totalStops-1 ? '#1976d2' : '#fff', borderColor: idx === reversedTourStep ? '#ff6b35' : '#bbb' }}>
                <span className="webtour-highway-icon-horizontal" style={{ opacity: idx <= reversedTourStep ? 1 : 0.4 }}>{stop.icon}</span>
              </div>
              <div className="webtour-highway-label-horizontal" style={{ color: idx === reversedTourStep ? '#ff6b35' : '#888', fontWeight: idx === reversedTourStep ? 'bold' : 'normal' }}>{stop.label}</div>
            </div>
          ))}
          {/* Smoke effect behind car */}
          <div className="webtour-highway-smoke" style={{ left: smokeLeft, top: 38, opacity: tourStep > 0 ? 1 : 0 }}>
            <span role="img" aria-label="smoke" className="webtour-smoke">💨</span>
          </div>
          {/* Car Icon (facing right) */}
          <div className="webtour-highway-car-horizontal" style={{ left: carLeft, top: 18 }}>
            <span role="img" aria-label="car" style={{ fontSize: 48, filter: 'drop-shadow(0 4px 8px #ff6b35aa)', transform: 'none' }}>🚗</span>
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="webtour-nav-row webtour-nav-row-large">
          <button
            onClick={prevTour}
            disabled={tourStep === 0}
            className="webtour-nav-btn webtour-nav-prev webtour-nav-btn-large"
          >
            <span style={{fontSize: 28}}>⬅️</span> Back
          </button>
          <div className="webtour-nav-spacer" />
          {tourStep < tourPages.length - 1 ? (
            <button
              onClick={nextTour}
              className="webtour-nav-btn webtour-nav-next webtour-nav-btn-large"
            >
              Next <span style={{fontSize: 28}}>➡️</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="webtour-nav-btn webtour-nav-finish webtour-nav-btn-large"
            >
              Finish <span style={{fontSize: 28}}>🎉</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
} 
