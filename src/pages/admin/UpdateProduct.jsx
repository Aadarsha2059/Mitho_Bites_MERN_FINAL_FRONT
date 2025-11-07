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
    fetchProduct();
    fetchCategories();
    fetchRestaurants();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5050/api/admin/product/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
        setFormData({
          name: data.data.name,
          price: data.data.price,
          categoryId: data.data.categoryId._id,
          type: data.data.type,
          restaurantId: data.data.restaurantId._id,
        });
      } else {
        toast.error(data.message || 'Failed to fetch product');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error fetching product');
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
      const response = await fetch(`http://localhost:5050/api/admin/product/${id}`, {
        method: 'PUT',
        body: updateData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Product updated successfully!');
        // Clear file input and preview
        setFormData((prev) => ({ ...prev, filepath: null }));
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        navigate('/admin/product');
      } else {
        toast.error(data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  if (loading) {
    return <div className="update-product-loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="update-product-error">Product not found</div>;
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
