import React, { useState, useEffect } from 'react';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import momo from '../../assets/images/momo.png';
import './GiveFeedbacks.css';

const GiveFeedbacks = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/products');
      const data = await response.json();
      
      if (data.success) {
        console.log('Fetched products:', data.data);
        setProducts(data.data);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !comment.trim()) {
      setMessage('Please select a product and write a comment');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5050/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '65f1234567890abcdef12345', // Replace with actual user ID
          productId: selectedProduct._id,
          rating,
          comment: comment.trim()
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Feedback submitted successfully!');
        setSelectedProduct(null);
        setRating(5);
        setComment('');
      } else {
        setMessage(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>Give Feedback</h1>
      </div>

      <div className="feedback-content">
        <div className="product-selection">
          <h2>Select a Product</h2>
          <div className="products-grid">
            {products.map((product) => {
              console.log('Rendering product:', product);
              console.log('Product image field:', product.image);
              
              return (
                <div
                  key={product._id}
                  className={`product-card ${selectedProduct?._id === product._id ? 'selected' : ''}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image || momo}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      console.log('Product image failed to load, using fallback');
                      e.target.src = momo;
                    }}
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price">₹{product.price}</p>
                    {product.categoryId && (
                      <p className="category">Category: {product.categoryId.name}</p>
                    )}
                    {product.restaurantId && (
                      <p className="restaurant">Restaurant: {product.restaurantId.name}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedProduct && (
          <div className="feedback-form">
            <h2>Rate & Review</h2>
            <div className="selected-product">
              <img
                src={selectedProduct.image || momo}
                alt={selectedProduct.name}
                className="selected-product-image"
                onError={(e) => {
                  console.log('Selected product image failed to load, using fallback');
                  e.target.src = momo;
                }}
              />
              <div>
                <h3>{selectedProduct.name}</h3>
                <p>{selectedProduct.description}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rating-section">
                <label>Rating:</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star ${star <= rating ? 'filled' : ''}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <span className="rating-text">{rating} out of 5</span>
              </div>

              <div className="comment-section">
                <label htmlFor="comment">Your Review:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows="4"
                  required
                />
              </div>

              {message && (
                <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiveFeedbacks; 