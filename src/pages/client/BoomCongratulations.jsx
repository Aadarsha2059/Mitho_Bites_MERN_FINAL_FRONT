import React from 'react';
import './BoomCongratulations.css';

const BoomCongratulations = ({ onClose }) => {
  return (
    <div className="boom-congrats-overlay">
      <div className="boom-congrats-container">
        <button className="boom-congrats-close" onClick={onClose}>&times;</button>
        <div className="boom-balloons">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`balloon balloon-${i % 5}`}></div>
          ))}
        </div>
        <div className="boom-blast"></div>
        <h2 className="boom-congrats-title">Congratulations Foodie!</h2>
        <p className="boom-congrats-message">
          We are happy to deliver foods for you on time!!<br/>
          Keep on ordering. <span className="highlight">20+ orders</span> will provide you attractive gift hampers.
        </p>
      </div>
    </div>
  );
};

export default BoomCongratulations; 
