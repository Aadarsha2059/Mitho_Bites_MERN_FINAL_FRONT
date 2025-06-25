import React, { useState } from "react";
import { useOrders, useCancelOrder, useMarkOrderReceived } from '../../../hooks/useOrders';
import { FaTimes, FaCheckCircle, FaClock, FaBan, FaReceipt, FaStar } from 'react-icons/fa';
import "../Dashboard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const statusMap = {
  pending: { label: 'Pending', icon: <FaClock style={{ color: '#f59e42' }} /> },
  received: { label: 'Received', icon: <FaReceipt style={{ color: '#22c55e' }} /> },
  cancelled: { label: 'Cancelled', icon: <FaBan style={{ color: '#ef4444' }} /> },
};

const OrdersSection = () => {
  const { data: ordersData, isLoading, error } = useOrders();
  const cancelOrderMutation = useCancelOrder();
  const markOrderReceivedMutation = useMarkOrderReceived();
  const orders = ordersData?.data || [];
  const navigate = useNavigate();

  // Debug logging
  console.log('OrdersSection - ordersData:', ordersData);
  console.log('OrdersSection - orders:', orders);
  console.log('OrdersSection - isLoading:', isLoading);
  console.log('OrdersSection - error:', error);

  const handleMarkReceived = async (orderId) => {
    try {
      await markOrderReceivedMutation.mutateAsync(orderId);
      navigate('/boom-congratulations');
    } catch (err) {
      alert('Failed to mark as received');
    }
  };

  const handleCancelOrder = async (orderId) => {
    await cancelOrderMutation.mutateAsync(orderId);
  };

  const handleGiveFeedback = () => {
    // Gather all received items from received orders
    const receivedItems = [];
    orders.forEach(order => {
      if (order.orderStatus === 'received') {
        order.items.forEach(item => {
          receivedItems.push({
            ...item,
            orderId: order._id
          });
        });
      }
    });
    navigate('/give-feedbacks', { state: { items: receivedItems } });
  };

  if (isLoading) {
    return (
      <section className="section">
        <h2 className="section-title glow-text">Your Orders</h2>
        <div className="loading-container">
          <div className="loader">Loading orders...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <h2 className="section-title glow-text">Your Orders</h2>
        <div className="error-container">
          <p>Error loading orders. Please try again later.</p>
          <p>Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title glow-text">Your Orders</h2>
        <button
          className="micro-btn"
          style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={handleGiveFeedback}
        >
          <FaStar style={{ marginRight: 4 }} /> Give Feedback
        </button>
      </div>
      <div className="categories-row orders-grid">
        {orders.length === 0 ? (
          <div className="category-card animated-card">
            <p>No orders yet. Start ordering your favorite food!</p>
          </div>
        ) : (
          orders.map(order => (
            <div className="category-card animated-card order-card" key={order._id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Order #{order._id.slice(-8)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {statusMap[order.orderStatus]?.icon} <span style={{ marginLeft: 4 }}>{statusMap[order.orderStatus]?.label}</span>
                </span>
              </div>
              <div style={{ fontSize: '0.98rem', marginBottom: 6 }}>
                <b>Placed:</b> {new Date(order.createdAt).toLocaleString()}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Items:</b>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>{item.productName}</strong> x{item.quantity} (NPR {item.price * item.quantity})
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '16px' }}>
                        📂 {item.categoryName} | 🏪 {item.restaurantName} | 📍 {item.restaurantLocation} | {item.foodType}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Total:</b> NPR {order.totalAmount}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Payment:</b> {order.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Delivery Address:</b> {order.deliveryAddress?.street}, {order.deliveryAddress?.city}
              </div>
              {order.deliveryInstructions && (
                <div style={{ marginBottom: 8 }}>
                  <b>Instructions:</b> {order.deliveryInstructions}
                </div>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                {order.orderStatus === 'pending' && (
                  <button
                    className="micro-btn"
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={cancelOrderMutation.isPending}
                  >
                    <FaTimes style={{ marginRight: 6 }} />
                    {cancelOrderMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
                {order.orderStatus === 'pending' && (
                  <button
                    className="micro-btn"
                    style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => handleMarkReceived(order._id)}
                    disabled={markOrderReceivedMutation.isPending}
                  >
                    <FaReceipt style={{ marginRight: 6 }} /> Mark as Received
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default OrdersSection; 