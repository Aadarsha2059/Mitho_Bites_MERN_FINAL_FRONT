import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { getBackendImageUrl } from '../../../utils/backend-image';
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
        {cart.map(item => {
          // Handle both backend cart structure and local cart structure
          const product = item.productId || item;
          const productName = product.name || 'Unknown Product';
          const productImage = product.filepath || product.image || '/placeholder-food.jpg';
          const productPrice = item.price || product.price || 0;
          const productQuantity = item.quantity || 1;
          const productId = item._id || product._id;
          
          return (
            <div key={productId} className="cart-item">
              <img 
                src={productImage ? getBackendImageUrl(productImage) : '/placeholder-food.jpg'} 
                alt={productName} 
                className="item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-food.jpg';
                }}
              />
              <div className="item-details">
                <h3>{productName}</h3>
                <div className="item-meta">
                  <span className="category">📂 {product.categoryId?.name || 'Unknown Category'}</span>
                  <span className="restaurant">🏪 {product.restaurantId?.name || 'Unknown Restaurant'}</span>
                  <span className="location">📍 {product.restaurantId?.location || 'Location not available'}</span>
                  <span className="type">{product.type || 'Unknown Type'}</span>
                </div>
              </div>
              <div className="item-controls">
                <div className="quantity-controls">
                  <button onClick={() => handleQuantity(productId, productQuantity - 1)}>-</button>
                  <span>{productQuantity}</span>
                  <button onClick={() => handleQuantity(productId, productQuantity + 1)}>+</button>
                </div>
                <div className="price-remove">
                  <span className="item-price">NRS {productPrice * productQuantity}</span>
                  <button
                    onClick={() => removeFromCart(productId)}
                    className="remove-btn"
                    aria-label={`Remove ${productName}`}
                    title="Remove item"
                  >🗑️</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside
        className="order-summary-container expanded-order-summary"
        style={{
          background: 'linear-gradient(135deg, #f8f8ff 0%, #e3f2fd 100%)',
          boxShadow: '0 8px 32px #a18cd144, 0 1.5px 8px #e3f2fd55 inset',
          border: '2.5px solid #90caf9',
          borderRadius: '1.5rem',
          padding: '40px 36px 44px 36px',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          minWidth: '320px',
          maxWidth: '400px',
          alignSelf: 'flex-start',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <h2 style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '2rem', color: '#FF6B35'}}>
          <span role="img" aria-label="summary">🧾</span> Order Summary
        </h2>
        <div className="summary-row" style={{marginBottom: '8px'}}>
          <span><span role="img" aria-label="cart">🛒</span> Subtotal <span style={{fontWeight:400}}>({cart.length} items)</span></span>
          <span style={{fontWeight:700, color:'#FF6B35'}}>NRS {subtotal}</span>
        </div>
        <div className="summary-row" style={{marginBottom: '8px'}}>
          <span><span role="img" aria-label="delivery">🚚</span> Delivery Fee</span>
          <span className={deliveryFee === 0 ? 'free-delivery' : ''} style={{fontWeight:700, color: deliveryFee === 0 ? '#2ca02c' : '#333'}}>
            {deliveryFee === 0 ? 'FREE' : `NRS ${deliveryFee}`}
          </span>
        </div>
        <div className="summary-row" style={{marginBottom: '8px'}}>
          <span><span role="img" aria-label="tax">💸</span> Taxes & Fees</span>
          <span style={{fontWeight:700, color:'#1976D2'}}>NRS {tax}</span>
        </div>
        <div className="summary-row total" style={{background:'#fff3e0', borderRadius:'8px', padding:'12px 0', marginTop:'18px', boxShadow:'0 2px 8px #ff6b3511'}}>
          <span style={{fontSize:'1.3rem', color:'#FF6B35', display:'flex', alignItems:'center', gap:'8px'}}><span role="img" aria-label="total">💰</span> Total</span>
          <span style={{fontWeight:900, fontSize:'1.3rem', color:'#FF6B35'}}>NRS {total}</span>
        </div>

        {subtotal < 500 && (
          <p className="add-more" style={{marginTop:'10px', color:'#FF6B35', fontWeight:600, background:'#fff7e6', borderRadius:'6px', padding:'8px 0'}}>
            <span role="img" aria-label="info">ℹ️</span> Add NRS {500 - subtotal} more for <b>FREE delivery!</b> 🚚
          </p>
        )}

        <button
          className="proceed-btn"
          style={{marginTop:'18px', fontSize:'1.18rem', letterSpacing:'0.5px', boxShadow:'0 2px 8px #ff6b3533'}}
          disabled={isProcessing}
          onClick={handleProceedPayment}
        >
          {isProcessing ? (
            <><span role="img" aria-label="loading">⏳</span> Processing...</>
          ) : (
            <><span role="img" aria-label="pay">💳</span> Proceed to Payment →</>
          )}
        </button>
      </aside>
    </div>
  );
};

export default CartDialog;
