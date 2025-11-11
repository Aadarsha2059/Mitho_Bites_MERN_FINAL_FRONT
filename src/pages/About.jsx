import React from 'react';
import { FaArrowLeft, FaHeart, FaUsers, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="modern-about-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <button className="about-back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back
        </button>
        
        <div className="about-hero-content">
          <h1 className="about-hero-title">About BhokBhoj</h1>
          <p className="about-hero-subtitle">
            Kathmandu's Most Trusted Food Delivery Platform
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" 
                alt="Delicious Food" 
              />
            </div>
            <div className="about-story-content">
              <h2>Our Story</h2>
              <p>
                Founded in the heart of Kathmandu, <strong>BhokBhoj</strong> was born from a simple idea: 
                everyone deserves access to delicious, authentic food delivered fast and fresh.
              </p>
              <p>
                We started with a handful of local restaurants and a passion for connecting food lovers 
                with the best culinary experiences in the valley. Today, we're proud to partner with over 
                500 restaurants, serving 50,000+ happy customers across Kathmandu.
              </p>
              <p>
                From traditional Nepali delicacies to international cuisines, we bring the entire food 
                scene of Kathmandu to your doorstep in just 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="section-title-center">Our Values</h2>
          <p className="section-subtitle-center">
            The principles that guide everything we do
          </p>

          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Customer First</h3>
              <p>
                Your satisfaction is our top priority. We go above and beyond to ensure 
                every order exceeds your expectations.
              </p>
            </div>

            <div className="about-value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Quality Assured</h3>
              <p>
                We partner only with verified restaurants that meet our strict standards 
                for food quality, hygiene, and service.
              </p>
            </div>

            <div className="about-value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Community Driven</h3>
              <p>
                We support local restaurants and create opportunities for delivery partners, 
                strengthening our community together.
              </p>
            </div>

            <div className="about-value-card">
              <div className="value-icon">
                <FaLeaf />
              </div>
              <h3>Sustainable</h3>
              <p>
                We're committed to eco-friendly practices, from packaging to delivery, 
                reducing our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Partner Restaurants</div>
            </div>
            <div className="about-stat-card">
              <div className="stat-number">50k+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="about-stat-card">
              <div className="stat-number">30min</div>
              <div className="stat-label">Average Delivery</div>
            </div>
            <div className="about-stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-content">
            <h2>Our Mission</h2>
            <p className="mission-text">
              To revolutionize food delivery in Kathmandu by connecting people with the best 
              restaurants, supporting local businesses, and delivering exceptional experiences 
              with every order. We believe great food should be accessible to everyone, anytime, 
              anywhere in the valley.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-content">
            <h2>Ready to Order?</h2>
            <p>Join thousands of food lovers who trust BhokBhoj for their daily meals</p>
            <button className="about-cta-button" onClick={() => navigate('/menu')}>
              Browse Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
