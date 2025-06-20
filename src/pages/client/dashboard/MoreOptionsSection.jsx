import React, { useState } from "react";
import { FaCog, FaBookOpen, FaGlobeAsia, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import KhanaKhajan from "../moreoptions/KhanaKhajan";
import GKFood from "../moreoptions/GKFood";
import "../Dashboard.css";

const options = [
  { id: 'settings', label: 'Settings', icon: <FaCog /> },
  { id: 'khana', label: 'Khana Khajan', icon: <FaBookOpen /> },
  { id: 'gk', label: 'GK of Food & Cuisines', icon: <FaGlobeAsia /> },
  { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
];

const MoreOptionsSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  if (open === 'khana') return <KhanaKhajan />;
  if (open === 'gk') return <GKFood />;

  return (
    <section className="section">
      <h2 className="section-title glow-text">More Options</h2>
      <div className="more-options-list">
        {options.map(opt => (
          <div
            className="more-option-card animated-card"
            key={opt.id}
            onClick={() => {
              if (opt.id === 'khana' || opt.id === 'gk') setOpen(opt.id);
            }}
          >
            <span className="more-option-icon">{opt.icon}</span>
            <span className="more-option-label">{opt.label}</span>
          </div>
        ))}
        <button className="logout-btn" onClick={() => navigate('/homepage')}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </div>
    </section>
  );
};

export default MoreOptionsSection; 