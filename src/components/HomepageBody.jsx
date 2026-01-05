import React, { useEffect, useState } from 'react';
import { FaSearch, FaStar, FaArrowRight, FaCheckCircle, FaClock, FaShieldAlt, FaUtensils } from 'react-icons/fa';
import './HomepageBody.css';

// Local images
import heroImage from '../assets/images/hero.png';
import momo from '../assets/images/momo.png';
import selRoti from '../assets/images/sel_roti.png';
import yomari from '../assets/images/yomari.png';
import dalBhat from '../assets/images/dal_bhat.png';
import testimonial1 from '../assets/aadarshaaaaaaaa.png';
import testimonial2 from '../assets/images/customers/customer1.png';
import testimonial3 from '../assets/images/customers/customer2.png';
import testimonial4 from '../assets/admin.png';

const featuredDishes = [
  { title: 'Classic Nepali Momo', image: momo, price: 180, rating: 4.8, orders: '2.5k+' },
  { title: 'Sel Roti', image: selRoti, price: 60, rating: 4.6, orders: '1.8k+' },
  { title: 'Yomari', image: yomari, price: 120, rating: 4.7, orders: '1.2k+' },
  { title: 'Dal Bhat Set', image: dalBhat, price: 250, rating: 4.9, orders: '3.1k+' },
];

// Fallback testimonials if API fails
const fallbackTestimonials = [
  {
    name: 'Chirayu Baij',
    image: testimonial4,
    text: 'Delicious food, beautiful presentation, and timely delivery. Will order again! The quality is amazing and the service is top-notch.',
    rating: 5,
  },
  {
    name: 'Suraj Tamang',
    image: testimonial2,
    text: 'Absolutely love the momo and sel roti! Highly recommended for foodies. The authentic Nepali taste reminds me of home.',
    rating: 5,
  },
  {
    name: 'Bishnu Budhathoki',
    image: testimonial1,
    text: 'BhokBhoj brings authentic Nepali taste to my home. The service is fast and the food is always fresh! Best food delivery in Kathmandu.',
    rating: 5,
  },
  {
    name: 'Chirayu Baij',
    image: testimonial4,
    text: 'The Thakali set was incredible! Perfectly spiced and authentic. The delivery was quick and the packaging was excellent. Highly satisfied!',
    rating: 5,
  },
  {
    name: 'Suraj Tamang',
    image: testimonial2,
    text: 'Ordered chicken momo and it exceeded my expectations. Juicy, flavorful, and the achar was perfect. Will definitely order more!',
    rating: 5,
  },
  {
    name: 'Bishnu Budhathoki',
    image: testimonial1,
    text: 'Great variety of Nepali and Indian dishes. The prices are reasonable and the food quality is outstanding. My go-to food delivery app now!',
    rating: 5,
  },
];

