import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import momo from "../assets/cat_3.png";
import chowmein from "../assets/cat_4.png";
import thakali from "../assets/cat_sri.png";

import { FaSearch, FaShoppingCart } from "react-icons/fa";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  const categories = [
    { title: "Momo", subtitle: "Popular Nepali dumplings", image: momo },
    { title: "Chowmein", subtitle: "Stir-fried noodles", image: chowmein },
    { title: "Thakali Set", subtitle: "Traditional Nepali meal", image: thakali },
  ];

  const restaurants = [
    { name: "Momo House", desc: "Famous for momos", image: momo, rating: "⭐ 4.7" },
    { name: "Chowmein Express", desc: "Fast & Tasty", image: chowmein, rating: "⭐ 4.5" },
    { name: "Thakali Kitchen", desc: "Authentic cuisine", image: thakali, rating: "⭐ 4.8" },
  ];

  const recentOrders = [
    { name: "Chicken Momo", desc: "Delivered 2h ago", image: momo, time: "🕒 2h ago" },
    { name: "Veg Chowmein", desc: "Delivered yesterday", image: chowmein, time: "🕒 1d ago" },
    { name: "Thakali Set", desc: "Delivered 3 days ago", image: thakali, time: "🕒 3d ago" },
  ];

  return (
    <div className="dashboard-container fancy-bg">
      
<Sidebar />
<div className="sidebar-icon">
  <span className="icon-circle">🍽️</span>
  <span className="icon-label">Mitho Bites</span>
</div>

      <main className="main-content">
        <div className="dashboard-header-wrapper">
          <Header />
          <div className="cart-icon" onClick={goToCart}>
            <FaShoppingCart />
          </div>
        </div>
        <div className="dashboard-scroll-area">
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search momo, chowmein, thakali..."
            />
          </div>

          <section className="section">
            <h2 className="section-title glow-text">Categories</h2>
            <div className="categories-row">
              {categories.map((cat, i) => (
                <div className="category-card animated-card" key={i}>
                  <img src={cat.image} alt={cat.title} className="category-image" />
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-subtitle">{cat.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title glow-text">Popular Restaurants</h2>
            <div className="vertical-list">
              {restaurants.map((res, i) => (
                <div className="list-item animated-list" key={i}>
                  <img src={res.image} alt={res.name} className="list-item-image" />
                  <div className="list-item-info">
                    <h4 className="list-item-title">{res.name}</h4>
                    <p className="list-item-desc">{res.desc}</p>
                  </div>
                  <div className="list-item-rating">{res.rating}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title glow-text">Most Loved Dishes</h2>
            <div className="categories-row">
              {categories.map((cat, i) => (
                <div className="category-card animated-card" key={i}>
                  <img src={cat.image} alt={cat.title} className="category-image" />
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-subtitle">{cat.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title glow-text">Recently Ordered</h2>
            <div className="vertical-list">
              {recentOrders.map((order, i) => (
                <div className="list-item animated-list" key={i}>
                  <img src={order.image} alt={order.name} className="list-item-image" />
                  <div className="list-item-info">
                    <h4 className="list-item-title">{order.name}</h4>
                    <p className="list-item-desc">{order.desc}</p>
                  </div>
                  <div className="list-item-time">{order.time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;