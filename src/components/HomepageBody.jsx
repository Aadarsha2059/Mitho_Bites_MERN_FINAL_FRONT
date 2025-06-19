import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import heroImage from '../assets/images/hero.png';
import newAdminFood from '../assets/admin/newadminfood.png';

import './HomepageBody.css';

const images = [
  {
    src: heroImage,
    text: 'Delight in every bite – Authentic Nepali flavors delivered to your doorstep.',
  },
  {
    src: newAdminFood,
    text: 'Quality foods give quality life.',
  },
];

export default function HomepageBody() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-body-section"
      style={{
        backgroundImage: `url(${images[currentIndex].src})`,
      }}
    >
      <div className="hero-body-overlay">
        <div className="hero-body-content">
          <h1>Welcome to Mitho Bites</h1>
          <p className="animated-text">{images[currentIndex].text}</p>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Explore best restaurants & cafes..."
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}
