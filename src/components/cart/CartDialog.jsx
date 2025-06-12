import React, { useState } from 'react';
import './CartDialog.css';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const CartDialog = ({ onClose }) => {
  const [quantity, setQuantity] = useState(2);
  const unitPrice = 120;

  const handleAdd = () => setQuantity(prev => prev + 1);
  const handleRemove = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const totalPrice = quantity * unitPrice;

  return (
    <div className="dialog-backdrop">
      <div className="cart-dialog">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className="dialog-title">🛒 My Cart</h2>

        <div className="cart-content">
          <div className="product-info">
            <h3>Food Product: <span>Veg Momo</span></h3>
            <p>Quantity: <strong>{quantity} {quantity === 1 ? 'Plate' : 'Plates'}</strong></p>
            <p>Price per Unit: <strong>Rs. {unitPrice}</strong></p>
            <p className="total">Total Price: <strong>Rs. {totalPrice}</strong></p>
          </div>

          <div className="button-group">
            <button className="remove-btn" onClick={handleRemove} disabled={quantity <= 1}>
              <FaTrashAlt /> Remove Item (1 Plate)
            </button>
            <button className="add-btn" onClick={handleAdd}>
              <FaPlus /> Add Item (1 Plate)
            </button>
          </div>

          <div className="proceed">
            <button className="payment-btn">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDialog;
