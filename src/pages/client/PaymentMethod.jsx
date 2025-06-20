// Updated Mitho Bites Payment Methods Component (Enhanced JSX Version)
import React, { useState } from 'react';
import './PaymentMethod.css';

function PaymentMethod() {
  const [paymentType, setPaymentType] = useState('online');
  const [onlineService, setOnlineService] = useState('esewa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handlePayment = function (e) {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      setShowDialog(true);
    }, 3000);
  };

  const closeDialog = () => setShowDialog(false);

  if (paymentComplete) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your Mitho Bites food order has been confirmed.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-mono text-lg font-semibold">#MB-NEPAL-2025-001</p>
          </div>
          <button onClick={() => { setPaymentComplete(false); setShowDialog(false); }} className="w-full btn-primary online">
            Order More Deliciousness
          </button>
        </div>

        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>😋 Bhok Lageko Cha??</h2>
              <p>Your foods will be delivered soon!</p>
              <button className="btn-close" onClick={closeDialog}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Methods</h1>
          <p className="text-gray-600 text-lg">Secure your Mitho Bites order now</p>
          <div className="flex items-center justify-center mt-3 space-x-2 text-sm text-gray-500">
            <span className="text-green-600">🔒</span>
            <span>SSL Secured</span>
          </div>
        </div>

        <form onSubmit={handlePayment} className="bg-white rounded-2xl shadow-xl p-8 form-area">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Payment Method</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="form-input"
            >
              <option value="online">Online Payment</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {paymentType === 'online' && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Choose Payment Service</label>
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

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Food Item</label>
              <input type="text" placeholder="Mitho Chicken Mo:Mo" className="form-input" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Quantity</label>
              <input type="number" placeholder="2" className="form-input" required />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-1">Total Price (NPR)</label>
            <input type="number" placeholder="900" className="form-input" required />
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
    </div>
  );
}

export default PaymentMethod;
