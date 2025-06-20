import React, { useState } from 'react';
import { useCart } from '../CartContext';
import './Cart.css';

const CartDialog = ({ onClose, onProceedPayment }) => {
  const { cart, removeFromCart, clearCart, getCartTotal, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleProceedPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      if (onProceedPayment) onProceedPayment();
    }, 1000);
  };

  const handleQuantity = (id, qty) => {
    if (qty < 1) removeFromCart(id);
    else if (updateQuantity) updateQuantity(id, qty);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some tasty items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="cart-wrapper expanded-cart-modal">
      <button className="modal-close-btn" onClick={onClose}>×</button>
      <div className="cart-items-container expanded-cart-items">
        <h2>Your Order ({cart.length} items)</h2>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <div className="item-meta">
                <span className="category">{item.type}</span>
                <span className="restaurant">{item.restaurant}</span>
              </div>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button onClick={() => handleQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="price-remove">
                <span className="item-price">NRS {item.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  title="Remove item"
                >🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="order-summary-container expanded-order-summary">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal ({cart.length} items)</span>
          <span>NRS {subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
            {deliveryFee === 0 ? 'FREE' : `NRS ${deliveryFee}`}
          </span>
        </div>
        <div className="summary-row">
          <span>Taxes & Fees</span>
          <span>NRS {tax}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>NRS {total}</span>
        </div>

        {subtotal < 500 && (
          <p className="add-more">
            Add NRS {500 - subtotal} more for FREE delivery! 🚚
          </p>
        )}

        <button
          className="proceed-btn"
          disabled={isProcessing}
          onClick={handleProceedPayment}
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'} →
        </button>
      </aside>
    </div>
  );
};

export default CartDialog;
