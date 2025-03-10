// src/components/UI/QuickLinks.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/components/quick-links.css';

interface QuickLink {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string;
}

const QuickLinks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show quick links after scrolling past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close the panel after navigating
      setIsOpen(false);
    }
  };
  
  // Quick links data with Font Awesome icons
  const links: QuickLink[] = [
    {
        id: 'inscriere',
        label: 'Înscriere',
        color: 'var(--color-inscriere)',
        icon: <i className="fas fa-pen-to-square"></i>
    },
    {
      id: 'echipaje',
      label: 'Echipaje',
      color: 'var(--color-echipaje)',
      icon: <i className="fas fa-users"></i>
    },
    {
        id: 'organizare',
        label: 'Organizare',
        color: 'var(--color-organizare)',
        icon: <i className="fas fa-university"></i>
    },
    {
      id: 'evaluare',
      label: 'Evaluare',
      color: 'var(--color-evaluare)',
      icon: <i className="fas fa-check-circle"></i>
    },
    {
      id: 'rezultate',
      label: 'Rezultate',
      color: 'var(--color-rezultate)', 
      icon: <i className="fas fa-chart-bar"></i>
    }
  ];

  return (
    <div className={`quick-links-container ${isVisible ? 'visible' : ''}`}>
      <div className="quick-links-button">
        <button 
          className="quick-button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Navigare rapidă"
        >
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-plus"></i>}
        </button>
        <div className={`quick-links-panel ${isOpen ? 'open' : ''}`}>
          <div className="quick-links-header">
            <h3>Navigare Rapidă</h3>
          </div>
          <ul className="quick-links-list">
            {links.map((link) => (
              <li key={link.id} className="quick-link-item">
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="quick-link-button"
                  style={{ '--link-color': link.color } as React.CSSProperties}
                >
                  <span className="quick-link-icon">{link.icon}</span>
                  <span className="quick-link-label">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;