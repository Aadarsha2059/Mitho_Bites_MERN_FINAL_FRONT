import React from 'react';
import {
  FaUtensils,
  FaMapMarkerAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaUserTie,
  FaArrowLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './About.css';
import background from '../assets/images/softwarica.png';

export default function About() {
  const navigate = useNavigate();
  return (
    <div
      className="about-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <button
        className="about-back-btn"
        onClick={() => navigate('/homepage')}
        aria-label="Back to homepage"
      >
        <FaArrowLeft className="about-back-icon" />
        <span className="about-back-text">Back</span>
      </button>
      <div className="about-box">
        <h1 className="about-title">🍽️ About Mitho_Bites</h1>

        <p className="about-description">
          <FaUtensils className="icon" />
          <strong>Mitho_Bites</strong> is a modern and user-friendly eFood web platform tailored specifically for the vibrant culinary culture of <span className="highlight">Kathmandu, Nepal</span>. Whether you're a food lover looking to taste traditional dishes or a restaurant seeking to connect with local customers, Mitho_Bites serves as the ultimate digital solution.
        </p>

        <div className="about-grid">
          <div className="info-card">
            <h2 className="info-title"><FaMapMarkerAlt className="icon" /> Focused Location</h2>
            <p>
              Currently serving the bustling heart of <strong>Kathmandu</strong>, Mitho_Bites bridges the gap between local food providers and foodies through an accessible and elegant online experience.
            </p>
          </div>

          <div className="info-card">
            <h2 className="info-title"><FaLaptopCode className="icon" /> Technology Stack (MERN)</h2>
            <ul className="tech-list">
              <li><FaReact className="icon react" /> Frontend: React.js</li>
              <li><FaNodeJs className="icon node" /> Backend: Node.js + Express</li>
              <li><FaDatabase className="icon db" /> Database: MongoDB</li>
            </ul>
          </div>

          <div className="info-card">
            <h2 className="info-title"><FaUserTie className="icon" /> Project Supervision</h2>
            <p>
              This project was designed and implemented by <strong>Aadarsha Babu Dhakal</strong> under the valuable guidance of our module teacher, <strong>Albert Maharjan</strong>, as a part of the 5th semester <strong>Web API Development</strong> module.
            </p>
          </div>

          <div className="info-card">
            <h2 className="info-title">🎓 Academic Context</h2>
            <p>
              This project is a part of the academic assignment for <strong>BSc (Hons) Computing</strong> at <strong>Softwarica College of IT & E-commerce</strong>. The objective is to apply practical knowledge in building full-stack applications using modern web technologies.
            </p>
          </div>
        </div>

        <div className="about-footer">
          <p className="about-quote">"Bringing Kathmandu's flavor to your fingertips – one bite at a time."</p>
        </div>
      </div>
    </div>
  );
}
