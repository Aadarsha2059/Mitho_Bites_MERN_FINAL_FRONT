import React, { useState, useEffect } from 'react';
import {
  FaUtensils,
  FaMapMarkerAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaUserTie,
  FaArrowLeft,
  FaGraduationCap,
  FaRocket,
  FaHeart,
  FaStar,
  FaCode
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './About.css';
import background from '../assets/images/softwarica.png';

export default function About() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-page-wrapper">
      {/* Animated Background */}
      <div 
        className="about-background"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="background-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1">🍽️</div>
          <div className="floating-element element-2">💻</div>
          <div className="floating-element element-3">🚀</div>
          <div className="floating-element element-4">⭐</div>
        </div>
      </div>

      {/* Enhanced Back Button */}
      <button
        className="about-back-btn"
        onClick={() => navigate('/homepage')}
        aria-label="Back to homepage"
      >
        <FaArrowLeft className="about-back-icon" />
        <span className="about-back-text">Back to Home</span>
      </button>

      {/* Main Content */}
      <div className="about-main-container">
        <div className={`about-card ${isVisible ? 'fade-in' : ''}`}>
          {/* Header Section */}
          <div className="about-header">
            <div className="about-title-wrapper">
              <FaRocket className="about-title-icon" />
              <h1 className="about-title">About BhokBhoj</h1>
            </div>
            <p className="about-subtitle">Bringing Kathmandu's authentic flavors to your fingertips</p>
          </div>

          {/* Hero Description */}
          <div className="about-hero">
            <div className="hero-content">
              <FaUtensils className="hero-icon" />
              <p className="hero-description">
                <strong>BhokBhoj</strong> is a modern and user-friendly eFood web platform tailored specifically for the vibrant culinary culture of <span className="highlight">Kathmandu, Nepal</span>. Whether you're a food lover looking to taste traditional dishes or a restaurant seeking to connect with local customers, BhokBhoj serves as the ultimate digital solution.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaMapMarkerAlt className="feature-icon location" />
              </div>
              <h3 className="feature-title">Focused Location</h3>
              <p className="feature-description">
                Currently serving the bustling heart of <strong>Kathmandu</strong>, BhokBhoj bridges the gap between local food providers and foodies through an accessible and elegant online experience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaCode className="feature-icon tech" />
              </div>
              <h3 className="feature-title">Technology Stack (MERN)</h3>
              <div className="tech-stack">
                <div className="tech-item">
                  <FaReact className="tech-icon react" />
                  <span>React.js</span>
                </div>
                <div className="tech-item">
                  <FaNodeJs className="tech-icon node" />
                  <span>Node.js + Express</span>
                </div>
                <div className="tech-item">
                  <FaDatabase className="tech-icon db" />
                  <span>MongoDB</span>
                </div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaUserTie className="feature-icon supervision" />
              </div>
              <h3 className="feature-title">Project Supervision</h3>
              <p className="feature-description">
                This project was designed and implemented by <strong>Aadarsha Babu Dhakal</strong> under the valuable guidance of our module teacher, <strong>Albert Maharjan</strong>, as a part of the 5th semester <strong>Web API Development</strong> module.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaGraduationCap className="feature-icon academic" />
              </div>
              <h3 className="feature-title">Academic Context</h3>
              <p className="feature-description">
                This project is a part of the academic assignment for <strong>BSc (Hons) Computing</strong> at <strong>Softwarica College of IT & E-commerce</strong>. The objective is to apply practical knowledge in building full-stack applications using modern web technologies.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="about-stats">
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <div className="stat-content">
                <h3>5th Semester</h3>
                <p>Web API Development</p>
              </div>
            </div>
            <div className="stat-item">
              <FaHeart className="stat-icon" />
              <div className="stat-content">
                <h3>Made with Love</h3>
                <p>For Kathmandu</p>
              </div>
            </div>
            <div className="stat-item">
              <FaRocket className="stat-icon" />
              <div className="stat-content">
                <h3>Modern Tech</h3>
                <p>MERN Stack</p>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="about-footer">
            <div className="footer-quote">
              <FaHeart className="quote-icon" />
              <p>"Bringing Kathmandu's flavor to your fingertips – one bite at a time."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


