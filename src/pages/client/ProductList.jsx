import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart, onBack }) => {
  return (
    <div className="product-list-container">
      <button className="back-btn" onClick={onBack}>← Back to Categories</button>
      <div className="product-list-grid">
        {products.length === 0 ? (
          <div className="no-products">No products found in this category.</div>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-meta">
                NPR {product.price} | {product.type} | {product.restaurant}
              </p>
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