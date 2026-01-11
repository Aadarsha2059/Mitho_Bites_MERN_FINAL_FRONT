import React, { useState, useEffect } from 'react';
import { FaStar, FaComment, FaClock, FaMapMarkerAlt, FaTimes, FaCheck, FaHistory } from 'react-icons/fa';
import momo from '../../../assets/images/momo.png';
import './OrdersSection.css';
import BoomCongratulations from '../BoomCongratulations';
import api from '../../../api/api';

const Toast = ({ message, type, onClose }) => (
  <div className={`custom-toast ${type}`}> 
    <span>{message}</span>
    <button className="toast-close" onClick={onClose}>&times;</button>
  </div>
);

const OrdersSection = ({ onGiveFeedback }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [toast, setToast] = useState(null);
  const [feedbackProduct, setFeedbackProduct] = useState(null);
  const [feedbackOrderId, setFeedbackOrderId] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [pendingFeedbackOrder, setPendingFeedbackOrder] = useState(null); // Store order for feedback after congrats

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('=== FETCHING ORDERS ===');
      // ✅ FIXED: Use axios instance with proper error handling
      const response = await api.get('/orders');
      console.log('Orders API response:', response);
      console.log('Orders API response data:', response.data);
      console.log('Orders API response status:', response.status);
      
      if (response.data && response.data.success) {
        const ordersData = response.data.data || [];
        console.log('Orders data received:', ordersData.length, 'orders');
        console.log('Orders data sample:', ordersData[0]);
        // Ensure orders have the correct structure
        const formattedOrders = Array.isArray(ordersData) ? ordersData.map(order => {
          // Ensure order has all required fields
          const formattedOrder = {
            ...order,
            _id: order._id || `order-${Date.now()}-${Math.random()}`,
            orderStatus: order.orderStatus || order.status || 'pending',
            items: order.items || order.products || [],
            totalAmount: order.totalAmount || order.total || 0,
            createdAt: order.createdAt || order.orderDate || new Date(),
            deliveryAddress: order.deliveryAddress || { street: 'Address not specified' }
          };
          
          // Ensure items have required structure
          if (formattedOrder.items && Array.isArray(formattedOrder.items)) {
            formattedOrder.items = formattedOrder.items.map(item => ({
              ...item,
              productId: item.productId || {},
              quantity: item.quantity || 1,
              price: item.price || 0,
              productName: item.productName || item.productId?.name || 'Unknown Product',
              categoryName: item.categoryName || item.productId?.categoryId?.name || 'Unknown Category',
              restaurantName: item.restaurantName || item.productId?.restaurantId?.name || 'Unknown Restaurant',
              restaurantLocation: item.restaurantLocation || item.productId?.restaurantId?.location || 'Location not available'
            }));
          }
          
          return formattedOrder;
        }) : [];
        setOrders(formattedOrders);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where API returns array directly
        console.log('Orders data received as array:', response.data.length, 'orders');
        setOrders(response.data);
      } else {
        console.warn('Orders response format unexpected:', response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.error('Error response:', error.response?.data);
      setOrders([]);
      setError(error);
      
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
        showToast('Cannot connect to server. Please ensure backend is running on port 5050.', 'error');
      } else if (error.response?.status === 401) {
        showToast('Please login to view your orders.', 'error');
      } else {
        showToast('Error loading orders: ' + (error.response?.data?.message || error.message || 'Unknown error'), 'error');
      }
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
      // ✅ FIXED: Use axios instance
      const response = await api.put(`/orders/${orderId}/cancel`);
      if (response.data.success) {
        showToast('Order cancelled successfully!', 'error');
        fetchOrders();
      } else {
        showToast('Failed to cancel order: ' + response.data.message, 'error');
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
        showToast('Cannot connect to server. Please ensure backend is running.', 'error');
      } else {
        showToast('Error cancelling order: ' + (error.response?.data?.message || error.message), 'error');
      }
    }
  };

  const handleMarkReceived = async (orderId) => {
    try {
      // ✅ FIXED: Use axios instance with proper error handling
      const response = await api.put(`/orders/${orderId}/received`);
      if (response.data.success) {
        showToast('Order marked as received! Bill will be sent to your email.', 'success');
        fetchOrders();
        
        // ✅ Store order data for feedback after congrats dialog closes
        const order = response.data.data;
        if (order && order.items && order.items.length > 0) {
          // Store order info to show feedback after congrats closes
          setPendingFeedbackOrder({ orderId, order, firstItem: order.items[0] });
        }
        
        // ✅ Show congratulations dialog first (feedback will show after it closes)
        setShowCongrats(true);
      } else {
        showToast('Failed to mark order as received: ' + response.data.message, 'error');
      }
    } catch (error) {
      console.error('Mark received error:', error);
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED')) {
        showToast('Cannot connect to server. Please ensure backend is running on port 5050.', 'error');
      } else if (error.response?.status === 400) {
        showToast(error.response.data.message || 'Order must be accepted by admin first.', 'error');
      } else {
        showToast('Error marking order as received: ' + (error.response?.data?.message || error.message), 'error');
      }
    }
  };

  // ✅ Handle congrats dialog close - then show feedback modal
  const handleCongratsClose = () => {
    setShowCongrats(false);
    // Show feedback modal after congrats closes
    if (pendingFeedbackOrder) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setFeedbackOrderId(pendingFeedbackOrder.orderId);
        setFeedbackProduct(pendingFeedbackOrder.firstItem);
        setPendingFeedbackOrder(null); // Clear pending
      }, 300);
    }
  };

  const handleGiveFeedback = (orderId, product) => {
    setFeedbackOrderId(orderId);
    setFeedbackProduct(product);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      
      // ✅ FIXED: Use axios instance
      const response = await api.post('/feedbacks', {
        userId: user?._id || user?.id,
        productId: feedbackData.productId,
        rating: feedbackData.rating,
        comment: feedbackData.comment
      });
      
      const data = response.data;
      if (data.success) {
        showToast('Feedback submitted successfully! It will be shown on homepage.', 'success');
        setFeedbackProduct(null);
        setFeedbackOrderId(null);
        
        // ✅ If there are more items in the order, show feedback for next item
        if (feedbackOrderId) {
          const currentOrder = orders.find(o => o._id === feedbackOrderId);
          if (currentOrder && currentOrder.items) {
            const currentProductIndex = currentOrder.items.findIndex(
              item => item.productId?._id === feedbackData.productId || item.productId === feedbackData.productId
            );
            if (currentProductIndex >= 0 && currentProductIndex < currentOrder.items.length - 1) {
              // Show feedback for next item
              setTimeout(() => {
                setFeedbackProduct(currentOrder.items[currentProductIndex + 1]);
              }, 500);
            }
          }
        }
      } else {
        showToast('Failed to submit feedback: ' + data.message, 'error');
      }
    } catch (error) {
      console.error('Feedback submit error:', error);
      showToast('Error submitting feedback', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: '#ff9800', icon: <FaClock />, text: 'Pending' },
      'accepted': { color: '#2196f3', icon: <FaCheck />, text: 'Accepted' },
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

  console.log('=== RENDERING ORDERS SECTION ===');
  console.log('Orders count:', orders.length);
  console.log('Loading:', loading);
  
  const isConnectionError = error && (error.code === 'ERR_NETWORK' || error.message?.includes('ECONNREFUSED') || error.message?.includes('Cannot connect to server'));

  return (
    <div className="orders-section">
      <h2 className="section-title">Order History</h2>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showCongrats && (
        <BoomCongratulations onClose={handleCongratsClose} />
      )}
      {isConnectionError && (
        <div style={{ 
          background: '#ffebee', 
          border: '2px solid #f44336', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          color: '#c62828'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>❌ Connection Error</h3>
          <p style={{ margin: '0 0 10px 0' }}>
            Cannot connect to server. Please ensure backend is running on port 5050.
          </p>
          <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>
            💡 Start the backend server: <code>cd Backend && npm start</code>
          </p>
        </div>
      )}
      {!loading && orders.length === 0 && !isConnectionError ? (
        <div className="no-orders" style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <FaHistory style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.5 }} />
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No orders found</p>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Your order history will appear here once you place an order.
          </p>
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
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    <FaTimes /> Cancel Order
                  </button>
                )}
                {/* ✅ FIXED: Show "Mark as Received" button only when order is accepted by admin */}
                {order.orderStatus === 'accepted' && (
                  <button
                    className="receive-btn"
                    onClick={() => handleMarkReceived(order._id)}
                  >
                    <FaCheck /> Mark as Received
                  </button>
                )}
                {order.orderStatus === 'received' && (
                  <div className="received-notice">
                    <FaCheck /> Order Received
                  </div>
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
          <button 
            className="feedback-close-btn" 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '32px',
              color: '#666',
              cursor: 'pointer',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
              width: '40px',
              height: '40px',
              lineHeight: '1'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#666';
            }}
            aria-label="Close feedback modal"
            title="Close"
          >
            ×
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
