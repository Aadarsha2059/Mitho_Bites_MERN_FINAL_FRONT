import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import './HomepageBody.css';
import FoodCard from './FoodCard';

// Local images for hero
import heroImage from '../assets/images/hero.png';
import momo from '../assets/images/momo.png';
import selRoti from '../assets/images/sel_roti.png';
import yomari from '../assets/images/yomari.png';
import dalBhat from '../assets/images/dal_bhat.png';
import chatamari from '../assets/images/chatamari.png';
import gundruk from '../assets/images/gundruk.png';
import bajekosekuwa from '../assets/bajekosekuwa.png';
import testimonial1 from '../assets/aadarshaaaaaaaa.png';
import testimonial2 from '../assets/images/customers/customer1.png';
import testimonial3 from '../assets/images/customers/customer2.png';
import testimonial4 from '../assets/admin.png';
import customer1 from '../assets/images/customers/customer1.png';
import customer2 from '../assets/images/customers/customer2.png';
import rooftoppnepal from '../assets/restaurant/rooftoppnepal.png';
import nezzeRestro from '../assets/restaurant/nezze restro nepal.png';
import saloneDeCafe from '../assets/restaurant/salone de cafe.png';
import bestParty from '../assets/party_palace/bestparty.png';
import taaj from '../assets/party_palace/taaj.png';
import smart from '../assets/party_palace/smart.png';

const heroSlides = [
  {
    src: heroImage,
    text: 'Delight in every bite – Authentic Nepali flavors delivered to your doorstep.',
  },
  {
    src: momo,
    text: 'Best in the Town: Legendary Nepali Momo, juicy and unforgettable.',
  },
  {
    src: selRoti,
    text: 'Sel Roti: The perfect blend of tradition and taste.',
  },
  {
    src: yomari,
    text: 'Yomari: Sweet, steamed, and stuffed with love.',
  },
  {
    src: bajekosekuwa,
    text: 'Bajeko Sekuwa: Grilled to perfection, a true Nepali classic.',
  },
];

const featuredDishes = [
  {
    title: 'Classic Nepali Momo',
    image: momo,
    price: 180,
    badge: 'Most Popular',
  },
  {
    title: 'Traditional Sel Roti',
    image: selRoti,
    price: 60,
  },
  {
    title: 'Sweet Yomari',
    image: yomari,
    price: 120,
  },
  {
    title: 'Dal Bhat Power',
    image: dalBhat,
    price: 250,
  },
  {
    title: 'Newari Chatamari',
    image: chatamari,
    price: 200,
  },
  {
    title: 'Gundruk Soup',
    image: gundruk,
    price: 150,
  },
];

const foodCategories = [
  {
    name: 'Nepali Cuisine',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
    description: 'Authentic traditional dishes'
  },
  {
    name: 'Indian Delights',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    description: 'Spicy and flavorful curries'
  },
  {
    name: 'Chinese Fusion',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
    description: 'Noodles, fried rice & more'
  },
  {
    name: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=400&q=80',
    description: 'Burgers, pizza & sandwiches'
  },
];

const testimonials = [
  {
    name: 'Aadarsha Babu',
    image: testimonial1,
    text: 'BhokBhoj brings authentic Nepali taste to my home. The service is fast and the food is always fresh!',
    rating: 5,
  },
  {
    name: 'Suraj Tamang',
    image: testimonial2,
    text: 'Absolutely love the momo and sel roti! Highly recommended for foodies.',
    rating: 5,
  },
  {
    name: 'Rahul Khatri',
    image: testimonial3,
    text: 'The best food delivery experience I have had in Kathmandu. Great variety and quality.',
    rating: 4,
  },
  {
    name: 'Chirayu Baij',
    image: testimonial4,
    text: 'Delicious food, beautiful presentation, and timely delivery. Will order again!',
    rating: 5,
  },
];

