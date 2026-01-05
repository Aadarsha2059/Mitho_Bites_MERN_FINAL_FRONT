import React, { useState, useEffect } from 'react';
import momo from '../../assets/images/momo.png';
import axios from '../../api/api';
import './ProductTable.css';

const ProductTable = ({ onEdit, onDelete, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    
    // Listen for product deletion events to refresh the list
    const handleProductDeleted = () => {
      fetchProducts();
    };
    
    window.addEventListener('productDeleted', handleProductDeleted);
    
    return () => {
      window.removeEventListener('productDeleted', handleProductDeleted);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }
      
      console.log('🔍 Fetching products from API...');
      console.log('📍 URL: /admin/product');
      console.log('🎫 Token present:', !!token);
      
      // Try using axios first (has better error handling and timeout)
      try {
        const response = await axios.get('/admin/product', {
          timeout: 15000, // 15 second timeout
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('✅ Response received. Status:', response.status);
        console.log('✅ Response data:', response.data);
        
        const data = response.data;
        console.log('✅ Products data received:', data);
        console.log('✅ Data success:', data.success);
        console.log('✅ Data data type:', Array.isArray(data.data) ? 'Array' : typeof data.data);
        console.log('✅ Data data length:', Array.isArray(data.data) ? data.data.length : 'N/A');
        
        if (data.success) {
          const productsList = Array.isArray(data.data) ? data.data : [];
          console.log('✅ Setting products:', productsList.length, 'products');
          
          if (productsList.length > 0) {
            console.log('✅ First product sample:', productsList[0]);
          }
          
          setProducts(productsList);
        } else {
          console.error('❌ API returned error:', data.message);
          setError(data.message || 'Failed to fetch products');
          setProducts([]);
        }
      } catch (axiosError) {
        console.error('❌ Axios error:', axiosError);
        
        // Fallback to fetch if axios fails
        if (axiosError.code === 'ECONNABORTED') {
          throw new Error('Request timeout. The server took too long to respond. Please check if the backend is running.');
        }
        
        if (axiosError.response) {
          // Server responded with error status
          const errorData = axiosError.response.data;
          throw new Error(errorData.message || `Server error: ${axiosError.response.status}`);
        } else if (axiosError.request) {
          // Request was made but no response received
          throw new Error('No response from server. Please check if the backend server is running on http://localhost:5050');
        } else {
          throw new Error(axiosError.message || 'Network error');
        }
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setError('Error fetching products: ' + (error.message || 'Network error. Please check if the backend server is running.'));
      setProducts([]);
    } finally {
      setLoading(false);
      console.log('✅ Loading set to false');
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading products...</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
          Please wait while we fetch the product list.
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ color: '#d32f2f', marginBottom: '10px' }}>Error: {error}</div>
        <button 
          onClick={() => fetchProducts()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter products and handle empty state
  const filteredProducts = products.filter(product => 
    product && product.categoryName !== 'Thakali Khana items'
  );

  return (
    <div className="product-table-container">
      <h3 className="table-title">Product Table</h3>

      {filteredProducts.length === 0 && products.length === 0 ? (
        <div className="no-data" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>No products found</p>
          <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '10px' }}>
            Add a new product to get started.
          </p>
        </div>
      ) : (
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
            {filteredProducts.map((product) => {
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
      )}
    </div>
  );
};

export default ProductTable;

