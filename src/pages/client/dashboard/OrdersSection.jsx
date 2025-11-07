import React, { useState, useEffect } from 'react';
import { FaStar, FaComment, FaClock, FaMapMarkerAlt, FaTimes, FaCheck, FaHistory } from 'react-icons/fa';
import momo from '../../../assets/images/momo.png';
import './OrdersSection.css';
import BoomCongratulations from '../BoomCongratulations';

const Toast = ({ message, type, onClose }) => (
  <div className={`custom-toast ${type}`}> 
    <span>{message}</span>
    <button className="toast-close" onClick={onClose}>&times;</button>
  </div>
);

const OrdersSection = ({ onGiveFeedback }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toast, setToast] = useState(null);
  const [feedbackProduct, setFeedbackProduct] = useState(null);
  const [feedbackOrderId, setFeedbackOrderId] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        showToast('Order cancelled successfully!', 'error');
        fetchOrders();
      } else {
        showToast('Failed to cancel order: ' + data.message, 'error');
      }
    } catch (error) {
      showToast('Error cancelling order', 'error');
    }
  };

  const handleMarkReceived = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/orders/${orderId}/received`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        showToast('Order marked as received!', 'success');
        fetchOrders();
        setShowCongrats(true);
      } else {
        showToast('Failed to mark order as received: ' + data.message, 'error');
      }
    } catch (error) {
      showToast('Error marking order as received', 'error');
    }
  };

  const handleGiveFeedback = (orderId, product) => {
    setFeedbackOrderId(orderId);
    setFeedbackProduct(product);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null,
          productId: feedbackData.productId,
          rating: feedbackData.rating,
          comment: feedbackData.comment
        })
      });
      const data = await response.json();
      if (data.success) {
        showToast('Feedback submitted successfully!', 'success');
        setFeedbackProduct(null);
        setFeedbackOrderId(null);
      } else {
        showToast('Failed to submit feedback: ' + data.message, 'error');
      }
    } catch (error) {
      showToast('Error submitting feedback', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: '#ff9800', icon: <FaClock />, text: 'Pending' },
      'received': { color: '#4caf50', icon: <FaCheck />, text: 'Received' },
      'cancelled': { color: '#f44336', icon: <FaTimes />, text: 'Cancelled' }
    };
    const config = statusConfig[status.toLowerCase()] || statusConfig['pending'];
    return (
      <div className="status-badge" style={{ backgroundColor: config.color }}>
        {config.icon} {config.text}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="orders-section">
        <div className="loading-container">
          <div className="loader">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-section">
      <h2 className="section-title">Order History</h2>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showCongrats && (
        <BoomCongratulations onClose={() => setShowCongrats(false)} />
      )}
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card animated-card">
              <div className="order-status-badge">
                {getStatusBadge(order.orderStatus)}
              </div>
              <div className="order-header">
                <div className="order-date">
                  <FaClock />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="order-id">
                  Order #{order._id.slice(-6).toUpperCase()}
                </div>
              </div>
              <div className="order-items">
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.productId?.image || momo}
                      alt={item.productId?.name || 'Product'}
                      className="order-item-image"
                      onError={(e) => {
                        e.target.src = momo;
                      }}
                    />
                    <div className="order-item-info">
                      <h4>{item.productId?.name || 'Product'}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price}</p>
                      {item.categoryName && (
                        <p className="item-category">Category: {item.categoryName}</p>
                      )}
                      {item.restaurantName && (
                        <p className="item-restaurant">Restaurant: {item.restaurantName}</p>
                      )}
                      {item.restaurantLocation && (
                        <p className="item-location">📍 {item.restaurantLocation}</p>
                      )}
                      {order.orderStatus === 'received' && (
                        <button
                          className="feedback-btn"
                          onClick={() => handleGiveFeedback(order._id, item)}
                        >
                          <FaComment /> Give Feedback
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: ₹{order.totalAmount}</strong>
                </div>
                <div className="order-location">
                  <FaMapMarkerAlt />
                  <span>{order.deliveryAddress?.street || 'Delivery address'}</span>
                </div>
              </div>
              <div className="order-actions">
                {order.orderStatus === 'pending' && (
                  <>
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      <FaTimes /> Cancel Order
                    </button>
                    <button
                      className="receive-btn"
                      onClick={() => handleMarkReceived(order._id)}
                    >
                      <FaCheck /> Mark Received
                    </button>
                  </>
                )}
                {order.orderStatus === 'cancelled' && (
                  <div className="cancelled-notice">
                    <FaHistory /> Order Cancelled
                  </div>
                )}
              </div>
              
              {/* Foreground Feedback Overlay */}
              {feedbackOrderId === order._id && feedbackProduct && (
                <div className="feedback-overlay">
                  <div className="feedback-overlay-content">
                    <FeedbackForm 
                      order={order}
                      product={feedbackProduct}
                      onSubmit={handleFeedbackSubmit}
                      onClose={() => { setFeedbackProduct(null); setFeedbackOrderId(null); }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Feedback Form Component (foreground overlay)
const FeedbackForm = ({ order, product, onSubmit, onClose }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productId: product.productId._id,
      rating,
      comment
    });
  };

  return (
    <div className="feedback-overlay-container">
      <div className="feedback-overlay-backdrop" onClick={onClose}></div>
      <div className="feedback-overlay-modal">
        <div className="feedback-modal-header">
          <h3>Rate Your Experience</h3>
          <button className="feedback-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="feedback-product-info">
          <img
            src={product.productId?.image || '/placeholder.jpg'}
            alt={product.productId?.name}
            className="feedback-product-image"
          />
          <div className="feedback-product-details">
            <h4>{product.productId?.name}</h4>
            <p>Order #{order._id.slice(-6).toUpperCase()}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="feedback-form-overlay">
          <div className="rating-section">
            <label>How would you rate this product?</label>
            <div className="rating-stars-large">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star-large ${star <= rating ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <span className="rating-text">{rating} out of 5 stars</span>
          </div>
          
          <div className="comment-section">
            <label>Share your experience (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              rows="4"
              className="feedback-textarea"
            />
          </div>
          
          <div className="feedback-actions-overlay">
            <button type="button" onClick={onClose} className="cancel-feedback-btn">
              Cancel
            </button>
            <button type="submit" className="submit-feedback-btn">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrdersSection; 
