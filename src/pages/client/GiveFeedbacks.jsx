import React, { useState } from 'react';
import './GiveFeedbacks.css';
import { FaStar } from 'react-icons/fa';
import { getBackendImageUrl } from '../../utils/backend-image';
import axiosInstance from '../../api/api';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GiveFeedbacks = () => {
  const location = useLocation();
  const items = location.state?.items || [];
  const [feedbacks, setFeedbacks] = useState(
    items.map(item => ({
      productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
      orderId: item.orderId,
      rating: 0,
      text: '',
      submitting: false,
      success: false,
      error: ''
    }))
  );

  const handleStarClick = (idx, rating) => {
    setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, rating } : fb));
  };

  const handleTextChange = (idx, text) => {
    setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, text } : fb));
  };

  const handleSubmit = async (idx, e) => {
    e.preventDefault();
    const fb = feedbacks[idx];
    // Validation: rating must be 1-5
    if (!fb.rating || fb.rating < 1 || fb.rating > 5) {
      setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, error: 'Please select a star rating.' } : fb));
      return;
    }
    setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, submitting: true, error: '', success: false } : fb));
    try {
      await axiosInstance.post('/feedbacks', {
        order: fb.orderId,
        product: fb.productId,
        rating: fb.rating,
        text: fb.text
      });
      setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, submitting: false, success: true } : fb));
      toast.success('Feedback submitted successfully!');
    } catch (err) {
      setFeedbacks(fbs => fbs.map((fb, i) => i === idx ? { ...fb, submitting: false, error: 'Failed to submit feedback.' } : fb));
    }
  };

  return (
    <form className="give-feedbacks-form" onSubmit={e => e.preventDefault()}>
      <h2>Give Feedback for Your Received Items</h2>
      <div className="feedback-items-grid">
        {items.map((item, idx) => {
          const productId = typeof item.productId === 'object' ? item.productId._id : item.productId;
          const productObj = typeof item.productId === 'object' ? item.productId : {};
          return (
            <div className="feedback-item" key={`${item.orderId}-${productId}`}>
              <div className="feedback-item-header">
                <img
                  src={getBackendImageUrl(productObj.filepath)}
                  alt={productObj.name}
                  className="feedback-product-image"
                />
                <div>
                  <div className="feedback-item-title">{productObj.name}</div>
                  <div className="feedback-item-desc">{productObj.description}</div>
                </div>
              </div>
              <div className="star-rating">
                {[1,2,3,4,5].map(star => (
                  <FaStar
                    key={star}
                    className={feedbacks[idx].rating >= star ? 'star selected' : 'star'}
                    onClick={() => handleStarClick(idx, star)}
                  />
                ))}
              </div>
              <textarea
                className="feedback-text"
                placeholder="Write your feedback..."
                value={feedbacks[idx].text}
                onChange={e => handleTextChange(idx, e.target.value)}
              />
              {feedbacks[idx].success && <div className="feedback-success">Thank you for your feedback!</div>}
              {feedbacks[idx].error && <div className="feedback-error">{feedbacks[idx].error}</div>}
              <button
                className="submit-feedback-btn"
                type="button"
                disabled={feedbacks[idx].submitting}
                onClick={e => handleSubmit(idx, e)}
              >
                {feedbacks[idx].submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default GiveFeedbacks; 