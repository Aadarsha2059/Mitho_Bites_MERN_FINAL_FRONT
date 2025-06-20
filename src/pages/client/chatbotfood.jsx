import React, { useState, useRef, useEffect } from 'react';
import './chatbotfood.css';

const DUMMY_QA = [
  { q: 'What is Mitho Bites?', a: 'Mitho Bites is a modern food delivery platform bringing delicious food to your doorstep.' },
  { q: 'How do I place an order?', a: 'Browse the menu, add items to your cart, and proceed to checkout!' },
  { q: 'What payment methods are accepted?', a: 'We accept cards, e-wallets, and cash on delivery.' },
  { q: 'How can I contact support?', a: 'You can use this chatbot or visit our Contact page for more help.' },
  { q: 'Is there a delivery charge?', a: 'Delivery charges may apply based on your location and order value.' },
  { q: 'How do I track my order?', a: 'Go to your dashboard and check the Orders section for real-time updates.' },
  { q: 'Can I cancel my order?', a: 'Orders can be cancelled before they are prepared. Visit Orders and select Cancel.' },
  { q: 'How do I reset my password?', a: 'Click on Forgot Password on the login page and follow the instructions.' },
  { q: 'Do you offer vegetarian options?', a: 'Yes! We have a wide range of vegetarian and vegan dishes.' },
  { q: 'Are there any discounts or offers?', a: 'Check the Offers section on the homepage for the latest deals.' },
  { q: 'How do I become a delivery partner?', a: 'Visit our Careers page or contact support for partnership details.' },
  { q: 'Can I schedule an order?', a: 'Yes, you can choose a delivery time during checkout.' },
  { q: 'What areas do you deliver to?', a: 'We deliver to most areas in the city. Enter your address to check availability.' },
  { q: 'How do I add a new address?', a: 'Go to your profile and select Manage Addresses to add or edit locations.' },
  { q: 'Is my payment information secure?', a: 'Absolutely! We use industry-standard encryption for all transactions.' },
  { q: 'Can I order from multiple restaurants?', a: 'Currently, each order can be placed from one restaurant at a time.' },
  { q: 'How do I leave a review?', a: 'After your order is delivered, you can rate and review from the Orders section.' },
  { q: 'What if my food is late?', a: 'We apologize! Please check the order status or contact support for help.' },
  { q: 'Do you have a mobile app?', a: 'Our mobile app is coming soon! For now, enjoy our responsive website.' },
  { q: 'How do I apply a promo code?', a: 'Enter your promo code at checkout to get instant discounts.' },
  { q: 'Can I reorder previous meals?', a: 'Yes! Go to Orders and click Reorder on your favorite meals.' },
  { q: 'What cuisines are available?', a: 'We offer Nepali, Indian, Chinese, Continental, and more.' },
  { q: 'How do I change my profile picture?', a: 'Go to your profile and click on the avatar to upload a new photo.' },
  { q: 'What is the minimum order amount?', a: 'The minimum order amount varies by restaurant. Check the menu for details.' },
  { q: 'How do I report a problem with my order?', a: 'Use the Help section in Orders or contact support directly.' },
  { q: 'Can I tip the delivery person?', a: 'Yes, you can add a tip during checkout or after delivery.' },
  { q: 'How do I get a refund?', a: 'Refunds are processed for eligible issues. Contact support with your order details.' },
  { q: 'Do you offer group orders?', a: 'Group ordering is coming soon! Stay tuned for updates.' },
  { q: 'How do I delete my account?', a: 'Contact support to request account deletion. We\'ll assist you promptly.' },
  { q: 'Is there a loyalty program?', a: 'Yes! Earn points on every order and redeem them for rewards.' }
];

function getBotReply(userMsg) {
  const found = DUMMY_QA.find(qa => userMsg.toLowerCase().includes(qa.q.toLowerCase().split(' ')[0]));
  if (found) return found.a;
  return "Sorry, I'm a demo bot! Please contact support for more help.";
}

function getRandomExamples() {
  // Pick 3-4 random questions for the hint
  const shuffled = [...DUMMY_QA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map(qa => qa.q.replace(/\?$/, '')); // Remove trailing ? for hint
}

export default function ChatbotFood() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I am your Mitho Bites assistant. Ask me anything about food, orders, or the app!' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const [examples, setExamples] = useState(getRandomExamples());

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) setExamples(getRandomExamples());
  }, [open]);

  const handleSend = (customInput) => {
    const userMsg = (customInput !== undefined ? customInput : input).trim();
    if (!userMsg) return;
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: getBotReply(userMsg) }]);
    }, 700);
    setInput('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-food-root">
      {open && (
        <div className="chatbot-food-window">
          <div className="chatbot-food-header">
            <span role="img" aria-label="bot">🤖</span> Mitho Bites Chatbot
            <button className="chatbot-food-close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-food-default-questions">
            {DUMMY_QA.map((qa, i) => (
              <button
                key={i}
                className="chatbot-food-default-q"
                onClick={() => handleSend(qa.q)}
              >
                {qa.q}
              </button>
            ))}
          </div>
          <div className="chatbot-food-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-food-msg chatbot-food-msg-${msg.from}`}>{msg.text}</div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-food-input-row">
            <input
              className="chatbot-food-input"
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chatbot-food-send" onClick={() => handleSend()}>Send</button>
          </div>
          <div className="chatbot-food-hint">
            <span>Try asking: </span>
            {examples.map((ex, i) => (
              <span key={i} className="chatbot-food-hint-q">{ex}{i < examples.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        </div>
      )}
      <button className="chatbot-food-toggle" onClick={() => setOpen(o => !o)}>
        <span role="img" aria-label="chat">💬</span>
      </button>
    </div>
  );
} 