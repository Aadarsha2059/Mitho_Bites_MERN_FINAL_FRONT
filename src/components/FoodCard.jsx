import React from 'react';
import './FoodCard.css';
import { FaArrowRight } from 'react-icons/fa';

const FoodCard = ({ title, image, price }) => {
  return (
    <div className="food-card">
      <div className="food-image-wrapper">
        <img src={image} alt={title} className="food-image" />
      </div>
      <div className="food-info">
        <h3>{title}</h3>
        <div className="food-details">
          <p className="food-price">Rs. {price}</p>
          <button className="view-details-btn" aria-label={`View details for ${title}`}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
