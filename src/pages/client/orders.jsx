import React from 'react';
import './orders.css';

const Orders = () => {
  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      <div className="orders-empty">
        <p>No orders yet. Start ordering your favorite food!</p>
      </div>
    </div>
  );
};

export default Orders; 