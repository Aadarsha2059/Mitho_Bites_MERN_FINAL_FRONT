import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, onBack }) => {
  console.log('ProductList received products:', products);

  return (
    <div className="product-list-container">
      <button className="back-btn" onClick={onBack}>← Back to Categories</button>
      <div className="product-list-grid">
        {products.length === 0 ? (
          <div className="no-products">No products found in this category.</div>
        ) : (
          products.map((product) => {
            console.log('Rendering product:', product);
            console.log('Product image field:', product.image);
            console.log('Product category name:', product.categoryName);
            console.log('Product restaurant name:', product.restaurantName);
            
            return (
              <div className="product-card" key={product._id}>
                <img 
                  src={product.image || '/placeholder-food.jpg'} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => {
                    console.log('Product image failed to load, using fallback');
                    e.target.src = '/placeholder-food.jpg'; // Fallback image
                  }}
                />
                <h3 className="product-title">{product.name}</h3>
                <div className="product-info">
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-type">{product.type}</p>
                  <p className="product-category">
                    📂 {product.categoryName || 'Unknown Category'}
                  </p>
                  <p className="product-restaurant">
                    🏪 {product.restaurantName || 'Unknown Restaurant'}
                  </p>
                  <p className="product-location">
                    📍 {product.restaurantLocation || 'Location not available'}
                  </p>
                  {product.description && (
                    <p className="product-description">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </p>
                  )}
                </div>
                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductList; 
