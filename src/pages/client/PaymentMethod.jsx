// Updated Mitho Bites Payment Methods Component (Enhanced JSX Version)
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaMoneyBillWave, FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import smileImg from '../../assets/favorites_btn_2.png';
import './PaymentMethod.css';

function PaymentMethod({ onClose }) {
  const { cart, clearCart, getCartTotal, placeOrder } = useCart();
  const [paymentType, setPaymentType] = useState('online');
  const [onlineService, setOnlineService] = useState('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);

  const handlePayment = function (e) {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      setShowDialog(true);
      placeOrder({
        items: cart,
        total: getCartTotal(),
        paymentType,
        paymentService: paymentType === 'online' ? onlineService : 'cash',
      });
      clearCart();
      setTimeout(() => {
        setShowDialog(false);
        setShowCallDialog(true);
        setTimeout(() => {
          setShowCallDialog(false);
          setPaymentComplete(false);
          if (onClose) onClose();
        }, 5000);
      }, 3000);
    }, 2000);
  };

  const closeDialog = () => setShowDialog(false);

  if (paymentComplete) {
    return (
      <div className="payment-modal-bg">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your Mitho Bites food order has been confirmed.</p>
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
      </div>
    );
  }

  return (
    <div className="payment-modal-bg">
      <button className="modal-close-btn" onClick={onClose}>×</button>
      <div className="payment-modal-container">
        <div className="payment-modal-left">
          <h1 className="payment-title">Payment Methods</h1>
          <p className="payment-desc">Secure your Mitho Bites order now</p>
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
                <label>Food Item</label>
                <input type="text" placeholder="Mitho Chicken Mo:Mo" className="form-input" required />
              </div>
              <div>
                <label>Quantity</label>
                <input type="number" placeholder="2" className="form-input" required />
              </div>
            </div>
            <div className="payment-form-row">
              <div style={{ width: '100%' }}>
                <label>Total Price (NPR)</label>
                <input type="number" placeholder="900" className="form-input" required />
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
            <div className="summary-row"><span>Food Item</span><span>Mo:Mo</span></div>
            <div className="summary-row"><span>Quantity</span><span>2</span></div>
            <div className="summary-row"><span>Total</span><span>NPR 900</span></div>
            <div className="summary-row"><span>Payment</span><span>{paymentType === 'online' ? onlineService : 'Cash'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
