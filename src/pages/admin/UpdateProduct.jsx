import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './UpdateProduct.css';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryId: '',
    type: '',
    restaurantId: '',
    description: '',
    isAvailable: true,
    filepath: null
  });

  useEffect(() => {
    // Fetch all data in parallel for better performance
    const fetchAllData = async () => {
      try {
        // Use Promise.allSettled to ensure all promises complete even if some fail
        await Promise.allSettled([
          fetchProduct(),
          fetchCategories(),
          fetchRestaurants()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Ensure loading is set to false even if there's an error
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }
      
      if (!id) {
        throw new Error('Product ID is missing');
      }
      
      console.log('Fetching product with ID:', id);
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`http://localhost:5050/api/admin/product/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Product data received:', data);
      
      if (data.success && data.data) {
        const productData = data.data;
        setProduct(productData);
        
        // Handle categoryId - can be object or string
        const categoryId = productData.categoryId?._id || productData.categoryId || '';
        
        // Handle restaurantId - can be object or string
        const restaurantId = productData.restaurantId?._id || productData.restaurantId || '';
        
        setFormData({
          name: productData.name || '',
          price: productData.price || '',
          categoryId: categoryId,
          type: productData.type || '',
          restaurantId: restaurantId,
          description: productData.description || '',
          isAvailable: productData.isAvailable !== false,
          filepath: null
        });
      } else {
        toast.error(data.message || 'Failed to fetch product');
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error.name === 'AbortError') {
        toast.error('Request timeout. Please try again.');
      } else {
        toast.error('Error fetching product: ' + (error.message || 'Network error'));
      }
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/restaurants');
      const data = await response.json();
      
      if (data.success) {
        setRestaurants(data.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'filepath' && files && files[0]) {
      setFormData({
        ...formData,
        filepath: files[0]
      });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    
    if (!formData.categoryId) {
      toast.error('Please select a category');
      return;
    }
    
    if (!formData.type || !formData.type.trim()) {
      toast.error('Please enter the food type (Indian/Nepali)');
      return;
    }
    
    if (!formData.restaurantId) {
      toast.error('Please select a restaurant');
      return;
    }

    const updateData = new FormData();
    updateData.append('name', formData.name.trim());
    updateData.append('price', formData.price);
    updateData.append('categoryId', formData.categoryId);
    updateData.append('type', formData.type.trim());
    updateData.append('restaurantId', formData.restaurantId);
    updateData.append('description', formData.description.trim());
    updateData.append('isAvailable', formData.isAvailable);

    // Only append image if a new one is selected
    if (formData.filepath) {
      updateData.append('image', formData.filepath);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please login again.');
        return;
      }
      
      const response = await fetch(`http://localhost:5050/api/admin/product/${id}`, {
        method: 'PUT',
        body: updateData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product updated successfully!');
        // Clear file input and preview
        setFormData((prev) => ({ ...prev, filepath: null }));
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        // Navigate immediately without waiting
        navigate('/admin/product');
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product: ' + (error.message || 'Network error'));
    }
  };

  if (loading) {
    return (
      <div className="update-product-loading">
        <div>Loading product...</div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
          If this takes too long, please check your connection and try again.
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="update-product-error">
        <div>Product not found</div>
        <button 
          onClick={() => navigate('/admin/product')}
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="update-product-container">
      <div className="update-product-header">
        <button 
          className="back-button"
          onClick={() => navigate('/admin/product')}
        >
          <FaArrowLeft /> Back to Products
        </button>
        <h1>Update Product</h1>
      </div>

      <div className="update-product-content">
        <form onSubmit={handleSubmit} className="update-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Food Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Type</option>
                <option value="Indian">Indian</option>
                <option value="Nepali">Nepali</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="categoryId">Category *</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="restaurantId">Restaurant *</label>
              <select
                id="restaurantId"
                name="restaurantId"
                value={formData.restaurantId}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="filepath">Product Image</label>
            <div className="file-input-container">
              <input
                type="file"
                id="filepath"
                name="filepath"
                onChange={handleInputChange}
                accept="image/*"
                ref={fileInputRef}
                className="file-input"
              />
              <label htmlFor="filepath" className="file-input-label">
                <FaUpload /> Choose Image
              </label>
            </div>
            {/* Show preview if new image selected, else show current image */}
            {imagePreview ? (
              <div className="current-image">
                <p>New Image Preview:</p>
                <img src={imagePreview} alt="New preview" className="current-image-preview" />
              </div>
            ) : product.image && (
              <div className="current-image">
                <p>Current Image:</p>
                <img src={product.image} alt="Current product" className="current-image-preview" />
              </div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span className="checkbox-text">Available for Order</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin/product')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="update-btn">
              <FaSave /> Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct; 
