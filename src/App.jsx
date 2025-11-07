import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Joyride from 'react-joyride';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const steps = [
    {
      target: '.dashboard-header-title',
      title: 'Welcome to BhokBhoj!',
      content: (
        <div style={{textAlign: 'center'}}>
          <span role="img" aria-label="food" style={{fontSize: 32}}>🍽️</span>
          <div style={{fontWeight: 'bold', fontSize: 18, marginTop: 8}}>Delicious food, fast delivery.</div>
        </div>
      ),
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.dashboard-header-search',
      title: 'Smart Search',
      content: 'Quickly find your favorite foods and restaurants using our smart search bar.',
      placement: 'bottom',
    },
    {
      target: '.dashboard-header-user',
      title: 'Personalized Experience',
      content: 'See your profile, access admin panel (if admin), and start the app tour anytime!',
      placement: 'bottom',
    },
    {
      target: '.onboarding-btn',
      title: 'App Tour',
      content: 'Click here anytime to revisit this onboarding tour and discover features!',
      placement: 'bottom',
    },
    {
      target: '.dashboard-search-input',
      title: 'Live Search',
      content: 'Type to filter foods and restaurants instantly.',
      placement: 'bottom',
    },
    // Add more steps for menu, cart, etc. as needed
  ];

  return (
    <Router>
      <Joyride
        steps={steps}
        run={showOnboarding}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#ff6b35',
            textColor: '#222',
            backgroundColor: '#fff8f0',
            arrowColor: '#ffd166',
            overlayColor: 'rgba(255,107,53,0.08)',
          },
          buttonNext: { background: 'linear-gradient(90deg, #ff6b35 0%, #ffd166 100%)', color: '#fff', fontWeight: 'bold' },
          buttonBack: { color: '#ff6b35' },
          buttonSkip: { color: '#1976d2' },
        }}
        callback={data => {
          if (data.status === 'finished' || data.status === 'skipped') {
            setShowOnboarding(false);
          }
        }}
      />
      <Header onShowOnboarding={() => setShowOnboarding(true)} />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Menu />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
