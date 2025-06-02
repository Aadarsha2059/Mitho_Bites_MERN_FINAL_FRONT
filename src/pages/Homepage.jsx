import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { FaSearch } from 'react-icons/fa';
import './Homepage.css';
import HomepageBody from '../components/HomepageBody';

const Homepage = () => {
  return (
    <div className="homepage">
      <Header />
      <HomepageBody/>
      
      <Footer />
    </div>
  );
};

export default Homepage;
