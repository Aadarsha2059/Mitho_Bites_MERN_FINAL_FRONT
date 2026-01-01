import React, { useState, useEffect } from 'react';
import momo from '../../assets/images/momo.png';
import './ProductTable.css';

const ProductTable = ({ onEdit, onDelete, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/api/admin/product', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        console.log('Fetched products for admin table:', data.data);
        setProducts(data.data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-table-container">
      <h3 className="table-title">Product Table</h3>

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Restaurant</th>
            <th>Type</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter(product => product.categoryName !== 'Thakali Khana items')
            .map((product) => {
              return (
                <tr key={product._id} className="product-row">
                  <td>
                    <img
                      src={product.image || momo}
                      alt={product.name}
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.src = momo;
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="description-cell">
                    {product.description?.length > 50 
                      ? `${product.description.substring(0, 50)}...` 
                      : product.description || 'N/A'}
                  </td>
                  <td>₹{product.price}</td>
                  <td>{product.categoryName || 'N/A'}</td>
                  <td>{product.restaurantName || 'N/A'}</td>
                  <td>{product.type || 'N/A'}</td>
                  <td>
                    <span className={`status ${product.isAvailable ? 'available' : 'unavailable'}`}>
                      {product.isAvailable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {product.categoryName !== 'Thakali Khana items' && (
                      <button
                        className="btn edit-btn"
                        onClick={() => onEdit(product)}
                        title="Edit Product"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn delete-btn"
                      onClick={() => onDelete(product._id)}
                      title="Delete Product"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="no-data">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

