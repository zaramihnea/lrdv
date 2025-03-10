// src/components/Home/Banner.tsx
import React, { useRef } from 'react';
import '../../styles/components/banner.css';

const Banner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="banner" ref={bannerRef}>
      <div className="banner-image-container">
        <img
          src="/src/assets/images/banner_test.jpg"
          alt="Literatura română în dimensiune virtuală"
          className="banner-image"
        />
      </div>
      <div className="banner-overlay">
        <div className="banner-content">
          <h1 className="banner-title animate-on-load">
            <span className="title-word">Literatura</span>
            <span className="title-word">Română</span>
            <span className="title-word">în</span>
            <span className="title-word">Dimensiune</span>
            <span className="title-word">Virtuală</span>
          </h1>
          <div className="banner-decoration animate-on-load" style={{ animationDelay: '0.5s' }}>
            <span className="decoration-line"></span>
            <span className="decoration-icon">❦</span>
            <span className="decoration-line"></span>
          </div>
          <p className="banner-subtitle animate-on-load" style={{ animationDelay: '0.7s' }}>
            Concurs național interdisciplinar
          </p>

          <div className="banner-cta animate-on-load" style={{ animationDelay: '0.9s' }}>
            <button onClick={() => {
              const introSection = document.querySelector('.intro-section');
              if (introSection) {
                introSection.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="cta-button">
              Descoperă mai multe
              <svg className="cta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5"></path>
                <path d="M7 6l5 5 5-5"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;