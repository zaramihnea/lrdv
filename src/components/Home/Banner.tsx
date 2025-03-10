// src/components/Home/Banner.tsx
import React from 'react';
import '../../styles/components/banner.css';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <img src="/src/assets/images/banner_test.jpg" alt="Literatura română în dimensiune virtuală" className="banner-image" />
      <div className="banner-overlay">
        <div className="banner-content">
          <h1 className="banner-title">Literatura Română în Dimensiune Virtuală</h1>
          <div className="banner-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-icon">❦</span>
            <span className="decoration-line"></span>
          </div>
          <p className="banner-subtitle">Concurs național interdisciplinar</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;