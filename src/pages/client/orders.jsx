import React, { useState } from 'react';
import { useOrders, useCancelOrder, useMarkOrderReceived } from '../../hooks/useOrders';
import { FaShoppingBag, FaSpinner, FaCheckCircle, FaTimesCircle, FaClock, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { orders, isLoading, error, refetch } = useOrders();
  const cancelOrderMutation = useCancelOrder();
  const markReceivedMutation = useMarkOrderReceived();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrderMutation.mutate(orderId);
    }
  };

  const handleMarkReceived = (orderId) => {
    if (window.confirm('Have you received this order? A bill will be sent to your email.')) {
      markReceivedMutation.mutate(orderId);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'received':
        return <FaCheckCircle className="status-icon received" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'received':
        return 'Received';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="orders-loading">
        <FaSpinner className="spinner" />
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-error">
        <p>Error loading orders: {error.message}</p>
        <button onClick={refetch} className="retry-btn">Retry</button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-header-section">
          <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h2 className="orders-title">Your Orders</h2>
        </div>
        <div className="orders-empty">
          <FaShoppingBag className="empty-icon" />
          <h3>No orders yet!</h3>
          <p>Start ordering your favorite food to see your order history here.</p>
          <div style={{ marginTop: '20px', padding: '20px', background: '#f0f9ff', borderRadius: '8px', textAlign: 'left' }}>
            <h4 style={{ marginBottom: '10px', color: '#0369a1' }}>How to place an order:</h4>
            <ol style={{ paddingLeft: '20px', color: '#475569' }}>
              <li>Browse the menu and add items to your cart</li>
              <li>Click on "Cart" in the navigation</li>
              <li>Fill in your delivery address</li>
              <li>Click "Place Order"</li>
              <li>Your order will appear here!</li>
            </ol>
          </div>
          <a href="/menu" className="browse-menu-btn">Browse Menu</a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header-section">
        <button className="back-to-dashboard-btn" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h2 className="orders-title">Your Orders ({orders.length})</h2>
      </div>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header" onClick={() => toggleOrderDetails(order._id)}>
              <div className="order-info">
                <h3 className="order-id">Order #{order._id.slice(-8)}</h3>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="order-status">
                {getStatusIcon(order.orderStatus)}
                <span className={`status-text ${order.orderStatus}`}>
                  {getStatusText(order.orderStatus)}
                </span>
              </div>
              
              <div className="order-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">NPR {order.totalAmount}</span>
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="order-details">
                <div className="order-items">
                  <h4>Order Items:</h4>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          {item.productId?.image ? (
                            <img 
                              src={item.productId.image} 
                              alt={item.productName || 'Product'} 
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/60x60?text=Food';
                              }}
                            />
                          ) : (
                            <div className="no-image">No Image</div>
                          )}
                        </div>
                        <div className="item-info">
                          <h5>{item.productName || 'Unknown Product'}</h5>
                          <p className="item-category">{item.categoryName || 'Unknown Category'}</p>
                          <p className="item-restaurant">{item.restaurantName || 'Unknown Restaurant'}</p>
                          {item.restaurantLocation && (
                            <p className="item-location">{item.restaurantLocation}</p>
                          )}
                          <p className="item-type">{item.foodType || 'Unknown Type'}</p>
                        </div>
                        <div className="item-quantity">
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="item-price">
                          <span>NPR {item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">No items in this order</p>
                  )}
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>NPR {order.subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>NPR {order.deliveryFee}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>NPR {order.tax}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>NPR {order.totalAmount}</span>
                  </div>
                </div>

                <div className="delivery-info">
                  <h4>Delivery Information:</h4>
                  <p><strong>Address:</strong> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
                  {order.deliveryInstructions && (
                    <p><strong>Instructions:</strong> {order.deliveryInstructions}</p>
                  )}
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  {order.estimatedDeliveryTime && (
                    <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}</p>
                  )}
                </div>

                {order.orderStatus === 'pending' && (
                  <div className="order-actions">
                    <button 
                      onClick={() => handleMarkReceived(order._id)}
                      disabled={markReceivedMutation.isPending}
                      className="received-order-btn"
                    >
                      {markReceivedMutation.isPending ? 'Processing...' : 'Mark as Received'}
                    </button>
                    <button 
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancelOrderMutation.isPending}
                      className="cancel-order-btn"
                    >
                      {cancelOrderMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 
