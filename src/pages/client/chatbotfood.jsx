import React, { useState, useRef, useEffect } from 'react';
import './chatbotfood.css';

function getRandomExamples() {
  const allQuestions = [
    "What are your most popular dishes?",
    "How do I track my order?",
    "What payment methods do you accept?",
    "Do you offer vegetarian options?",
    "What are your delivery hours?",
    "How long does delivery take?",
    "Can I cancel my order?",
    "Do you have any special offers?",
    "What if my food arrives cold?",
    "How do I contact customer support?",
    "Are your ingredients fresh?",
    "Do you deliver to my area?",
    "What's your return policy?",
    "Do you have gluten-free options?",
    "How do I create an account?"
  ];
  
  // Shuffle and return 6 random questions
  return allQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
}

// Bot reply function with relevant answers
function getBotReply(userMessage) {
  const message = userMessage.toLowerCase();
  
  if (message.includes('popular') || message.includes('best') || message.includes('favorite')) {
    return "Our most popular dishes include Nepali Momo (dumplings), Sel Roti (traditional rice bread), Yomari (sweet dumplings), and Bajeko Sekuwa (grilled meat). These are authentic Nepali delicacies loved by our customers! 🥟🍖";
  }
  
  if (message.includes('track') || message.includes('order status')) {
    return "You can track your order in real-time through our app! Go to 'My Orders' section and you'll see the current status of your order. We also send SMS updates at each stage of delivery. 📱📦";
  }
  
  if (message.includes('payment') || message.includes('pay')) {
    return "We accept multiple payment methods: Cash on Delivery (COD), Credit/Debit cards, Digital wallets (eSewa, Khalti), and Bank transfers. All online payments are secure and encrypted! 💳💸";
  }
  
  if (message.includes('vegetarian') || message.includes('vegan')) {
    return "Yes! We have a wide variety of vegetarian options including vegetable momo, dal bhat, vegetable curries, and traditional Nepali vegetarian dishes. All our vegetarian dishes are clearly marked on the menu! 🥬🥕";
  }
  
  if (message.includes('delivery hours') || message.includes('open')) {
    return "We're open from 10:00 AM to 10:00 PM daily. Delivery is available throughout these hours. For late-night cravings, we have special midnight delivery options on weekends! 🕙🌙";
  }
  
  if (message.includes('delivery time') || message.includes('how long')) {
    return "Standard delivery time is 30-45 minutes within the city. For areas outside the main city, it may take 45-60 minutes. We always try to deliver as fast as possible while ensuring food quality! ⏰🚚";
  }
  
  if (message.includes('cancel') || message.includes('refund')) {
    return "You can cancel your order within 5 minutes of placing it. After that, please contact our customer support. For quality issues, we offer full refunds or replacement orders! 🔄📞";
  }
  
  if (message.includes('offers') || message.includes('discount') || message.includes('promo')) {
    return "We have regular offers! New users get 20% off on their first order. We also have weekend specials, combo deals, and loyalty rewards. Check our app for current promotions! 🎉💰";
  }
  
  if (message.includes('cold') || message.includes('temperature')) {
    return "We use special insulated packaging to keep your food hot and fresh. If your food arrives cold, please contact us immediately and we'll replace it or provide a full refund! 🌡️🔥";
  }
  
  if (message.includes('contact') || message.includes('support') || message.includes('help')) {
    return "You can reach our customer support at: 📞 Phone: +977-1-4XXXXXX 📧 Email: support@mithobites.com 💬 Live chat: Available in our app. We're here to help 24/7! 🛟";
  }
  
  if (message.includes('fresh') || message.includes('ingredients')) {
    return "Absolutely! We use only fresh, locally sourced ingredients. Our vegetables come from local farmers, and meat is sourced from certified suppliers. We never compromise on quality! 🥬🥩";
  }
  
  if (message.includes('deliver') || message.includes('area')) {
    return "We deliver to most areas in Kathmandu Valley and surrounding regions. Enter your address in our app to check if we deliver to your area. We're constantly expanding our delivery zones! 🗺️📍";
  }
  
  if (message.includes('return') || message.includes('policy')) {
    return "If you're not satisfied with your order, contact us within 30 minutes of delivery. We'll replace your order or provide a full refund. Your satisfaction is our priority! ✅🔄";
  }
  
  if (message.includes('gluten') || message.includes('allergy')) {
    return "Yes, we have gluten-free options! Many of our traditional Nepali dishes are naturally gluten-free. Look for the 'GF' symbol on our menu. Please inform us about any allergies when ordering! 🌾❌";
  }
  
  if (message.includes('account') || message.includes('sign up') || message.includes('register')) {
    return "Creating an account is easy! Download our app and click 'Sign Up'. You can register with your phone number or email. It takes just 2 minutes and you'll get exclusive offers! 📱✨";
  }
  
  // Default response for unrecognized questions
  return "I'm here to help with food orders, delivery, payments, and any other questions about Mitho Bites! Feel free to ask about our menu, offers, or how to place an order. What would you like to know? 🤔🍽️";
}

export default function ChatbotFood() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I am your Mitho Bites assistant. Ask me anything about food, orders, or the app!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [examples, setExamples] = useState(getRandomExamples());

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) setExamples(getRandomExamples());
  }, [open]);

  const handleSend = () => {
    const userMsg = input.trim();
    if (!userMsg) return;
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: getBotReply(userMsg) }]);
      setLoading(false);
    }, 1000);
    setInput('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  const handleQuestionClick = (question) => {
    // First, set the question in the input box
    setInput(question);
    
    // Wait a moment for user to see the question, then process it
    setTimeout(() => {
      const userMsg = question.trim();
      if (userMsg) {
        setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
        setLoading(true);
        setTimeout(() => {
          setMessages(msgs => [...msgs, { from: 'bot', text: getBotReply(userMsg) }]);
          setLoading(false);
          // Clear the input after processing
          setInput('');
        }, 1000);
      }
    }, 800); // Increased delay to give user time to see the question
  };

  return (
    <div className="chatbot-food-root">
      {open && (
        <div className="chatbot-food-window">
          <div className="chatbot-food-header">
            <span role="img" aria-label="bot">🤖</span> Mitho Bites Chatbot
            <button className="chatbot-food-close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-food-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-food-msg chatbot-food-msg-${msg.from}`}>{msg.text}</div>
            ))}
            {loading && (
              <div className="chatbot-food-msg chatbot-food-msg-bot">Thinking...</div>
            )}
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
              disabled={loading}
            />
            <button className="chatbot-food-send" onClick={handleSend} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
          <div className="chatbot-food-default-questions">
            <p>Or, click one of these common questions:</p>
            {examples.map((question, i) => (
              <button
                key={i}
                className="chatbot-food-default-q"
                onClick={() => handleQuestionClick(question)}
                disabled={loading}
              >
                {question}
              </button>
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