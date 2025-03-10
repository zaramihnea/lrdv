// src/components/Home/SectionNavigation.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/components/section-navigation.css';

interface Section {
  id: string;
  label: string;
}

const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  
  const sections: Section[] = [
    { id: 'inscriere', label: 'Înscriere' },
    { id: 'echipaje', label: 'Echipaje' },
    { id: 'organizare', label: 'Organizare' },
    { id: 'evaluare', label: 'Evaluare' },
    { id: 'rezultate', label: 'Rezultate' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      const navigationElement = document.querySelector('.section-navigation');
      
      // Check if navigation should be sticky
      if (navigationElement) {
        const navPosition = navigationElement.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > navPosition - 80) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
      
      // Find the section that is currently in view
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean) as HTMLElement[];
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    setTimeout(handleScroll, 200); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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
    }
  };

  return (
    <nav className={`section-navigation ${isSticky ? 'sticky' : ''}`}>
      <div className="section-nav-container">
        {sections.map((section) => (
          <button 
            key={section.id}
            className={`section-nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SectionNavigation;