import React from "react";
import { useCart } from '../CartContext';
import { FaTimes, FaCheckCircle, FaClock, FaBan } from 'react-icons/fa';
import "../Dashboard.css";

const statusMap = {
  pending: { label: 'Pending', icon: <FaClock style={{ color: '#f59e42' }} /> },
  received: { label: 'Received', icon: <FaCheckCircle style={{ color: '#4ade80' }} /> },
  cancelled: { label: 'Cancelled', icon: <FaBan style={{ color: '#ef4444' }} /> },
};

const OrdersSection = () => {
  const { orders, cancelOrder, updateOrderStatus } = useCart();

  return (
    <section className="section">
      <h2 className="section-title glow-text">Your Orders</h2>
      <div className="categories-row" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        {orders.length === 0 ? (
          <div className="category-card animated-card">
            <p>No orders yet. Start ordering your favorite food!</p>
          </div>
        ) : (
          orders.map(order => (
            <div className="category-card animated-card" key={order.id} style={{ minWidth: 0, width: '100%', maxWidth: 600 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Order #{order.id}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {statusMap[order.status]?.icon} <span style={{ marginLeft: 4 }}>{statusMap[order.status]?.label}</span>
                </span>
              </div>
              <div style={{ fontSize: '0.98rem', marginBottom: 6 }}>
                <b>Placed:</b> {new Date(order.createdAt).toLocaleString()}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Items:</b>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} x{item.quantity} (NPR {item.price * item.quantity})</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Total:</b> NPR {order.total}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Payment:</b> {order.paymentType === 'online' ? `${order.paymentService} (Online)` : 'Cash on Delivery'}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {order.status === 'pending' && (
                  <button
                    className="micro-btn"
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => cancelOrder(order.id)}
                  >
                    <FaTimes style={{ marginRight: 6 }} /> Cancel Order
                  </button>
                )}
                {order.status === 'pending' && (
                  <button
                    className="micro-btn"
                    style={{ background: '#4ade80', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => updateOrderStatus(order.id, 'received')}
                  >
                    <FaCheckCircle style={{ marginRight: 6 }} /> Mark as Received
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