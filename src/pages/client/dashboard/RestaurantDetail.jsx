import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaClock, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { getBackendImageUrl } from "../../../utils/backend-image";
import { useFoodProducts } from "../../../hooks/useFoodProducts";
import ProductList from "../ProductList";
import "../Dashboard.css";

// Fallback restaurant images
import res1 from "../../../assets/res_1.png";
import res2 from "../../../assets/res_2.png";
import res3 from "../../../assets/res_3.png";

const fallbackImages = [res1, res2, res3];

const RestaurantDetail = ({ restaurant, onBack, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products, isLoading: productsLoading } = useFoodProducts();

  // Filter products for this restaurant (assuming products have restaurantId field)
  // For now, we'll show all products since the current model doesn't have restaurantId
  const restaurantProducts = products.filter(product => {
    // If you add restaurantId to products later, uncomment this:
    // return product.restaurantId === restaurant._id;
    return true; // Show all products for now
  });

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const getRestaurantImage = () => {
    if (restaurant.filepath) {
      return getBackendImageUrl(restaurant.filepath);
    }
    // Use fallback based on restaurant name or index
    const index = restaurant.name ? restaurant.name.length % fallbackImages.length : 0;
    return fallbackImages[index];
  };

  return (
    <div className="restaurant-detail-container">
      {/* Back Button */}
      <button className="back-btn big-back-btn" onClick={onBack}>
        <FaArrowLeft /> Back to Restaurants
      </button>

      {/* Restaurant Header */}
      <div className="restaurant-header">
        <div className="restaurant-image-container">
          <img 
            src={getRestaurantImage()} 
            alt={restaurant.name} 
            className="restaurant-detail-image"
            onError={(e) => {
              const index = restaurant.name ? restaurant.name.length % fallbackImages.length : 0;
              e.target.src = fallbackImages[index];
            }}
          />
        </div>
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <div className="restaurant-meta-detail">
            <span className="restaurant-location">
              <FaMapMarkerAlt /> {restaurant.location}
            </span>
            <span className="restaurant-contact">
              <FaPhoneAlt /> {restaurant.contact}
            </span>
          </div>
          <div className="restaurant-status-detail">
            <span className="status-open">
              <FaClock /> Open Now • 30-45 min delivery
            </span>
            <span className="rating">
              <FaStar /> 4.5 (120+ reviews)
            </span>
          </div>
          <div className="restaurant-description">
            <p>Delicious food delivered fresh to your doorstep. Order now and enjoy amazing flavors!</p>
          </div>
        </div>
      </div>

      {/* Restaurant Menu */}
      <div className="restaurant-menu">
        <h2 className="section-title glow-text">Menu</h2>
        
        {productsLoading ? (
          <div className="loading-container">
            <div className="loader">Loading menu...</div>
          </div>
        ) : restaurantProducts.length > 0 ? (
          <ProductList
            products={restaurantProducts}
            onAddToCart={handleAddToCart}
            onBack={onBack}
          />
        ) : (
          <div className="no-products">
            <p>No menu items available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail; 