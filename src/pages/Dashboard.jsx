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

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <div className="dashboard-header-wrapper">
          <Header />
          <div className="cart-icon" onClick={goToCart}>
            <FaShoppingCart />
          </div>
        </div>

        <div className="dashboard-scroll-area">
          {/* Search Bar replacing Banner */}
          <div className="search-bar-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search food, momo, selroti"
            />
          </div>

          {/* Categories Section */}
          <section className="section">
            <h2 className="section-title">Categories</h2>
            <div className="categories-row">
              <div className="category-card">
                <img src={momo} alt="Momo" className="category-image" />
                <h3 className="category-title">Momo</h3>
                <p className="category-subtitle">Popular Nepali dumplings</p>
              </div>

              <div className="category-card">
                <img src={chowmein} alt="Chowmein" className="category-image" />
                <h3 className="category-title">Chowmein</h3>
                <p className="category-subtitle">Delicious stir-fried noodles</p>
              </div>

              <div className="category-card">
                <img src={thakali} alt="Thakali Set" className="category-image" />
                <h3 className="category-title">Thakali Set</h3>
                <p className="category-subtitle">Traditional Nepali platter</p>
              </div>
            </div>
          </section>

          {/* Popular Restaurants Section */}
          <section className="section">
            <h2 className="section-title">Popular Restaurants</h2>
            <div className="vertical-list">
              <div className="list-item">
                <img
                  src={momo}
                  alt="Restaurant 1"
                  className="list-item-image"
                />
                <div className="list-item-info">
                  <h4 className="list-item-title">Momo House</h4>
                  <p className="list-item-desc">Famous for momos & snacks</p>
                </div>
                <div className="list-item-rating">⭐ 4.7</div>
              </div>

              <div className="list-item">
                <img
                  src={chowmein}
                  alt="Restaurant 2"
                  className="list-item-image"
                />
                <div className="list-item-info">
                  <h4 className="list-item-title">Chowmein Express</h4>
                  <p className="list-item-desc">Tasty noodles & quick bites</p>
                </div>
                <div className="list-item-rating">⭐ 4.5</div>
              </div>

              <div className="list-item">
                <img
                  src={thakali}
                  alt="Restaurant 3"
                  className="list-item-image"
                />
                <div className="list-item-info">
                  <h4 className="list-item-title">Thakali Kitchen</h4>
                  <p className="list-item-desc">Authentic Thakali cuisine</p>
                </div>
                <div className="list-item-rating">⭐ 4.8</div>
              </div>
            </div>
          </section>

          {/* Most Loved Dishes Section */}
          <section className="section">
            <h2 className="section-title">Most Loved Dishes</h2>
            <div className="categories-row">
              <div className="category-card">
                <img src={momo} alt="Momo" className="category-image" />
                <h3 className="category-title">Steamed Momo</h3>
                <p className="category-subtitle">Soft and juicy dumplings</p>
              </div>

              <div className="category-card">
                <img src={chowmein} alt="Chowmein" className="category-image" />
                <h3 className="category-title">Veg Chowmein</h3>
                <p className="category-subtitle">Crispy & flavorful noodles</p>
              </div>

              <div className="category-card">
                <img src={thakali} alt="Thakali Set" className="category-image" />
                <h3 className="category-title">Thakali Set Meal</h3>
                <p className="category-subtitle">Hearty and wholesome meal</p>
              </div>
            </div>
          </section>

          {/* Recently Ordered Section */}
          <section className="section">
            <h2 className="section-title">Recently Ordered</h2>
            <div className="vertical-list">
              <div className="list-item">
                <img src={momo} alt="Order 1" className="list-item-image" />
                <div className="list-item-info">
                  <h4 className="list-item-title">Chicken Momo</h4>
                  <p className="list-item-desc">Delivered 2 hours ago</p>
                </div>
                <div className="list-item-time">🕒 2h ago</div>
              </div>

              <div className="list-item">
                <img src={chowmein} alt="Order 2" className="list-item-image" />
                <div className="list-item-info">
                  <h4 className="list-item-title">Veg Chowmein</h4>
                  <p className="list-item-desc">Delivered yesterday</p>
                </div>
                <div className="list-item-time">🕒 1d ago</div>
              </div>

              <div className="list-item">
                <img src={thakali} alt="Order 3" className="list-item-image" />
                <div className="list-item-info">
                  <h4 className="list-item-title">Thakali Set</h4>
                  <p className="list-item-desc">Delivered 3 days ago</p>
                </div>
                <div className="list-item-time">🕒 3d ago</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
