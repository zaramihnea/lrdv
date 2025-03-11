// src/components/UI/Navigation.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/components/navigation.css';

interface NavigationProps {
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

interface NavItem {
  path: string;
  label: string;
  sectionId?: string;
}

const Navigation: React.FC<NavigationProps> = ({ mobileMenuOpen, closeMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('intro');
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const navItems: NavItem[] = [
    { path: '/', label: 'Prezentare', sectionId: 'intro' },
    { path: '/sectiuni', label: 'Secțiuni', sectionId: 'sectiuni' },
    { path: '/inscriere', label: 'Înscriere', sectionId: 'inscriere' },
    { path: '/echipaje', label: 'Echipaje', sectionId: 'echipaje' },
    { path: '/organizare', label: 'Organizare', sectionId: 'organizare' },
    { path: '/evaluare', label: 'Evaluare', sectionId: 'evaluare' },
    { path: '/rezultate', label: 'Rezultate', sectionId: 'rezultate' },
  ];

  useEffect(() => {
    if (location.pathname !== '/') return;

    setActiveSection('intro');

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0.1
    };

    let timeout: NodeJS.Timeout | null = null;
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            setActiveSection(entry.target.id || 'intro');
          }, 50);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
      observer.observe(introSection);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location.pathname]);
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const firstNavItem = navRef.current.querySelector('.nav-item:first-child');
    if (firstNavItem) {
      const firstLink = firstNavItem.querySelector('a');
      if (firstLink) {
        const { width } = firstLink.getBoundingClientRect();
        indicatorRef.current.style.width = `${width}px`;
        indicatorRef.current.style.transform = 'translateX(0)';
      }
    }
  }, []);

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current || !document.body.contains(navRef.current)) return;
    
    const activeIndex = navItems.findIndex(item => (item.sectionId || '') === activeSection);
    if (activeIndex === -1) return;
    
    const activeItem = navRef.current.querySelector(`.nav-item:nth-child(${activeIndex + 1})`);
    
    if (activeItem) {
      const activeLink = activeItem.querySelector('a');
      if (activeLink) {
        requestAnimationFrame(() => {
          if (!navRef.current || !indicatorRef.current) return;
          
          const { left, width } = activeLink.getBoundingClientRect();
          const navLeft = navRef.current.getBoundingClientRect().left;
          
          indicatorRef.current.style.width = `${width}px`;
          indicatorRef.current.style.transform = `translateX(${left - navLeft}px)`;
        });
      }
    }
  }, [activeSection, navItems]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    closeMobileMenu();
    if (location.pathname === '/') {
      scrollToSection(item.sectionId);
    } else {
      navigate('/', { replace: true });
      setTimeout(() => {
        scrollToSection(item.sectionId);
      }, 100);
    }
  };

  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) return;
    
    if (sectionId === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: NavItem) => {
    if (location.pathname !== '/') {
      return false;
    }
    
    return activeSection === (item.sectionId || '');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-list" ref={navRef}>
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <a
                href={item.sectionId ? `/#${item.sectionId === 'intro' ? '' : item.sectionId}` : item.path}
                className={isActive(item) ? 'nav-link active' : 'nav-link'}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            </li>
          ))}
          {/* Animated underline indicator */}
          <div className="nav-indicator" ref={indicatorRef}></div>
        </ul>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="mobile-nav-item">
                <a
                  href={item.sectionId ? `/#${item.sectionId === 'intro' ? '' : item.sectionId}` : item.path}
                  className={isActive(item) ? 'mobile-nav-link active' : 'mobile-nav-link'}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;