import React from 'react';

import Footer from '../layouts/Footer';
import './Homepage.css';
import HomepageBody from '../components/HomepageBody';
import HomepageHeader from '../layouts/HomepageHeader';

const Homepage = () => {
  return (
    <div className="homepage">
      <HomepageHeader />
      <main style={{ marginTop: '70px', flex: 1 }}>
        <HomepageBody />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
