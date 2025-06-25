import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './BoomCongratulations.css';

const BoomCongratulations = ({ open, onClose }) => {
  const navigate = useNavigate();
  if (!open) return null;

  const handleClose = () => {
    if (onClose) onClose();
    navigate('/dashboard');
  };

  return (
    <div className="boom-celebration-overlay">
      <div className="boom-celebration-dialog">
        <button className="boom-celebration-close" onClick={handleClose} aria-label="Close">
          <FaTimes size={22} />
        </button>
        {/* Confetti burst */}
        <div className="boom-celebration-confetti">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        {/* Animated Balloons */}
        <div className="boom-balloons">
          <div className="boom-balloon boom-balloon-1">🎈</div>
          <div className="boom-balloon boom-balloon-2">🎈</div>
          <div className="boom-balloon boom-balloon-3">🎈</div>
          <div className="boom-balloon boom-balloon-4">🎈</div>
          <div className="boom-balloon boom-balloon-5">🎈</div>
          <div className="boom-balloon boom-balloon-6">🎈</div>
        </div>
        <div className="boom-celebration-content">
          <div className="boom-celebration-icon">🎉</div>
          <h2 className="boom-celebration-title">Congratulations!</h2>
          <p className="boom-celebration-message">
            You've successfully marked your order as received! <br/>
            Keep ordering delicious food and earn gift tokens after 20+ orders!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoomCongratulations; 