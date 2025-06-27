import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaStar, FaUsers, FaFire } from 'react-icons/fa';
import loved1 from "../../../assets/item_1.png";
import loved2 from "../../../assets/item_2.png";
import loved3 from "../../../assets/item_3.png";
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";
import momo from "../../../assets/images/momo.png";
import chowmein from "../../../assets/cat_4.png";
import thakali from "../../../assets/cat_sri.png";
import "../Dashboard.css";

const muchLovedDishes = [
  { id: 1, name: "Spicy Momo", image: loved1, price: 130, type: "Nepali", restaurant: "Momo House" },
  { id: 2, name: "Paneer Chowmein", image: loved2, price: 140, type: "Indian", restaurant: "Chowmein Express" },
  { id: 3, name: "Sel Roti", image: loved3, price: 60, type: "Nepali", restaurant: "Nepali Snacks" },
];

const popularRestaurants = [
  { id: 1, name: "Momo House", desc: "Famous for momos", image: res1, rating: "⭐ 4.7" },
  { id: 2, name: "Chowmein Express", desc: "Fast & Tasty", image: res2, rating: "⭐ 4.5" },
  { id: 3, name: "Thakali Kitchen", desc: "Authentic cuisine", image: res3, rating: "⭐ 4.8" },
];

// Static recent orders for demonstration
const staticRecentOrders = [
  {
    _id: "order1",
    status: "Delivered",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    totalAmount: 450,
    deliveryAddress: "Kathmandu, Nepal",
    products: [
      {
        productId: {
          name: "Spicy Momo",
          image: loved1,
          price: 250
        },
        quantity: 1,
        price: 250
      },
      {
        productId: {
          name: "Chowmein",
          image: loved2,
          price: 200
        },
        quantity: 1,
        price: 200
      }
    ]
  },
  {
    _id: "order2",
    status: "In Progress",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    totalAmount: 320,
    deliveryAddress: "Lalitpur, Nepal",
    products: [
      {
        productId: {
          name: "Thakali Set",
          image: thakali,
          price: 320
        },
        quantity: 1,
        price: 320
      }
    ]
  }
];

const HomeSection = ({ 
  recentOrders, 
  onViewAllOrders, 
  onCategoryClick, 
  onRestaurantClick,
  categories,
  restaurants 
}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debug logging
  console.log('=== HOME SECTION DEBUG ===');
  console.log('HomeSection props:', { recentOrders, onViewAllOrders, onCategoryClick, onRestaurantClick, categories, restaurants });
  console.log('HomeSection state:', { orders, loading });

  useEffect(() => {
    console.log('HomeSection useEffect triggered');
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Fetching recent orders with token:', token ? 'Token exists' : 'No token');
      
      const response = await fetch('http://localhost:5000/api/orders?limit=3', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      console.log('Orders API response:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        console.log('Fetched recent orders:', data.data);
        setOrders(data.data);
      } else {
        console.log('No orders found, using static data');
        setOrders(staticRecentOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.log('Using static orders due to error');
      setOrders(staticRecentOrders);
    } finally {
      setLoading(false);
    }
  };

  console.log('HomeSection rendering with orders:', orders);

  return (
    <div className="home-section">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to MithoBites</h1>
        <p className="welcome-subtitle">Discover the best food from the best restaurants</p>
      </div>

      {/* Recent Orders */}
      {!loading && orders && orders.length > 0 && (
        <div className="recent-orders-section">
          <div className="section-header">
            <h2 className="section-title">Recent Orders</h2>
            <button className="view-all-btn" onClick={onViewAllOrders}>
              View All <FaArrowRight />
            </button>
          </div>
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order._id} className="order-card animated-card">
                <div className="order-header">
                  <div className="order-status">
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-date">
                    <FaClock />
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="order-items">
                  {order.products && order.products.slice(0, 2).map((item, index) => (
                    <div key={index} className="order-item">
                      <img
                        src={item.productId?.image || momo}
                        alt={item.productId?.name || 'Product'}
                        className="order-item-image"
                        onError={(e) => {
                          e.target.src = momo;
                        }}
                      />
                      <div className="order-item-info">
                        <h4>{item.productId?.name || 'Product'}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p>₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                  {order.products && order.products.length > 2 && (
                    <div className="more-items">
                      <span>+{order.products.length - 2} more items</span>
                    </div>
                  )}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    <strong>Total: ₹{order.totalAmount}</strong>
                  </div>
                  <div className="order-location">
                    <FaMapMarkerAlt />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Much Loved Dishes */}
      <div className="much-loved-section">
        <h2 className="section-title">Much Loved Dishes</h2>
        <div className="dishes-grid">
          {muchLovedDishes.map((dish) => (
            <div key={dish.id} className="dish-card animated-card">
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-image"
              />
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-info">{dish.type} • {dish.restaurant}</p>
              <p className="dish-price">₹{dish.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Restaurants */}
      <div className="popular-restaurants-section">
        <h2 className="section-title">Popular Restaurants</h2>
        <div className="restaurants-grid">
          {popularRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card animated-card">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-content">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-desc">{restaurant.desc}</p>
                <div className="restaurant-footer">
                  <span className="restaurant-rating">{restaurant.rating}</span>
                  <button className="view-menu-btn">
                    View Menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <div 
            className="quick-action-card animated-card"
            onClick={() => onCategoryClick()}
          >
            <div className="action-icon">🍽️</div>
            <h3>Browse Categories</h3>
            <p>Explore food by category</p>
          </div>
          <div 
            className="quick-action-card animated-card"
            onClick={() => onRestaurantClick()}
          >
            <div className="action-icon">🏪</div>
            <h3>View Restaurants</h3>
            <p>Find your favorite restaurants</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection; 