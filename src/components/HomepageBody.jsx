import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import './HomepageBody.css';
import FoodCard from './FoodCard';

// Local images for hero
import heroImage from '../assets/images/hero.png';
import momo from '../assets/images/momo.png';
import selRoti from '../assets/images/sel_roti.png';
import yomari from '../assets/images/yomari.png';
import bajekosekuwa from '../assets/bajekosekuwa.png';
import featured1 from '../assets/images/featured/featured1.png';
import featured2 from '../assets/images/featured/featured2.png';
import featured3 from '../assets/images/featured/featured3.png';
import testimonial1 from '../assets/aadarshaaaaaaaa.png';
import testimonial2 from '../assets/images/customers/customer1.png';
import testimonial3 from '../assets/images/customers/customer2.png';
import testimonial4 from '../assets/admin.png';
import customer1 from '../assets/images/customers/customer1.png';
import customer2 from '../assets/images/customers/customer2.png';

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
    badge: 'Best in the Town',
  },
  {
    title: 'Sel Roti',
    image: selRoti,
    price: 60,
  },
  {
    title: 'Yomari',
    image: yomari,
    price: 120,
  },
  {
    title: 'Chef\'s Special',
    image: featured1,
    price: 350,
  },
  {
    title: 'Spicy Treat',
    image: featured2,
    price: 220,
  },
  {
    title: 'Sweet Delight',
    image: featured3,
    price: 150,
  },
];

const foodCategories = [
  {
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', // Fresh vegetables
  },
  {
    name: 'Nepali',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80', // Chicken roast
  },
];

const testimonials = [
  {
    name: 'Aadarsha Babu',
    image: testimonial1,
    text: 'Mitho Bites brings authentic Nepali taste to my home. The service is fast and the food is always fresh!',
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

// Add a new section for categories and restaurants hint
const exploreCategories = [
  {
    name: 'Nepali',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    description: 'Authentic Nepali cuisine, momo, sel roti, yomari, and more.'
  },
  {
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    description: 'Spicy Indian curries, tandoori, and classic flavors.'
  },
  {
    name: 'Restaurants',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    description: 'Top-rated restaurants and party places in your city.'
  },
  {
    name: 'Party Palaces',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    description: 'Book party palaces for your special events and celebrations.'
  },
];

export default function HomepageBody() {
  const [currentHero, setCurrentHero] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [search, setSearch] = useState('');
  const [heroTextClass, setHeroTextClass] = useState('animated-text fade-in-up');

  // Hero carousel auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleHeroNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentHero]);

  // Testimonial slider auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const handleHeroChange = (newIndex) => {
    setHeroTextClass('animated-text fade-out-down');
    setTimeout(() => {
      setCurrentHero(newIndex);
      setHeroTextClass('animated-text fade-in-up');
    }, 500);
  };

  const handleHeroNext = () => {
    const newIndex = (currentHero + 1) % heroSlides.length;
    handleHeroChange(newIndex);
  };

  const handleHeroPrev = () => {
    const newIndex = (currentHero - 1 + heroSlides.length) % heroSlides.length;
    handleHeroChange(newIndex);
  };

  return (
    <div className="homepage-animated-bg">
      {/* Hero Section */}
      <section
        className="hero-body-section advanced-hero"
        style={{ backgroundImage: `url(${heroSlides[currentHero].src})` }}
      >
        <div className="hero-body-overlay">
          <div className="hero-body-content">
            <h1 className="fade-in-down">Welcome to Mitho Bites</h1>
            <p className={heroTextClass}>{heroSlides[currentHero].text}</p>
            <div className="search-bar-container animated-search">
              <input
                type="text"
                className="search-bar"
                placeholder="Explore best restaurants & cafes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>
        <div className="hero-carousel-controls">
          <button
            className="carousel-btn"
            onClick={handleHeroPrev}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          <button
            className="carousel-btn"
            onClick={handleHeroNext}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Restaurant & Party Palace Section */}
      <section className="restaurant-party-section">
        <h2 className="section-title">Restaurants & Party Palaces</h2>
        <p className="section-subtitle">Discover top-rated restaurants and book amazing party venues</p>
        <div className="restaurant-party-cards">
          <div className="restaurant-party-card">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" alt="Restaurants" className="restaurant-party-img" />
            <div className="restaurant-party-content">
              <h3>Restaurants</h3>
              <p>Explore the best restaurants in your city with diverse cuisines and amazing reviews.</p>
            </div>
          </div>
          <div className="restaurant-party-card">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80" alt="Party Places" className="restaurant-party-img" />
            <div className="restaurant-party-content">
              <h3>Party Palaces</h3>
              <p>Book beautiful party palaces for your special events and celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Food Categories</h2>
        <p className="section-subtitle">Explore our diverse food categories</p>
        <div className="categories-cards">
          {foodCategories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <img src={cat.image} alt={cat.name + ' food'} className="category-img" />
              <div className="category-content">
                <h3>{cat.name}</h3>
                <p>Delicious {cat.name.toLowerCase()} cuisine with authentic flavors.</p>
              </div>
            </div>
          ))}
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
