import React, { useState, useEffect, useContext } from 'react';
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaStar, FaUsers, FaFire } from 'react-icons/fa';
import { AuthContext } from '../../../auth/AuthProvider';
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
import "./DashboardWelcome.css";

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
    status: "delivered",
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
    status: "in-progress",
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
  const { user } = useContext(AuthContext);
  const userName = user?.fullname || user?.username || 'Foodie';
  
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
      
      if (!token) {
        console.log('No token found, using static data');
        setOrders(staticRecentOrders);
        return;
      }
      
      const response = await fetch('http://localhost:5050/api/orders?limit=3', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      console.log('Orders API response:', data);
      
      if (data.success && data.data && Array.isArray(data.data) && data.data.length > 0) {
        console.log('Fetched recent orders:', data.data);
        console.log('Order statuses:', data.data.map(order => order.status));
        // Ensure each order has the required properties
        const validatedOrders = data.data.map(order => {
          // Handle deliveryAddress - could be string or object
          let deliveryAddress = 'Address not specified';
          if (order.deliveryAddress) {
            if (typeof order.deliveryAddress === 'string') {
              deliveryAddress = order.deliveryAddress;
            } else if (typeof order.deliveryAddress === 'object') {
              // Convert address object to string
              const address = order.deliveryAddress;
              const addressParts = [
                address.street,
                address.city,
                address.state,
                address.zipCode,
                address.country
              ].filter(part => part && part.trim());
              deliveryAddress = addressParts.join(', ');
            }
          }

          return {
            _id: order._id || `order-${Date.now()}`,
            status: order.status || 'Unknown',
            createdAt: order.createdAt || new Date(),
            totalAmount: order.totalAmount || 0,
            deliveryAddress: deliveryAddress,
            products: Array.isArray(order.products) ? order.products : []
          };
        });
        setOrders(validatedOrders);
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

  try {
    return (
      <div className="home-section">
        {/* Attractive Welcome Heading */}
        <div className="dashboard-welcome-banner">
          <div className="welcome-content">
            <div className="welcome-icon-wrapper">
              <span className="welcome-emoji">👋</span>
            </div>
            <div className="welcome-text-content">
              <h1 className="dashboard-greeting">
                Hello, <span className="username-highlight">{userName}</span>!
              </h1>
              <p className="dashboard-tagline">
                <span className="tagline-icon">🍽️</span>
                Let's enjoy your food journey together
                <span className="tagline-icon">✨</span>
              </p>
            </div>
          </div>
          <div className="welcome-decoration welcome-decoration-1"></div>
          <div className="welcome-decoration welcome-decoration-2"></div>
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
              {orders.slice(0, 2).map((order) => {
                // Ensure order has required properties
                const safeOrder = {
                  _id: order._id || `order-${Date.now()}`,
                  status: order.status || 'Unknown',
                  createdAt: order.createdAt || new Date(),
                  totalAmount: order.totalAmount || 0,
                  deliveryAddress: (() => {
                    // Handle deliveryAddress - could be string or object
                    if (!order.deliveryAddress) return 'Address not specified';
                    if (typeof order.deliveryAddress === 'string') return order.deliveryAddress;
                    if (typeof order.deliveryAddress === 'object') {
                      const address = order.deliveryAddress;
                      const addressParts = [
                        address.street,
                        address.city,
                        address.state,
                        address.zipCode,
                        address.country
                      ].filter(part => part && part.trim());
                      return addressParts.join(', ');
                    }
                    return 'Address not specified';
                  })(),
                  products: Array.isArray(order.products) ? order.products : []
                };
                
                // Debug status processing
                // console.log('Processing order status:', {
                //   original: order.status,
                //   safe: safeOrder.status,
                //   mapped: (() => {
                //     const status = typeof safeOrder.status === 'string' ? safeOrder.status.toLowerCase() : 'unknown';
                //     if (status === 'delivered' || status === 'completed' || status === 'success') return 'delivered';
                //     if (status === 'in progress' || status === 'in-progress' || status === 'processing' || status === 'preparing') return 'in-progress';
                //     if (status === 'pending' || status === 'confirmed' || status === 'accepted') return 'pending';
                //     if (status === 'failed' || status === 'error' || status === 'declined') return 'failed';
                //     if (status === 'cancelled' || status === 'canceled') return 'cancelled';
                //     return 'unknown';
                //   })()
                // });
                
                return (
                  <div key={safeOrder._id} className="order-card animated-card">
                    <div className="order-header">
                      <div className="order-status">
                        <span className={`status-badge ${(() => {
                          const status = typeof safeOrder.status === 'string' ? safeOrder.status.toLowerCase() : 'unknown';
                          // Map various status values to our CSS classes
                          if (status === 'delivered' || status === 'completed' || status === 'success') return 'delivered';
                          if (status === 'in progress' || status === 'in-progress' || status === 'processing' || status === 'preparing') return 'in-progress';
                          if (status === 'pending' || status === 'confirmed' || status === 'accepted') return 'pending';
                          if (status === 'failed' || status === 'error' || status === 'declined') return 'failed';
                          if (status === 'cancelled' || status === 'canceled') return 'cancelled';
                          return 'unknown';
                        })()}`}>
                          {(() => {
                            const status = typeof safeOrder.status === 'string' ? safeOrder.status : 'Unknown';
                            // Format status for display
                            if (status.toLowerCase() === 'in progress') return 'In Progress';
                            if (status.toLowerCase() === 'in-progress') return 'In Progress';
                            return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                          })()}
                        </span>
                      </div>
                      <div className="order-date">
                        <FaClock />
                        <span>{new Date(safeOrder.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="order-items">
                      {safeOrder.products && safeOrder.products.slice(0, 2).map((item, index) => {
                        const safeItem = {
                          productId: item.productId || {},
                          quantity: item.quantity || 1,
                          price: item.price || 0
                        };
                        
                        return (
                          <div key={index} className="order-item">
                            <div className="order-item-image-container">
                              <img
                                src={typeof safeItem.productId.image === 'string' ? safeItem.productId.image : momo}
                                alt={typeof safeItem.productId.name === 'string' ? safeItem.productId.name : 'Product'}
                                className="order-item-image"
                                onError={(e) => {
                                  e.target.src = momo;
                                }}
                              />
                              <div className="item-quantity-badge">
                                {typeof safeItem.quantity === 'number' ? safeItem.quantity : 1}
                              </div>
                            </div>
                            <div className="order-item-info">
                              <h4 className="item-name">{typeof safeItem.productId.name === 'string' ? safeItem.productId.name : 'Product'}</h4>
                              <p className="item-price">₹{typeof safeItem.price === 'number' ? safeItem.price : 0}</p>
                            </div>
                          </div>
                        );
                      })}
                      {safeOrder.products && safeOrder.products.length > 2 && (
                        <div className="more-items">
                          <span>+{safeOrder.products.length - 2} more items</span>
                        </div>
                      )}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        <strong>Total: ₹{typeof safeOrder.totalAmount === 'number' ? safeOrder.totalAmount : 0}</strong>
                      </div>
                      <div className="order-location">
                        <FaMapMarkerAlt />
                        <span>{typeof safeOrder.deliveryAddress === 'string' ? safeOrder.deliveryAddress : 'Address not specified'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
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
  } catch (error) {
    console.error('Error rendering HomeSection:', error);
    return (
      <div className="home-section">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to BhokBhoj</h1>
          <p className="welcome-subtitle">Discover the best food from the best restaurants</p>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Something went wrong while loading the dashboard.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default HomeSection; 

