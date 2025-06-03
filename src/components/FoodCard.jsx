import React from 'react';
import './FoodCard.css';

const FoodCard = ({ title, image, price }) => {
  return (
    <div className="food-card">
      <img src={image} alt={title} className="food-image" />
      <div className="food-info">
        <h3>{title}</h3>
        <p>Rs. {price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
