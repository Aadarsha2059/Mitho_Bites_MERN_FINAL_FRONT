// Updated BhokBhoj Payment Methods Component (Simple & Accurate)
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaMoneyBillWave, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import smileImg from '../../assets/favorites_btn_2.png';
import { useCreateOrder } from '../../hooks/useOrders';
import { toast } from 'react-toastify';
import './PaymentMethod.css';

function PaymentMethod({ onClose }) {
  const { cart, clearCart, getCartTotal } = useCart();
  const createOrderMutation = useCreateOrder();
  const [paymentType, setPaymentType] = useState('online');
  const [onlineService, setOnlineService] = useState('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showFinalDialog, setShowFinalDialog] = useState(false); // NEW

  // Calculate cart summary
  const cartTotal = getCartTotal();
  const totalItems = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + quantity;
  }, 0);
  const foodItems = cart.map(item => {
    const product = item.productId || item;
    const name = product.name || 'Unknown Product';
    const quantity = item.quantity || 1;
    return `${name} (${quantity}x)`;
  }).join(', ');

  const handlePayment = async function (e) {
    e.preventDefault();
    
    console.log('Cart data:', cart);
    console.log('Cart length:', cart?.length);
    console.log('Cart type:', typeof cart);
    
    // Check if cart has items
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      toast.error('Your cart is empty. Please add items before placing an order.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Map payment type to backend enum
      const paymentMethod = paymentType === 'online' ? 'online' : 'cash';
      
      // Prepare order data for backend - backend will use user's profile address
      const orderData = {
        deliveryInstructions: "",
        paymentMethod
      };

      console.log('Sending order data:', orderData);

      // Call backend API to create order
      const response = await createOrderMutation.mutateAsync(orderData);
      
      console.log('Order response:', response);
      
      if (response.success) {
        setIsProcessing(false);
        setPaymentComplete(true);
        setShowDialog(true);
        clearCart(); // Clear local cart after successful order
        
        setTimeout(() => {
          setShowDialog(false);
          setShowCallDialog(true);
          setTimeout(() => {
            setShowCallDialog(false);
            setShowFinalDialog(true); // NEW: show final dialog
            setTimeout(() => {
              setShowFinalDialog(false);
              setPaymentComplete(false);
              if (onClose) onClose();
            }, 5000); // Show final dialog for 5s
          }, 5000);
        }, 3000);
        
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Order creation error:', error);
      toast.error(error.message || 'Failed to place order');
    }
  };

  const closeDialog = () => setShowDialog(false);

  if (paymentComplete) {
    return (
      <div className="payment-modal-bg festive-bg"> {/* NEW: festive-bg for more attractive look */}
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your BhokBhoj food order has been confirmed.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-mono text-lg font-semibold">#MB-NEPAL-2025-001</p>
          </div>
          <button onClick={onClose} className="w-full btn-primary online">
            Order More Deliciousness
          </button>
        </div>
        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <img src={smileImg} alt="smile" className="dialog-smile-img" />
              <h2>Bhok lageko cha?</h2>
              <p>Don't worry, we will deliver foods for you!</p>
            </div>
          </div>
        )}
        {showCallDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>We will call you on your contact number after we reach near to you.</h2>
            </div>
          </div>
        )}
        {showFinalDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box festive-dialog-box">
              <div className="decorative-header">
                <span className="confetti">🎉</span>
                <span className="confetti">✨</span>
                <span className="confetti">🍽️</span>
              </div>
              <h2 className="festive-title">Order Placed Successfully!</h2>
              <p className="festive-message">
                Your items successfully on orders place.<br/>
                <span style={{color:'#f76d6d', fontWeight:'bold'}}>We are making foods for you with love and hygiene.</span><br/>
                <span style={{color:'#f8b500'}}>Please visit email inbox and orders history. Stay updated!</span>
              </p>
              <div className="decorative-footer">
                <span className="confetti">💌</span>
                <span className="confetti">🍲</span>
                <span className="confetti">💖</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="payment-modal-bg">
      <button className="modal-close-btn" onClick={onClose}>×</button>
      <div className="payment-modal-container">
        <div className="payment-modal-left">
          <h1 className="payment-title">Payment Methods</h1>
          <p className="payment-desc">Secure your BhokBhoj order now</p>
          <form onSubmit={handlePayment} className="payment-form">
            <div className="payment-method-select">
              <label>Select Payment Method</label>
              <div className="payment-method-options">
                <button type="button" className={`pay-method-btn${paymentType === 'online' ? ' active' : ''}`} onClick={() => setPaymentType('online')}>
                  <FaMobileAlt /> Online
                </button>
                <button type="button" className={`pay-method-btn${paymentType === 'cod' ? ' active' : ''}`} onClick={() => setPaymentType('cod')}>
                  <FaMoneyBillWave /> Cash on Delivery
                </button>
              </div>
            </div>
            {paymentType === 'online' && (
              <div className="payment-service-select">
                <label>Choose Payment Service</label>
                <select
                  value={onlineService}
                  onChange={(e) => setOnlineService(e.target.value)}
                  className="form-input"
                >
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                </select>
                <div className="accepted-badge">Accepted only **</div>
              </div>
            )}
            <div className="payment-form-row">
              <div>
                <label>Food Items</label>
                <input 
                  type="text" 
                  value={foodItems} 
                  className="form-input" 
                  readOnly 
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </div>
              <div>
                <label>Total Quantity</label>
                <input 
                  type="number" 
                  value={totalItems} 
                  className="form-input" 
                  readOnly 
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </div>
            </div>
            <div className="payment-form-row">
              <div style={{ width: '100%' }}>
                <label>Total Price (NPR)</label>
                <input 
                  type="number" 
                  value={cartTotal} 
                  className="form-input" 
                  readOnly 
                  style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}
                />
              </div>
            </div>
            <button type="submit" disabled={isProcessing} className={`w-full btn-primary ${paymentType}`}>
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{paymentType === 'online' ? `Pay with ${onlineService}` : 'Place Order (COD)'}</span>
                  <span>➡️</span>
                </>
              )}
            </button>
          </form>
        </div>
        <div className="payment-modal-right">
          <div className="payment-summary-card">
            <h2>Order Summary</h2>
            {cart.map((item, index) => {
              const product = item.productId || item;
              const name = product.name || 'Unknown Product';
              const price = item.price || product.price || 0;
              const quantity = item.quantity || 1;
              
              return (
                <div key={index} className="summary-row">
                  <span>{name}</span>
                  <span>{quantity}x NPR {price}</span>
                </div>
              );
            })}
            <div className="summary-row total">
              <span>Total</span>
              <span>NPR {cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Payment</span>
              <span>{paymentType === 'online' ? onlineService : 'Cash'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;


