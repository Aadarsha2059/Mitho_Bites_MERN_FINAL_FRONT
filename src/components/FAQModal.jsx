import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQModal.css';

const faqData = [
  {
    question: 'How do I place an order?',
    answer: 'You can place an order by browsing our menu, adding items to your cart, and proceeding to checkout. You can search for specific dishes or restaurants, add items to your cart, and complete your order with secure payment options.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple payment methods including cash on delivery, credit/debit cards, and digital wallets like eSewa and Khalti. You can choose your preferred payment method at checkout.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Our average delivery time is 30 minutes. Delivery time may vary based on your location, restaurant preparation time, and current order volume. You can track your order in real-time once it\'s confirmed.'
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Yes, you can cancel your order if it hasn\'t been prepared yet. Please contact our customer support team as soon as possible if you need to cancel your order. Orders that are already being prepared or out for delivery may not be cancellable.'
  },
  {
    question: 'Is there a minimum order amount?',
    answer: 'Minimum order amounts may vary by restaurant. You\'ll see the minimum order requirement when selecting items from a restaurant. We aim to make ordering accessible, so minimum amounts are typically reasonable.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is confirmed, you\'ll receive an order confirmation with tracking details. You can view your order status in your account dashboard under "Orders". We\'ll also send you updates via SMS or email at each stage of your order.'
  },
  {
    question: 'What if I have a complaint or issue with my order?',
    answer: 'If you have any issues with your order, please contact our customer support team immediately. You can reach us through the contact form on our website, email, or phone. We take customer satisfaction seriously and will work to resolve any issues promptly.'
  },
  {
    question: 'Do you deliver to my area?',
    answer: 'We currently deliver within Kathmandu Valley. Please enter your address during checkout to see if we deliver to your location. We\'re continuously expanding our delivery areas, so check back regularly if we don\'t currently serve your area.'
  },
  {
    question: 'Can I schedule an order for later?',
    answer: 'Yes! You can schedule orders for a specific date and time. Simply select your preferred delivery time during checkout. Scheduled orders help you plan ahead for meals, parties, or special occasions.'
  },
  {
    question: 'How do I create an account?',
    answer: 'Creating an account is easy! Click on the "Login" button, then select "Sign Up". You\'ll need to provide your name, email, phone number, and create a password. Once registered, you can enjoy features like order tracking, saved addresses, and order history.'
  }
];

export default function FAQModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Set app element for react-modal accessibility
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      Modal.setAppElement('#root');
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Frequently Asked Questions"
      className="faq-modal"
      overlayClassName="faq-overlay"
      closeTimeoutMS={200}
    >
      <div className="faq-container">
        <button className="faq-close-btn" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Find answers to common questions about BhokBhoj</p>
        </div>

        <div className="faq-content">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

