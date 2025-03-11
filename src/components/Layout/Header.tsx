// src/components/Layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../UI/Navigation';
import '../../styles/components/header.css';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <a href="https://www.liis.ro/" target="_blank" rel="noopener noreferrer">
            <img src="/images/logo.png" alt="LIIS Logo" className="logo" />
          </a>
        </div>

        <Navigation mobileMenuOpen={mobileMenuOpen} closeMobileMenu={closeMobileMenu} />

        <div className="header-actions">
          <a 
            href="https://forms.gle/5GPEu4GWnpxjbghd9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inscription-button"
          >
            Înscriere
          </a>
          <button 
            className="menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;