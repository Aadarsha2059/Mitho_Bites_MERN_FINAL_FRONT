import React from 'react';
import { FaArrowLeft, FaBookOpen, FaStar, FaLightbulb, FaUtensils } from 'react-icons/fa';
import './KhanaKhajan.css';
import { useNavigate } from 'react-router-dom';

const KhanaKhajan = () => {
  const navigate = useNavigate();
  return (
    <div className="khanakhajan-page decorated-bg">
      <button className="back-arrow-btn" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
        <FaArrowLeft />
      </button>
      <div className="khanakhajan-header">
        <FaBookOpen className="khanakhajan-icon" />
        <h2 className="khanakhajan-title">Khana Khajan</h2>
      </div>
      <div className="khanakhajan-content">
        <div className="kk-section">
          <FaStar className="kk-section-icon" />
          <div>
            <div className="kk-section-title">Featured Recipes</div>
            <div className="kk-section-desc">Try our handpicked recipes for a delicious experience!</div>
          </div>
          <button className="kk-action-btn">Explore</button>
        </div>
        <div className="kk-section">
          <FaLightbulb className="kk-section-icon" />
          <div>
            <div className="kk-section-title">Food Tips</div>
            <div className="kk-section-desc">Get expert tips to make your meals healthier and tastier.</div>
          </div>
          <button className="kk-action-btn">Read Tips</button>
        </div>
        <div className="kk-section">
          <FaUtensils className="kk-section-icon" />
          <div>
            <div className="kk-section-title">Explore More</div>
            <div className="kk-section-desc">Discover new cuisines, ingredients, and cooking styles.</div>
          </div>
          <button className="kk-action-btn">Discover</button>
        </div>
      </div>
    </div>
  );
};

export default KhanaKhajan; 
