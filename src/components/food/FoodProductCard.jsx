import React from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import './FoodProductCard.css';

const FoodProductCard = ({ product, onAddToCart, onViewDetails, onToggleFavorite, isFavorite = false }) => {
    const {
        _id,
        name,
        description,
        price,
        image,
        category,
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

    return (
        <div className="food-product-card" tabIndex={0}>
            {/* Product Image */}
            <div className="product-image-container">
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                    loading="lazy"
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
                {category && (
                    <div className="category-tag">
                        {category.name}
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
                    
                    <button
                        onClick={handleAddToCart}
                        className="add-to-cart-btn"
                        disabled={!isAvailable}
                        aria-label="Add to cart"
                    >
                        <FaShoppingCart />
                        {isAvailable ? 'Add to Cart' : 'Unavailable'}
                    </button>
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
                        <button 
                            onClick={handleAddToCart} 
                            className="quick-view-btn primary"
                            disabled={!isAvailable}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodProductCard; 