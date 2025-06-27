import React from 'react';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import momo from '../../../assets/images/momo.png';

const ProductList = ({ products, onAddToCart, onBack }) => {
  console.log('Dashboard ProductList received products:', products);

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>No products found in this category</h3>
        <button 
          className="back-btn" 
          onClick={onBack}
          style={{ marginTop: '20px' }}
        >
          <FaArrowLeft /> Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map((product) => {
          console.log('Rendering product:', product);
          console.log('Product image field:', product.image);
          console.log('Product category name:', product.categoryName);
          console.log('Product restaurant name:', product.restaurantName);
          
          return (
            <div key={product._id} className="product-card animated-card">
              <div className="product-image-container">
                <img
                  src={product.image || momo}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    console.log('Image failed to load, using fallback');
                    e.target.src = momo;
                  }}
                />
                <div className="product-overlay">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-type">{product.type}</span>
                </div>
                <div className="product-category">
                  <span>Category: {product.categoryName || 'N/A'}</span>
                </div>
                <div className="product-restaurant">
                  <span>Restaurant: {product.restaurantName || 'N/A'}</span>
                </div>
                {product.restaurantLocation && (
                  <div className="product-location">
                    <span>📍 {product.restaurantLocation}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList; 