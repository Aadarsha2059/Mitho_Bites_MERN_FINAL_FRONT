import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../../components/admin/ProductTable';
import DeleteModal from '../../components/DeleteModal';
import { toast } from 'react-toastify';
import './ProductManagement.css';

export default function ProductManagement() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (product) => {
    navigate(`/admin/product/${product._id}/edit`);
  };

  const handleDelete = async (productId) => {
    setDeleteId(productId);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/admin/product/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product deleted!');
        setDeleteId(null);
        // Refresh the page to update the product list
        window.location.reload();
      } else {
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  const handleAdd = () => {
    navigate('/admin/adminpage');
  };

  return (
    <div className="product-management-container" style={{position:'relative'}}>
      <button
        className="admin-back-button"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 100,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontWeight: 700,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(76,81,191,0.13)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
        }}
        onClick={() => navigate('/admin/adminpage')}
      >
        ← Back
      </button>
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this product?"
      />
      <ProductTable 
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
}