export default function HomepageBody() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [search, setSearch] = useState('');

  // Testimonial slider auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  return (
    <div className="homepage-animated-bg">
      {/* Hero Section - Split Layout */}
      <section className="hero-body-section split-hero">
        <div className="hero-left-content">
          <h1 className="fade-in-down">Welcome to BhokBhoj</h1>
          <h2 className="hero-tagline fade-in-up">Kathmandu's Premier Food Delivery Platform</h2>
          
          <div className="hero-description fade-in">
            <p className="desc-main">
              <strong>BhokBhoj</strong> connects you with the finest restaurants, cafes, and party palaces across Kathmandu Valley. 
              Experience authentic Nepali cuisine and international flavors delivered fresh to your doorstep.
            </p>
            
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">🍽️</span>
                <span className="feature-text">500+ Restaurants</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span className="feature-text">Fast Delivery</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎉</span>
                <span className="feature-text">Party Catering</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💯</span>
                <span className="feature-text">Quality Assured</span>
              </div>
            </div>

            <p className="desc-secondary">
              From traditional momo and sel roti to gourmet international dishes, BhokBhoj brings Kathmandu's 
              diverse culinary scene right to your home. Order now and taste the difference!
            </p>
          </div>

          <div className="search-bar-container animated-search">
            <input
              type="text"
              className="search-bar"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="hero-right-image" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="image-overlay"></div>
        </div>
      </section>

      {/* Most Popular Section */}
      <section className="featured-section">
        <h2 className="section-title fade-in-up">Customer Favorite</h2>
        <p className="section-subtitle">The dish everyone in Kathmandu is ordering</p>
        <div className="featured-cards">
          <div className="featured-card-anim" style={{ animationDelay: `0s` }}>
            <FoodCard title={featuredDishes[0].title} image={featuredDishes[0].image} price={featuredDishes[0].price} />
            <span className="best-badge">{featuredDishes[0].badge}</span>
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="featured-section">
        <h2 className="section-title fade-in-up">Explore Food Categories</h2>
        <p className="section-subtitle">Discover diverse cuisines from across Kathmandu Valley</p>
        <div className="category-grid">
          {foodCategories.map((cat, idx) => (
            <div className="category-card-modern" key={cat.name + idx} style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="category-img-wrap" style={{ backgroundImage: `url(${cat.image})` }}>
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Restaurants and Party Palaces Section */}
      <section className="featured-section">
        <h2 className="section-title fade-in-up">Top Restaurants & Party Venues</h2>
        <p className="section-subtitle">Premium dining and celebration destinations in Kathmandu</p>
        <div className="explore-grid">
          {/* Restaurants */}
          <div className="explore-card">
            <img src={rooftoppnepal} alt="Rooftop Nepal" className="explore-img" />
            <div className="explore-label">Rooftop Nepal</div>
          </div>
          <div className="explore-card">
            <img src={nezzeRestro} alt="Nezze Restro Nepal" className="explore-img" />
            <div className="explore-label">Nezze Restro Nepal</div>
          </div>
          <div className="explore-card">
            <img src={saloneDeCafe} alt="Salone De Cafe" className="explore-img" />
            <div className="explore-label">Salone De Cafe</div>
          </div>
          {/* Party Palaces */}
          <div className="explore-card">
            <img src={bestParty} alt="Best Party Palace" className="explore-img" />
            <div className="explore-label">Best Party Palace</div>
          </div>
          <div className="explore-card">
            <img src={taaj} alt="Taaj Party Palace" className="explore-img" />
            <div className="explore-label">Taaj Party Palace</div>
          </div>
          <div className="explore-card">
            <img src={smart} alt="Smart Party Palace" className="explore-img" />
            <div className="explore-label">Smart Party Palace</div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section - More Attractive Cards */}
      <section className="featured-section">
        <h2 className="section-title fade-in-up">Authentic Nepali Specialties</h2>
        <p className="section-subtitle">Traditional flavors that define Kathmandu's food culture</p>
        <div className="featured-cards attractive-food-cards">
          {featuredDishes.slice(1).map((dish, idx) => (
            <div className="featured-card-anim food-card-modern" key={dish.title + idx} style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="food-card-img-wrap">
                <img src={dish.image} alt={dish.title} className="food-card-img" />
                <span className="food-card-price">Rs. {dish.price}</span>
              </div>
              <div className="food-card-title">{dish.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About BhokBhoj Section */}
      <section className="about-bhokbhoj-section">
        <div className="about-container">
          <h2 className="section-title fade-in-up">Why Choose BhokBhoj?</h2>
          <p className="section-subtitle">Your trusted food delivery partner in Kathmandu</p>
          
          <div className="about-intro">
            <p className="about-intro-text">
              At <strong>BhokBhoj</strong>, we're revolutionizing food delivery in Kathmandu Valley. 
              Whether you're craving authentic Nepali momo, spicy Indian curry, or international cuisine, 
              we bring the best restaurants right to your doorstep. With our commitment to quality, speed, 
              and customer satisfaction, we've become the go-to platform for food lovers across the city.
            </p>
          </div>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80" 
                  alt="Fast Delivery" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">🚀</div>
              <h3>Lightning Fast Delivery</h3>
              <p>Experience the fastest food delivery in Kathmandu! Our efficient delivery network ensures your food arrives hot and fresh within 30-45 minutes. We use real-time GPS tracking so you know exactly when your meal will arrive. Rain or shine, we're committed to getting your food to you on time.</p>
            </div>
            
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" 
                  alt="Premium Quality" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">🏆</div>
              <h3>Premium Quality Assured</h3>
              <p>Quality is our top priority. We partner exclusively with verified restaurants that meet our strict hygiene and food safety standards. Every restaurant undergoes thorough inspection and regular quality checks. From preparation to packaging, we ensure every meal meets the highest standards of excellence.</p>
            </div>
            
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80" 
                  alt="Best Prices" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">💰</div>
              <h3>Best Prices Guaranteed</h3>
              <p>Enjoy delicious food without breaking the bank! We offer competitive pricing with regular discounts, seasonal offers, and loyalty rewards. No hidden charges or surprise fees - what you see is what you pay. Plus, get exclusive deals and cashback offers on your favorite restaurants.</p>
            </div>
            
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" 
                  alt="Wide Selection" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">🎯</div>
              <h3>Endless Food Choices</h3>
              <p>Explore over 500+ restaurants and thousands of dishes! From traditional Nepali delicacies like momo and dal bhat to international cuisines including Chinese, Indian, Continental, and more. Whether you're vegetarian, vegan, or have specific dietary needs, we have something for everyone.</p>
            </div>
            
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80" 
                  alt="Easy Ordering" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">📱</div>
              <h3>Seamless Ordering Experience</h3>
              <p>Order food in seconds with our user-friendly platform! Browse menus, customize your order, and checkout in just a few clicks. Track your delivery in real-time with live updates. Save your favorite restaurants and reorder with one tap. Multiple payment options including cash, card, and digital wallets.</p>
            </div>
            
            <div className="about-card">
              <div className="about-card-image">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80" 
                  alt="Party Catering" 
                  className="about-img"
                />
              </div>
              <div className="about-icon">🎉</div>
              <h3>Event & Party Catering</h3>
              <p>Planning a celebration? We've got you covered! Connect with Kathmandu's best party palaces and catering services for birthdays, weddings, corporate events, and more. From intimate gatherings to grand celebrations, we help you find the perfect venue and menu to make your event unforgettable.</p>
            </div>
          </div>
          
          <div className="about-cta">
            <p className="about-cta-text">
              Join thousands of satisfied customers who trust BhokBhoj for their daily meals. 
              Download our app or order online now and experience the difference!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title fade-in-up">What Our Customers Say</h2>
        <div className="testimonial-slider">
          <div 
            className="testimonial-track"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)`}}
          >
            {testimonials.map((testimonial) => (
              <div className="testimonial-slide" key={testimonial.name}>
                <div className="testimonial-card">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
                  <div className="testimonial-content">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                    <p className="testimonial-name">- {testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-carousel-controls">
            <button
              className="carousel-btn"
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            <button
              className="carousel-btn"
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

