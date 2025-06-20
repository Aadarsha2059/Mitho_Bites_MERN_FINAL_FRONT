import React from "react";
import { FaLeaf, FaGlobeAsia, FaSmile } from "react-icons/fa";
import './GKFood.css';

const facts = [
  {
    icon: <FaLeaf />,
    title: "Nepal: Land of Spices",
    desc: "Nepal is home to over 30 types of indigenous spices, making its cuisine uniquely flavorful.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "World's Most Eaten Food",
    desc: "Rice is the most widely consumed staple food in the world, especially in Asia.",
  },
  {
    icon: <FaSmile />,
    title: "Sel Roti's Secret",
    desc: "Sel Roti is made with rice flour and is a must-have during Nepali festivals like Tihar and Dashain.",
  },
];

const GKFood = () => (
  <section className="section">
    <h2 className="section-title glow-text">Food & Cuisines: Fun Facts</h2>
    <div className="gk-facts-row">
      {facts.map((f, i) => (
        <div className="gk-fact-card" key={i}>
          <span className="gk-fact-icon">{f.icon}</span>
          <h3 className="gk-fact-title">{f.title}</h3>
          <p className="gk-fact-desc">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default GKFood; 