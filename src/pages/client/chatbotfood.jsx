import React, { useState, useRef, useEffect } from 'react';
import './chatbotfood.css';

const DUMMY_QA = [
  { q: 'How do I see the menu?', a: 'You can see all available food items by navigating to the "Categories" section from the sidebar on the main dashboard.' },
  { q: 'What are the food categories?', a: 'We offer "Indian" and "Nepali" cuisine categories. You can find them on the "Categories" page.' },
  { q: 'How do I place an order?', a: 'First, add items to your cart by clicking on them. Then, open the cart, review your items, and proceed to payment.' },
  { q: 'How can I view my cart?', a: 'Click the shopping basket icon at the top right of the dashboard to open your cart.' },
  { q: 'What payment methods do you accept?', a: 'We accept online payments via eSewa and Khalti, as well as Cash on Delivery (COD).' },
  { q: 'Can I see my past orders?', a: 'Yes, you can view your order history by clicking on the "Orders" section in the sidebar.' },
  { q: 'How do I add an item to my cart?', a: 'From the product list within a category, simply click on the food item you wish to order, and it will be added to your cart.' },
  { q: 'Are there different restaurants to choose from?', a: 'Yes, you can browse different restaurants by clicking on the "Restaurants" section in the sidebar.' },
  { q: 'How do I sign up for an account?', a: 'You can create a new account by clicking the "Sign Up" button on the login page and filling out your details.' },
  { q: 'What if I forget my password?', a: 'On the login page, you can click "Forgot Password" to reset it. (Note: This is a demo, so functionality is limited).' },
  { q: 'How is the total price calculated?', a: 'The total price is the sum of the prices of all items and their quantities in your cart. You can see the total in your cart summary.' },
  { q: 'Can I change the quantity of an item in the cart?', a: 'Yes, inside the cart dialog, you can update the quantity of each item before proceeding to payment.' },
  { q: 'What happens after I place an order?', a: 'After confirming your payment, your order is placed and you will see a success message. You can track its status in the "Orders" section.' },
  { q: 'Is there a way to go back to the previous screen?', a: 'Yes, most sections like "Categories" or "Restaurants" have a "Back" button to return to the previous view.' },
  { q: 'Where can I find more options?', a: 'The "More" section in the sidebar contains links to special menus or partner restaurants like KhanaKhajan and GKFood.' },
  // Project-relevant Q&A additions:
  { q: 'How do I see my purchase trend?', a: 'Go to the "More" section and select "My Purchase Trend" to view your order history as a chart.' },
  { q: 'How do I get bill confirmation?', a: 'After you mark an order as received, a detailed bill is sent to your email automatically.' },
  { q: 'How do I use the chatbot?', a: 'Click the chat icon at the bottom right of the screen to open the chatbot and ask any question about BhokBhoj.' },
  { q: 'How do I enable dark mode?', a: 'Go to App Settings in the More section and toggle Dark Mode.' },
  { q: 'How do I contact support?', a: 'Use the Help & Support section in the More menu or email support@BhokBhoj.com.' },
  { q: 'Can I use fingerprint login?', a: 'Yes, on supported devices, you can enable fingerprint login in the app settings.' },
  { q: 'How do I refresh the dashboard?', a: 'Shake your device or pull down to refresh the dashboard and see the latest updates.' },
  { q: 'What is Khana Khajan?', a: 'Khana Khajan is a special section with Nepali recipes and food facts. Find it in the More menu.' },
  { q: 'How do I see the latest restaurants?', a: 'The dashboard shows a notification banner for the latest added restaurant, category, and food item.' },
  { q: 'How do I logout?', a: 'Click the logout button in the More section or in the sidebar to securely log out.' },
];

function getBotReply(userMsg) {
  const normalizedUserMsg = userMsg.toLowerCase().trim().replace(/[?.!]$/, '');
  const found = DUMMY_QA.find(
    (qa) => qa.q.toLowerCase().trim().replace(/[?.!]$/, '') === normalizedUserMsg
  );
  if (found) {
    return found.a;
  }
  return "Sorry, I'm a demo bot! Please contact support for more help.";
}

function getRandomExamples() {
  const shuffled = [...DUMMY_QA].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map(qa => qa.q.replace(/\?$/, ''));
}

export default function ChatbotFood() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 I am your BhokBhoj assistant. Ask me anything about food, orders, or the app!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [examples, setExamples] = useState(getRandomExamples());
  const [botAnim, setBotAnim] = useState(false);

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
    setBotAnim(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: getBotReply(userMsg) }]);
      setLoading(false);
      setExamples(getRandomExamples()); // swap questions after each answer
      setBotAnim(false);
    }, 1200);
    setInput('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chatbot-food-root" style={{background:'linear-gradient(135deg,#fffbe7 0%,#ffe3d1 100%)'}}>
      {open && (
        <div className="chatbot-food-window" style={{background:'linear-gradient(135deg,#f8f9fa 0%,#e0c3fc 100%)',boxShadow:'0 10px 40px #a18cd144'}}>
          <div className="chatbot-food-header" style={{display:'flex',alignItems:'center',gap:10}}>
            <span role="img" aria-label="bot" style={{fontSize:'2rem',animation:botAnim?'bot-bounce 0.7s':''}}>🤖</span>
            <span style={{fontWeight:800,letterSpacing:'0.5px',fontSize:'1.1rem',color:'#7b1fa2'}}>BhokBhoj Chatbot</span>
            <button className="chatbot-food-close" onClick={() => setOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-food-messages" style={{background:'rgba(255,255,255,0.7)',backdropFilter:'blur(4px)'}}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-food-msg chatbot-food-msg-${msg.from}`} style={{position:'relative'}}>
                {msg.from==='bot' && <span style={{position:'absolute',left:-14,bottom:0,fontSize:'1.5rem',color:'#eef1f5'}}>◀</span>}
                {msg.text}
                {msg.from==='user' && <span style={{position:'absolute',right:-14,bottom:0,fontSize:'1.5rem',color:'#ffb347'}}>▶</span>}
              </div>
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
          <div className="chatbot-food-default-questions" style={{background:'linear-gradient(90deg,#fffbe7 0%,#ffe3d1 100%)'}}>
            <p style={{color:'#b71c1c',fontWeight:600}}>Or, try one of these:</p>
            {examples.map((qa, i) => (
              <button
                key={i}
                className="chatbot-food-default-q"
                onClick={() => setInput(qa)}
                disabled={loading}
              >
                {qa}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="chatbot-food-toggle" onClick={() => setOpen(o => !o)}>
        <span role="img" aria-label="chat">💬</span>
      </button>
      <style>{`
        @keyframes bot-bounce {
          0% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
          60% { transform: translateY(0); }
          80% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


