import React from 'react';
import { getBackendImageUrl } from '../../utils/backend-image';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, onBack }) => {
  return (
    <div className="product-list-container">
      <div className="product-list-grid">
        {products.length === 0 ? (
          <div className="no-products">No products found in this category.</div>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img 
                src={product.filepath ? getBackendImageUrl(product.filepath) : '/placeholder-food.jpg'} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = '/placeholder-food.jpg'; // Fallback image
                }}
              />
              <h3 className="product-title">{product.name}</h3>
              <div className="product-info">
                <p className="product-price">NPR {product.price}</p>
                <p className="product-type">{product.type}</p>
                <p className="product-category">
                  📂 {product.categoryId?.name || 'Unknown Category'}
                </p>
                <p className="product-restaurant">
                  🏪 {product.restaurantId?.name || 'Unknown Restaurant'}
                </p>
                <p className="product-location">
                  📍 {product.restaurantId?.location || 'Location not available'}
                </p>
              </div>
              <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList; 