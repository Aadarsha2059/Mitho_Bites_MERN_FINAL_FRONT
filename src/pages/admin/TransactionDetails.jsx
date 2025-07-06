import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './TransactionDetails.css';

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/admin/paymentmethod/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setTransaction(data.data);
        setEditForm({
          food: data.data.food,
          quantity: data.data.quantity,
          totalprice: data.data.totalprice,
          paymentmode: data.data.paymentmode,
          status: data.data.status,
          customerInfo: data.data.customerInfo || {}
        });
      } else {
        setError(data.message || 'Failed to fetch transaction');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError('Error fetching transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/admin/paymentmethod/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Transaction updated successfully!');
        setTransaction(data.data);
        setIsEditing(false);
      } else {
        toast.error(data.message || 'Failed to update transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Error updating transaction');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      food: transaction.food,
      quantity: transaction.quantity,
      totalprice: transaction.totalprice,
      paymentmode: transaction.paymentmode,
      status: transaction.status,
      customerInfo: transaction.customerInfo || {}
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5050/api/admin/paymentmethod/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          toast.success('Transaction deleted successfully!');
          navigate('/admin/transaction-history');
        } else {
          toast.error(data.message || 'Failed to delete transaction');
        }
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Error deleting transaction');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('customerInfo.')) {
      const field = name.split('.')[1];
      setEditForm(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          [field]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) {
    return <div className="transaction-details-loading">Loading transaction details...</div>;
  }

  if (error) {
    return <div className="transaction-details-error">Error: {error}</div>;
  }

  if (!transaction) {
    return <div className="transaction-details-error">Transaction not found</div>;
  }

  return (
    <div className="transaction-details-container">
      <div className="transaction-details-header">
        <button className="back-button" onClick={() => navigate('/admin/transaction-history')}>
          <FaArrowLeft /> Back to Transaction History
        </button>
        <div className="header-actions">
          {!isEditing && (
            <>
              <button className="edit-btn" onClick={handleEdit}>
                <FaEdit /> Edit
              </button>
              <button className="print-btn" onClick={handlePrint}>
                <FaPrint /> Print
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <FaTrash /> Delete
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="transaction-details-content">
        <div className="transaction-card">
          <div className="transaction-header">
            <h2>Transaction Details</h2>
            <div className="transaction-id">
              ID: {transaction._id}
            </div>
          </div>

          <div className="transaction-info-grid">
            <div className="info-section">
              <h3>Order Information</h3>
              <div className="info-item">
                <label>Order ID:</label>
                <span>{transaction.orderId || 'N/A'}</span>
              </div>
              <div className="info-item">
                <label>Food Items:</label>
                <span>{isEditing ? (
                  <input
                    type="text"
                    name="food"
                    value={editForm.food}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  transaction.food
                )}</span>
              </div>
              <div className="info-item">
                <label>Quantity:</label>
                <span>{isEditing ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleInputChange}
                    className="edit-input"
                    min="1"
                  />
                ) : (
                  transaction.quantity
                )}</span>
              </div>
              <div className="info-item">
                <label>Total Price:</label>
                <span className="price">₹{isEditing ? (
                  <input
                    type="number"
                    name="totalprice"
                    value={editForm.totalprice}
                    onChange={handleInputChange}
                    className="edit-input"
                    min="0"
                    step="0.01"
                  />
                ) : (
                  transaction.totalprice
                )}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Payment Information</h3>
              <div className="info-item">
                <label>Payment Mode:</label>
                <span>{isEditing ? (
                  <select
                    name="paymentmode"
                    value={editForm.paymentmode}
                    onChange={handleInputChange}
                    className="edit-select"
                  >
                    <option value="online">Online</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Card</option>
                    <option value="esewa">eSewa</option>
                    <option value="khalti">Khalti</option>
                  </select>
                ) : (
                  <span className={`payment-mode ${transaction.paymentmode}`}>
                    {transaction.paymentmode}
                  </span>
                )}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span>{isEditing ? (
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleInputChange}
                    className="edit-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                )}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Customer Information</h3>
              <div className="info-item">
                <label>Name:</label>
                <span>{isEditing ? (
                  <input
                    type="text"
                    name="customerInfo.name"
                    value={editForm.customerInfo.name || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  transaction.customerInfo?.name || 'N/A'
                )}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{isEditing ? (
                  <input
                    type="text"
                    name="customerInfo.phone"
                    value={editForm.customerInfo.phone || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  transaction.customerInfo?.phone || 'N/A'
                )}</span>
              </div>
              <div className="info-item">
                <label>Address:</label>
                <span>{isEditing ? (
                  <input
                    type="text"
                    name="customerInfo.address"
                    value={editForm.customerInfo.address || ''}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  transaction.customerInfo?.address || 'N/A'
                )}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Timestamps</h3>
              <div className="info-item">
                <label>Created:</label>
                <span>{new Date(transaction.createdAt).toLocaleString()}</span>
              </div>
              <div className="info-item">
                <label>Last Updated:</label>
                <span>{new Date(transaction.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails; 