import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { getBackendImageUrl } from '../../../utils/backend-image';
import './Cart.css';

const CartDialog = ({ onClose, onProceedPayment }) => {
  const { cart, removeFromCart, clearCart, getCartTotal, updateQuantity, cartLoading } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [isClearingCart, setIsClearingCart] = useState(false);

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

  const handleQuantity = (productId, qty) => {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    
    // Add loading state for this specific item
    setUpdatingItems(prev => new Set(prev).add(productId));
    
    // Update quantity - the mutation will handle success/error
    if (updateQuantity) {
      updateQuantity(productId, qty);
    }
    
    // Remove loading state after a short delay for better UX
    setTimeout(() => {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 500);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Your Order ({cart.length} items)</h2>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all items from your cart?')) {
                setIsClearingCart(true);
                clearCart();
                // Reset clearing state after a delay
                setTimeout(() => setIsClearingCart(false), 1000);
              }
            }}
            disabled={isClearingCart || cartLoading}
            className="clear-cart-btn"
            style={{
              background: (isClearingCart || cartLoading) ? '#ccc' : '#ff4444',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: (isClearingCart || cartLoading) ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.3s ease',
              opacity: (isClearingCart || cartLoading) ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!e.target.disabled) {
                e.target.style.background = '#cc0000';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.disabled) {
                e.target.style.background = '#ff4444';
              }
            }}
            title="Remove all items from cart"
          >
            {isClearingCart ? '⏳ Clearing...' : '🗑️ Clear Cart'}
          </button>
        </div>
        {cart.map(item => {
          // Handle both backend cart structure and local cart structure
          // Backend returns: { _id, productId: { populated product }, quantity, price }
          const product = item.productId || item.product || item;
          
          // Get product details with fallbacks
          const productName = product?.name || product?.productName || 'Unknown Product';
          const productImage = product?.filepath || product?.image || '/placeholder-food.jpg';
          const productPrice = item.price || product?.price || 0;
          const productQuantity = item.quantity || 1;
          
          // Use product._id for cart operations (backend expects productId)
          const productIdForOps = product?._id || item?.productId;
          // Use item._id as unique key for React
          const itemKey = item._id || productIdForOps || Math.random();
          
          // Extract category and restaurant information
          // Check if categoryId/restaurantId are populated objects or just IDs
          const category = typeof product?.categoryId === 'object' ? product.categoryId : null;
          const restaurant = typeof product?.restaurantId === 'object' ? product.restaurantId : null;
          
          const categoryName = category?.name || 'Unknown Category';
          const restaurantName = restaurant?.name || 'Unknown Restaurant';
          const restaurantLocation = restaurant?.location || 'Location not available';
          const productType = product?.type || 'Unknown Type';
          
          const imageUrl = productImage ? getBackendImageUrl(productImage) : null;
          return (
            <div key={itemKey} className="cart-item">
              <img 
                src={imageUrl || '/placeholder-food.jpg'} 
                alt={productName} 
                className="item-image"
                onError={(e) => {
                  e.target.src = '/placeholder-food.jpg';
                }}
              />
              <div className="item-details">
                <h3>{productName}</h3>
                <div className="item-meta">
                  <span className="category">📂 {categoryName}</span>
                  <span className="restaurant">🏪 {restaurantName}</span>
                  <span className="location">📍 {restaurantLocation}</span>
                  <span className="type">{productType}</span>
                </div>
              </div>
              <div className="item-controls">
                <div className="quantity-controls" style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'white'
                }}>
                  <button 
                    onClick={() => handleQuantity(productIdForOps, productQuantity - 1)}
                    disabled={isProcessing || updatingItems.has(productIdForOps) || cartLoading}
                    style={{
                      background: updatingItems.has(productIdForOps) ? '#ccc' : '#008B8B',
                      border: 'none',
                      color: 'white',
                      width: '36px',
                      height: '36px',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      lineHeight: 1,
                      cursor: (isProcessing || updatingItems.has(productIdForOps) || cartLoading) ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      borderRadius: '6px 0 0 6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.target.disabled) {
                        e.target.style.background = '#006666';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.target.disabled && !updatingItems.has(productIdForOps)) {
                        e.target.style.background = '#008B8B';
                      }
                    }}
                    title="Decrease quantity"
                  >
                    {updatingItems.has(productIdForOps) ? '⏳' : '−'}
                  </button>
                  <span style={{
                    display: 'inline-block',
                    minWidth: '45px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: '#333',
                    padding: '0 12px',
                    background: '#f8f8f8'
                  }}>{productQuantity}</span>
                  <button 
                    onClick={() => handleQuantity(productIdForOps, productQuantity + 1)}
                    disabled={isProcessing || updatingItems.has(productIdForOps) || cartLoading}
                    style={{
                      background: updatingItems.has(productIdForOps) ? '#ccc' : '#008B8B',
                      border: 'none',
                      color: 'white',
                      width: '36px',
                      height: '36px',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      lineHeight: 1,
                      cursor: (isProcessing || updatingItems.has(productIdForOps) || cartLoading) ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      borderRadius: '0 6px 6px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.target.disabled) {
                        e.target.style.background = '#006666';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.target.disabled && !updatingItems.has(productIdForOps)) {
                        e.target.style.background = '#008B8B';
                      }
                    }}
                    title="Increase quantity"
                  >
                    {updatingItems.has(productIdForOps) ? '⏳' : '+'}
                  </button>
                </div>
                <div className="price-remove">
                  <span className="item-price">NRS {productPrice * productQuantity}</span>
                  <button
                    onClick={() => removeFromCart(productIdForOps)}
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