export default function HomepageBody() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [search, setSearch] = useState('');
  // ✅ Initialize with static testimonials immediately
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false); // Start as false since we have static data
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  console.log('HomepageBody rendered with testimonials:', testimonials.length, testimonials);

  // ✅ Fetch real feedbacks from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const response = await fetch(`${apiUrl}/api/feedbacks`);
        const data = await response.json();
        
        console.log('Feedbacks API response:', data);
        
        if (data.success && data.data && data.data.length > 0) {
          // Transform feedbacks to testimonials format with validation
          const transformedFeedbacks = data.data.slice(0, 8)
            .map((feedback, index) => {
              // Get user name - prioritize fullname, then username, then name, then email prefix
              const userName = feedback.userId?.fullname || 
                             feedback.userId?.username || 
                             feedback.userId?.name || 
                             (feedback.userId?.email ? feedback.userId.email.split('@')[0] : null);
              
              // ✅ STRICT VALIDATION: Skip if name is missing, "Customer", or too short
              if (!userName || userName === 'Customer' || userName.trim().length < 2) {
                console.log('❌ Skipping feedback with invalid name:', userName);
                return null;
              }
              
              // ✅ STRICT VALIDATION: Skip if comment is missing, too short, or just "best"
              const comment = feedback.comment?.trim() || '';
              if (!comment || comment.length < 5 || comment.toLowerCase() === 'best' || comment.toLowerCase() === 'good' || comment.toLowerCase() === 'nice') {
                console.log('❌ Skipping feedback with invalid/short comment:', comment);
                return null;
              }
              
              const userImage = feedback.userId?.image || 
                              [testimonial4, testimonial2, testimonial1][index % 3];
              
              console.log('Valid feedback found:', {
                name: userName,
                comment: comment,
                rating: feedback.rating
              });
              
              return {
                name: userName,
                image: userImage,
                text: comment,
                rating: feedback.rating || 5,
                productName: feedback.productId?.name || '',
              };
            })
            .filter(feedback => feedback !== null); // Remove invalid entries
          
          // ✅ Only replace static feedbacks if we have at least 3 valid real feedbacks with proper names and comments
          const validFeedbacks = transformedFeedbacks.filter(fb => 
            fb && 
            fb.name && 
            fb.name !== 'Customer' && 
            fb.name.trim().length >= 2 &&
            fb.text && 
            fb.text.trim().length >= 10 &&
            fb.text.toLowerCase() !== 'best'
          );
          
          if (validFeedbacks.length >= 3) {
            console.log('✅ Replacing static feedbacks with', validFeedbacks.length, 'valid real feedbacks');
            setTestimonials(validFeedbacks);
          } else {
            console.log('⚠️ Not enough valid feedbacks found (' + validFeedbacks.length + '), keeping static testimonials');
            console.log('📋 Static testimonials:', fallbackTestimonials.map(t => t.name));
            setTestimonials(fallbackTestimonials);
          }
        } else {
          // Keep fallback testimonials if no real feedbacks
          console.log('No real feedbacks found, using static testimonials');
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        // Keep fallback testimonials on error
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    // Start with static testimonials immediately
    setTestimonials(fallbackTestimonials);
    
    // Then try to fetch real feedbacks
    // Start with static testimonials immediately (don't wait for API)
    setTestimonials(fallbackTestimonials);
    setLoadingFeedbacks(false);
    
    // Then try to fetch real feedbacks in background
    fetchFeedbacks();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Swipe handlers for left to right swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && testimonials.length > 0) {
      // Swipe left - go to next (right direction)
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
    if (isRightSwipe && testimonials.length > 0) {
      // Swipe right - go to previous (left direction)
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <div className="bhokbhoj-homepage">
      {/* Hero Section - Modern Design */}
      <section className="modern-hero">
        <div className="hero-content-wrapper">
          <div className="hero-text-section">
            <div className="hero-badge">🍽️ Kathmandu's #1 Food Delivery</div>
            <h1 className="hero-main-title">
              Delicious Food<br />
              <span className="highlight-text">Delivered Fast</span>
            </h1>
            <p className="hero-description">
              Order from 10+ restaurants across Kathmandu Valley. 
              Fresh, hot, and delivered to your doorstep in 30 minutes.
            </p>
            
            <div className="hero-search-box">
              <FaSearch className="search-icon-hero" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hero-search-input"
              />
              <button className="hero-search-btn">Search</button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Restaurants</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">30min</div>
                <div className="stat-label">Avg Delivery</div>
              </div>
            </div>
          </div>

          <div className="hero-image-section">
            <div className="hero-image-wrapper">
              <img src={heroImage} alt="Delicious Food" className="hero-main-image" />
              <div className="floating-card card-1">
                <FaCheckCircle className="card-icon" />
                <span>Quality Assured</span>
              </div>
              <div className="floating-card card-2">
                <FaClock className="card-icon" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Compact */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <div className="feature-icon-box">
              <FaClock />
            </div>
            <h3>30-Min Delivery</h3>
            <p>Lightning fast service</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-box">
              <FaShieldAlt />
            </div>
            <h3>Quality Food</h3>
            <p>Verified restaurants</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-box">
              <FaUtensils />
            </div>
            <h3>10+ Options</h3>
            <p>Endless variety</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon-box">
              <FaStar />
            </div>
            <h3>Top Rated</h3>
            <p>4.8★ average rating</p>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="popular-dishes-section">
        <div className="section-header-modern">
          <h2>Popular Dishes</h2>
          <p>Most ordered items this week</p>
        </div>

        <div className="dishes-grid">
          {featuredDishes.map((dish, idx) => (
            <div className="dish-card-modern" key={idx}>
              <div className="dish-image-wrapper">
                <img src={dish.image} alt={dish.title} />
                <div className="dish-badge">
                  <FaStar /> {dish.rating}
                </div>
              </div>
              <div className="dish-info">
                <h3>{dish.title}</h3>
                <div className="dish-meta">
                  <span className="dish-orders">{dish.orders} orders</span>
                </div>
                <div className="dish-footer">
                  <span className="dish-price">Rs. {dish.price}</span>
                  <button className="add-btn">Add +</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header-modern">
          <h2>How It Works</h2>
          <p>Order food in 3 simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3>Choose Your Food</h3>
            <p>Browse from 10+ restaurants and hundreds of dishes</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🛒</div>
            <h3>Place Your Order</h3>
            <p>Add to cart and checkout with secure payment</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">🚀</div>
            <h3>Get It Delivered</h3>
            <p>Receive hot, fresh food at your doorstep in 30 minutes</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Slider */}
      <section className="testimonials-section-modern">
        <div className="section-header-modern">
          <h2>What Our Customers Say</h2>
          <p>Real reviews from real food lovers</p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div 
            className="testimonials-slider-modern"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="testimonial-track-modern" 
              style={{ 
                transform: `translateX(-${currentTestimonial * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {testimonials.map((testimonial, idx) => {
                console.log('Rendering testimonial slide:', idx, {
                  name: testimonial.name,
                  text: testimonial.text,
                  rating: testimonial.rating,
                  image: testimonial.image
                });
                return (
                  <div className="testimonial-slide-modern" key={idx}>
                    <div className="testimonial-card-modern">
                      <div className="testimonial-rating">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <FaStar key={i} className="star-icon" />
                        ))}
                      </div>
                      <p className="testimonial-text-modern">"{testimonial.text || 'Great food and service!'}"</p>
                      <div className="testimonial-author">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name || 'Customer'} 
                          onError={(e) => {
                            // Fallback to default testimonial images if image fails
                            const fallbackImages = [testimonial4, testimonial2, testimonial1];
                            e.target.src = fallbackImages[idx % 3];
                          }}
                        />
                        <div>
                          <div className="author-name">{testimonial.name || 'Customer'}</div>
                          <div className="author-label">Verified Customer</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Loading testimonials...</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Order?</h2>
          <p>Join 50+ happy customers enjoying delicious food delivered fast</p>
          <button className="cta-button">
            Browse Menu <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
