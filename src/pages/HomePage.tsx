// src/pages/HomePage.tsx
import React from 'react';
import Banner from '../components/Home/Banner';
import HomeContent from '../components/Home/HomeContent';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Banner />
      <HomeContent />
    </div>
  );
};

export default HomePage;