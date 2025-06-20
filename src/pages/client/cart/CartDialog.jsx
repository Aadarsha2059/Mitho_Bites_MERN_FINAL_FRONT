import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      price: 299,
      quantity: 2,
      image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Main Course",
      rating: 4.8,
      cookingTime: "25-30 min",
      description: "Aromatic basmati rice with tender chicken pieces"
    },
    {
      id: 2,
      name: "Butter Chicken",
      price: 249,
      quantity: 1,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300",
      category: "Main Course",
      rating: 4.7,
      cookingTime: "20-25 min",
      description: "Creamy tomato-based curry with tender chicken"
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const handleProceedPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/paymentmethod');
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some tasty items to your cart!</p>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-items-container">
        <h2>Your Order ({cartItems.length} items)</h2>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.description}</p>
              <div className="item-meta">
                <span className="category">{item.category}</span>
                <span className="rating">⭐ {item.rating}</span>
                <span className="time">⏰ {item.cookingTime}</span>
              </div>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease quantity of ${item.name}`}
                >−</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >+</button>
              </div>
              <div className="price-remove">
                <span className="item-price">NRS {item.price * item.quantity}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  title="Remove item"
                >🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="order-summary-container">
        <h2>Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal ({cartItems.length} items)</span>
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

export default Cart;
