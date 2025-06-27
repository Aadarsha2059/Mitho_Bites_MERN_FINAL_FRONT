import React from 'react';
import { FaArrowLeft, FaGlobeAsia } from 'react-icons/fa';
import './GKFood.css';
import { useNavigate } from 'react-router-dom';

const GKFood = () => {
  const navigate = useNavigate();
  return (
    <div className="gkfood-page">
      <button className="back-arrow-btn" onClick={() => navigate('/more')} title="Back to More Options">
        <FaArrowLeft />
      </button>
      <div className="gkfood-header">
        <FaGlobeAsia className="gkfood-icon" />
        <h2 className="gkfood-title">GK of Food & Cuisines</h2>
      </div>
      <div className="gkfood-content">
        <p>Explore interesting facts and knowledge about food and cuisines from around the world.</p>
        {/* Add more GK content as needed */}
      </div>
    </div>
  );
};

export default GKFood; 