import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from '../../api/api';
import './OrderManagement.css';

const OrderManagement = () => {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('');

  // Fetch orders
  const { data: ordersData, isLoading, refetch } = useQuery({
    queryKey: ['admin-orders', filterStatus],
    queryFn: async () => {
      const params = { page: 1, limit: 100 };
      if (filterStatus) params.status = filterStatus;
      const response = await axios.get('/admin/order', { params });
      return response.data;
    },
  });

  // Accept order mutation
  const acceptMutation = useMutation({
    mutationFn: async (orderId) => {
      const response = await axios.put(`/admin/order/${orderId}/accept`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      toast.success('Order accepted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to accept order');
    },
  });

  // Reject order mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ orderId, reason }) => {
      const response = await axios.put(`/admin/order/${orderId}/reject`, { reason });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-orders']);
      toast.success('Order rejected successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject order');
    },
  });

  const handleAccept = (orderId) => {
    if (window.confirm('Are you sure you want to accept this order?')) {
      acceptMutation.mutate(orderId);
    }
  };

  const handleReject = (orderId) => {
    const reason = window.prompt('Please provide a reason for rejection (optional):');
    if (reason !== null) {
      rejectMutation.mutate({ orderId, reason });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'received': return '#3b82f6';
      case 'cancelled': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const orders = ordersData?.data || [];

  return (
    <div className="order-management-container">
      <div className="order-management-header">
        <h1>📦 Place Order Management</h1>
        <p>Manage and review orders from user dashboard</p>
      </div>

      <div className="order-filters">
        <button
          className={`filter-btn ${filterStatus === '' ? 'active' : ''}`}
          onClick={() => setFilterStatus('')}
        >
          All Orders
        </button>
        <button
          className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filterStatus === 'accepted' ? 'active' : ''}`}
          onClick={() => setFilterStatus('accepted')}
        >
          Accepted
        </button>
        <button
          className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilterStatus('rejected')}
        >
          Rejected
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p className="order-user">
                    👤 {order.userId?.fullname || order.userId?.username || 'Unknown User'}
                  </p>
                  <p className="order-email">{order.userId?.email || ''}</p>
                </div>
                <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order.orderStatus) }}>
                  {order.orderStatus.toUpperCase()}
                </div>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span className="item-name">{item.productName || item.productId?.name || 'Unknown'}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                    <span className="item-price">NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span>Subtotal:</span>
                  <span>NPR {order.subtotal}</span>
                </div>
                <div className="detail-row">
                  <span>Delivery Fee:</span>
                  <span>NPR {order.deliveryFee}</span>
                </div>
                <div className="detail-row">
                  <span>Tax:</span>
                  <span>NPR {order.tax}</span>
                </div>
                <div className="detail-row total">
                  <span>Total:</span>
                  <span>NPR {order.totalAmount}</span>
                </div>
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <span>{order.paymentMethod?.toUpperCase() || 'CASH'}</span>
                </div>
                {order.deliveryAddress && (
                  <div className="detail-row">
                    <span>Delivery Address:</span>
                    <span>{order.deliveryAddress.street || 'N/A'}</span>
                  </div>
                )}
                {order.deliveryInstructions && (
                  <div className="detail-row">
                    <span>Instructions:</span>
                    <span>{order.deliveryInstructions}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span>Order Date:</span>
                  <span>{new Date(order.createdAt || order.orderDate).toLocaleString()}</span>
                </div>
              </div>

              {order.orderStatus === 'pending' && (
                <div className="order-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(order._id)}
                    disabled={acceptMutation.isPending || rejectMutation.isPending}
                  >
                    ✅ Accept Order
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(order._id)}
                    disabled={acceptMutation.isPending || rejectMutation.isPending}
                  >
                    ❌ Reject Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

