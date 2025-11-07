import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import momo from '../assets/images/momo.png';
import './HomepageBody.css';

const HomepageBody = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5050/api/categories');
      const data = await response.json();
      
      if (data.success) {
        console.log('Fetched categories for homepage:', data.data);
        setCategories(data.data);
      } else {
        console.error('Failed to fetch categories:', data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="homepage-body">
        <div className="loading-container">
          <div className="loader">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-body">
      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Food Categories</h2>
            <p>Discover a variety of delicious cuisines</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => {
              console.log('Rendering category:', category);
              console.log('Category image field:', category.image);
              
              return (
                <Link 
                  to={`/dashboard?category=${category._id}`} 
                  key={category._id}
                  className="category-card"
                >
                  <div className="category-image">
                    <img
                      src={category.image || momo}
                      alt={category.name}
                      onError={(e) => {
                        console.log('Category image failed to load, using fallback');
                        e.target.src = momo;
                      }}
                    />
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="explore-btn">
                      Explore <FaArrowRight />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose BhokBhoj?</h2>
            <p>We provide the best food delivery experience</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered within 30 minutes</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Fresh Food</h3>
              <p>All our food is prepared fresh daily</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive prices for quality food</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Top Rated</h3>
              <p>Highly rated by our customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Order?</h2>
            <p>Join thousands of satisfied customers</p>
            <Link to="/dashboard" className="cta-btn">
              Start Ordering Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomepageBody; 
