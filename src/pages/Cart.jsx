import React, { useState } from 'react';
import { FaArrowLeft, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useOrders';
import './Cart.css';

export default function Cart() {
    const { 
        cart, 
        itemCount, 
        isLoading, 
        error, 
        updateCartItem, 
        removeFromCart, 
        clearCart,
        isUpdatingCart,
        isRemovingFromCart,
        isClearingCart
    } = useCart();

    const createOrderMutation = useCreateOrder();

    const [deliveryAddress, setDeliveryAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateCartItem(productId, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (!deliveryAddress.street || !deliveryAddress.city) {
            alert('Please fill in your delivery address');
            return;
        }

        const orderData = {
            deliveryAddress,
            deliveryInstructions,
            paymentMethod
        };

        createOrderMutation.mutate(orderData);
    };

    if (isLoading) {
        return (
            <div className="cart-loading">
                <FaShoppingBag className="loading-icon" />
                <p>Loading your cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-error">
                <p>Error loading cart: {error.message}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (itemCount === 0) {
        return (
            <div className="cart-empty">
                <div className="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some delicious food to get started!</p>
                <a href="/menu" className="browse-menu-btn">
                    Browse Menu
                </a>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {/* Header */}
            <div className="cart-header">
                <a href="/" className="back-to-home">
                    <FaArrowLeft size={18} />
                    <span>Back to Home</span>
                </a>
                <h1 className="cart-title">Your Cart 🛒</h1>
                <p className="cart-subtitle">{itemCount} items in your cart</p>
            </div>

            <div className="cart-content">
                {/* Cart Items */}
                <div className="cart-items-section">
                    <div className="cart-items-header">
                        <h2>Cart Items</h2>
                        <button 
                            onClick={clearCart} 
                            className="clear-cart-btn"
                            disabled={isClearingCart}
                        >
                            <FaTrash />
                            Clear Cart
                        </button>
                    </div>

                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div key={item.productId._id} className="cart-item">
                                <div className="item-image">
                                    <img 
                                        src={item.productId.filepath} 
                                        alt={item.productId.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/80x80?text=Food';
                                        }}
                                    />
                                </div>
                                
                                <div className="item-details">
                                    <h3 className="item-name">{item.productId.name}</h3>
                                    <p className="item-price">₹{item.price}</p>
                                </div>

                                <div className="item-quantity">
                                    <button
                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                                        disabled={isUpdatingCart}
                                        className="quantity-btn"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                                        disabled={isUpdatingCart}
                                        className="quantity-btn"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <div className="item-total">
                                    <span>₹{item.price * item.quantity}</span>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.productId._id)}
                                    disabled={isRemovingFromCart}
                                    className="remove-item-btn"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Checkout Section */}
                <div className="checkout-section">
                    <h2>Checkout</h2>
                    
                    {/* Delivery Address */}
                    <div className="form-group">
                        <label>Delivery Address</label>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={deliveryAddress.street}
                            onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                            className="form-input"
                        />
                        <div className="address-row">
                            <input
                                type="text"
                                placeholder="City"
                                value={deliveryAddress.city}
                                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                                className="form-input"
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={deliveryAddress.state}
                                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                                className="form-input"
                            />
                        </div>
                        <div className="address-row">
                            <input
                                type="text"
                                placeholder="ZIP Code"
                                value={deliveryAddress.zipCode}
                                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                                className="form-input"
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={deliveryAddress.country}
                                onChange={(e) => setDeliveryAddress(prev => ({ ...prev, country: e.target.value }))}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div className="form-group">
                        <label>Delivery Instructions (Optional)</label>
                        <textarea
                            placeholder="Any special instructions for delivery..."
                            value={deliveryInstructions}
                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                            className="form-textarea"
                            rows="3"
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="form-group">
                        <label>Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-select"
                        >
                            <option value="cash">Cash on Delivery</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="online">Online Payment</option>
                        </select>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal ({itemCount} items):</span>
                            <span>₹{cart.totalAmount}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee:</span>
                            <span>₹50</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{cart.totalAmount + 50}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={createOrderMutation.isPending || itemCount === 0}
                        className="checkout-btn"
                    >
                        {createOrderMutation.isPending ? 'Placing Order...' : `Place Order - ₹${cart.totalAmount + 50}`}
                    </button>
                </div>
            </div>
        </div>
    );
} 
