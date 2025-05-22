import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Mitho Bites</h1>
            <p>Delight in every bite – Authentic Nepali flavors delivered to your doorstep.</p>
            <button className="order-button">Order Now</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
