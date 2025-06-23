import React, { useState } from "react";
import { useOrders, useCancelOrder, useMarkOrderReceived } from '../../../hooks/useOrders';
import { FaTimes, FaCheckCircle, FaClock, FaBan, FaReceipt } from 'react-icons/fa';
import "../Dashboard.css";
import axios from 'axios';
import "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Poppins:wght@400;700&display=swap";
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
  const [showAdminMsg, setShowAdminMsg] = useState(false);
  const [adminMsgType, setAdminMsgType] = useState(null); // 'received' or 'cancelled'
  const navigate = useNavigate();

  // Debug logging
  console.log('OrdersSection - ordersData:', ordersData);
  console.log('OrdersSection - orders:', orders);
  console.log('OrdersSection - isLoading:', isLoading);
  console.log('OrdersSection - error:', error);

  // Store dialog open state and message globally, not per order
  const handleMarkReceived = async (orderId) => {
    try {
      await markOrderReceivedMutation.mutateAsync(orderId);
      setAdminMsgType('received');
      setShowAdminMsg(true);
      // Do NOT reload here, let user close dialog
    } catch (err) {
      alert('Failed to mark as received');
    }
  };

  const handleCancelOrder = async (orderId) => {
    await cancelOrderMutation.mutateAsync(orderId);
    setAdminMsgType('cancelled');
    setShowAdminMsg(true);
    setTimeout(() => setShowAdminMsg(false), 6000);
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
      <h2 className="section-title glow-text">Your Orders</h2>
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
      {/* Global dialog overlay for received/cancelled */}
      {showAdminMsg && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: adminMsgType === 'received'
              ? 'linear-gradient(120deg, #f9d423 0%, #ff4e50 100%)'
              : 'linear-gradient(90deg, #ef4444 60%, #fecaca 100%)',
            color: adminMsgType === 'received' ? '#fff' : '#991b1b',
            borderRadius: 32,
            padding: '2.5em 3em',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            textAlign: 'center',
            fontWeight: 900,
            fontSize: '1.35rem',
            border: adminMsgType === 'received' ? '4px solid #ff4e50' : '3px solid #ef4444',
            minWidth: 340,
            maxWidth: '90vw',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif"
          }}>
            {adminMsgType === 'received' ? (
              <>
                <button
                  onClick={() => { setShowAdminMsg(false); navigate('/dashboard'); }}
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 24,
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    color: '#fff',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'color 0.2s',
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
                <span style={{
                  fontSize: '2.8rem',
                  marginBottom: 10,
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 24px #ff4e50, 0 2px 8px #f9d423',
                  fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif"
                }}>
                  💥🎉 Boom! Congratulations! 🎉💥
                </span>
                <span style={{
                  fontSize: '2.1rem',
                  marginBottom: 14,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: 1.2,
                  fontFamily: "'Poppins', 'Montserrat', 'Segoe UI', Arial, sans-serif"
                }}>
                  We are so happy to deliver foods for you!
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  marginBottom: 10,
                  color: '#ffe',
                  fontWeight: 400,
                  fontFamily: "'Poppins', 'Montserrat', 'Segoe UI', Arial, sans-serif"
                }}>
                  Keep on ordering, keep on fooding...<br />
                  <span style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    textShadow: '0 2px 8px #ff4e50',
                    fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif"
                  }}>
                    20+ orders will create a token for attractive gift hampers!
                  </span>
                </span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '2rem', marginBottom: 12 }}>❌ Order Cancelled</span>
                <span style={{ fontSize: '1.1rem', marginBottom: 8 }}>
                  If you have any questions or concerns about this cancellation, please contact our Super Admin:
                </span>
                <a href="mailto:superadmin_aadarsha@gmail.com" style={{
                  color: '#991b1b',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  textDecoration: 'underline',
                  marginTop: 6
                }}>superadmin_aadarsha@gmail.com</a>
                <span style={{ fontSize: '1.08rem', marginTop: 10 }}>
                  We value your feedback and are here to help you 24/7!
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default OrdersSection; 