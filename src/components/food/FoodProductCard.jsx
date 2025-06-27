import React from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import './FoodProductCard.css';
import momoFallback from '../../assets/images/momo.png';
import selRotiFallback from '../../assets/images/sel_roti.png';
import yomariFallback from '../../assets/images/yomari.png';
import featured1Fallback from '../../assets/images/featured/featured1.png';
import featured2Fallback from '../../assets/images/featured/featured2.png';
import featured3Fallback from '../../assets/images/featured/featured3.png';
import dalBhatFallback from '../../assets/images/dal_bhat.png';
import chatamariFallback from '../../assets/images/chatamari.png';
import gundrukFallback from '../../assets/images/gundruk.png';

const FoodProductCard = ({ product, onAddToCart, onViewDetails, onToggleFavorite, isFavorite = false }) => {
    const {
        _id,
        name,
        description,
        price,
        image,
        categoryName,
        categoryImage,
        restaurantName,
        restaurantImage,
        restaurantLocation,
        restaurantContact,
        type,
        rating = 4.5,
        reviewCount = 0,
        isAvailable = true,
        isSpicy = false,
        preparationTime = '20-30 min'
    } = product;

    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    const handleViewDetails = (e) => {
        e.stopPropagation();
        onViewDetails(product);
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        onToggleFavorite(product);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star filled" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="star half-filled" />);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
        }

        return stars;
    };

    const getFoodTypeBadge = (type) => {
        if (!type) return null;
        
        const typeLower = type.toLowerCase();
        if (typeLower === 'indian') {
            return <span className="badge indian">🇮🇳 Indian</span>;
        } else if (typeLower === 'nepali') {
            return <span className="badge nepali">🇳🇵 Nepali</span>;
        }
        return null;
    };

    // Helper to get diverse fallback image based on product type/category
    const getImageSrc = () => {
        if (image && typeof image === 'string' && image.trim() !== '') {
            return image;
        }
        
        // Use diverse fallback images in specific order: veg momo, roti tarkari, sel roti, dal bhat, dal bhat
        const fallbackImages = [
            momoFallback,           // veg momo
            featured1Fallback,      // roti tarkari
            selRotiFallback,        // sel roti
            dalBhatFallback,        // dal bhat
            dalBhatFallback,        // dal bhat (second time)
            yomariFallback,         // additional variety
            featured2Fallback,      // additional variety
            featured3Fallback,      // additional variety
            chatamariFallback,      // additional variety
            gundrukFallback         // additional variety
        ];
        
        // Use product ID or name to consistently pick a fallback
        const productId = _id || name || '';
        const hash = productId.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        const index = Math.abs(hash) % fallbackImages.length;
        
        return fallbackImages[index];
    };

    return (
        <div className="food-product-card" tabIndex={0}>
            {/* Product Image */}
            <div className="product-image-container">
                <img
                    src={getImageSrc()}
                    alt={name}
                    className="product-image"
                    loading="lazy"
                    style={{ border: '2px solid #fff', boxShadow: '0 4px 18px rgba(0,0,0,0.13)', borderRadius: '14px', background: '#f8f8f8' }}
                    onError={e => { 
                        e.target.onerror = null; 
                        // Use a different fallback if the first one fails
                        const fallbackImages = [
                            selRotiFallback,
                            yomariFallback,
                            featured2Fallback,
                            featured3Fallback,
                            dalBhatFallback,
                            chatamariFallback,
                            gundrukFallback,
                            momoFallback
                        ];
                        const randomIndex = Math.floor(Math.random() * fallbackImages.length);
                        e.target.src = fallbackImages[randomIndex];
                    }}
                />
                
                {/* Badges */}
                <div className="product-badges">
                    {getFoodTypeBadge(type)}
                    {isSpicy && (
                        <span className="badge spicy">🌶️ Spicy</span>
                    )}
                    {!isAvailable && (
                        <span className="badge unavailable">❌ Unavailable</span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="product-actions">
                    <button
                        onClick={handleToggleFavorite}
                        className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <FaHeart />
                    </button>
                    <button
                        onClick={handleViewDetails}
                        className="action-btn view-btn"
                        aria-label="View details"
                    >
                        <FaEye />
                    </button>
                </div>

                {/* Category Tag */}
                {categoryName && (
                    <div className="category-tag">
                        {categoryName}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                
                <p className="product-description">
                    {description.length > 80 
                        ? `${description.substring(0, 80)}...` 
                        : description
                    }
                </p>

                {/* Restaurant Information */}
                {restaurantName && (
                    <div className="restaurant-info">
                        <div className="restaurant-header">
                            {restaurantImage && (
                                <img 
                                    src={restaurantImage} 
                                    alt={restaurantName}
                                    className="restaurant-thumbnail"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                            <span className="restaurant-name">{restaurantName}</span>
                        </div>
                        {restaurantLocation && (
                            <div className="restaurant-location">
                                <FaMapMarkerAlt className="location-icon" />
                                <span>{restaurantLocation}</span>
                            </div>
                        )}
                        {restaurantContact && (
                            <div className="restaurant-contact">
                                <FaPhoneAlt className="contact-icon" />
                                <span>{restaurantContact}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Rating */}
                <div className="product-rating">
                    <div className="stars">
                        {renderStars(rating)}
                    </div>
                    <span className="rating-text">
                        {rating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                </div>

                {/* Preparation Time */}
                <div className="preparation-time">
                    <span className="time-icon">⏱️</span>
                    <span>{preparationTime}</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="product-footer">
                    <div className="price-container">
                        <span className="price">₹{price}</span>
                        {product.originalPrice && product.originalPrice > price && (
                            <span className="original-price">₹{product.originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Overlay */}
            <div className="quick-view-overlay">
                <div className="quick-view-content">
                    <h4>Quick View</h4>
                    <p>{description}</p>
                    <div className="quick-view-actions">
                        <button onClick={handleViewDetails} className="quick-view-btn">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodProductCard; 