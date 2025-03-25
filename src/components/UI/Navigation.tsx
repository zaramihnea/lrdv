// src/components/UI/Navigation.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';
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
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const isPositionedRef = useRef(false);
  
  // Filter out hidden sections from the navigation
  const navItems: NavItem[] = [
    { path: '/', label: 'Prezentare', sectionId: 'intro' },
    { path: '/sectiuni', label: 'Secțiuni', sectionId: 'sectiuni' },
    { path: '/inscriere', label: 'Înscriere', sectionId: 'inscriere' },
    { path: '/echipaje', label: 'Echipaje', sectionId: 'echipaje' },
    { path: '/organizare', label: 'Organizare', sectionId: 'organizare' },
    { path: '/evaluare', label: 'Evaluare', sectionId: 'evaluare' },
    { path: '/rezultate', label: 'Rezultate', sectionId: 'rezultate' },
  ].filter(item =>
    !item.sectionId ||
    item.sectionId === 'intro' ||
    item.sectionId === 'sectiuni' ||
    !config.hiddenSections.includes(item.sectionId)
  );
  
  // Monitor header scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
      
      // Ensure "Prezentare" is active when at the top
      if (window.scrollY < 100) {
        setActiveSection('intro');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up section observers
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
      // If we're at the top, always prioritize intro
      if (window.scrollY < 100) {
        setActiveSection('intro');
        return;
      }
      
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

  // FOCUSED FIX: Special handling for the indicator positioning
  useEffect(() => {
    // Hide indicator until properly positioned
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = '0';
      // Disable transitions initially
      indicatorRef.current.style.transition = 'none';
    }

    // Position indicator immediately using explicit first-child targeting
    const positionToFirstItem = () => {
      if (!navRef.current || !indicatorRef.current) return;
      
      const firstNavItem = navRef.current.querySelector('.nav-item:first-child');
      if (firstNavItem) {
        const firstLink = firstNavItem.querySelector('a');
        if (firstLink) {
          const linkRect = firstLink.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          
          indicatorRef.current.style.width = `${linkRect.width}px`;
          indicatorRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        }
      }
    };

    // First position immediately
    positionToFirstItem();
    
    // Use multiple delayed attempts with increasing timeouts
    const timeouts = [10, 50, 100, 300, 500, 1000].map(delay => 
      setTimeout(() => {
        positionToFirstItem();
        
        // Enable transitions and show indicator on the second attempt
        if (delay === 50 && indicatorRef.current) {
          // Force reflow before enabling transitions
          void indicatorRef.current.offsetWidth;
          indicatorRef.current.style.transition = 'transform 0.3s ease, width 0.3s ease, opacity 0.3s ease';
          indicatorRef.current.style.opacity = '1';
        }
        
        // Mark as positioned after all attempts
        if (delay === 1000) {
          isPositionedRef.current = true;
        }
      }, delay)
    );
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Position indicator whenever active section changes
  useEffect(() => {
    if (!isPositionedRef.current) return;
    
    const positionIndicator = () => {
      if (!navRef.current || !indicatorRef.current) return;

      const activeIndex = navItems.findIndex(item => (item.sectionId || '') === activeSection);
      if (activeIndex === -1) return;

      const activeItem = navRef.current.querySelector(`.nav-item:nth-child(${activeIndex + 1})`);
      
      if (activeItem) {
        const activeLink = activeItem.querySelector('a');
        if (activeLink) {
          const linkRect = activeLink.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          
          indicatorRef.current.style.width = `${linkRect.width}px`;
          indicatorRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        }
      }
    };

    positionIndicator();
    
    // Additional positioning after a delay
    const timer = setTimeout(positionIndicator, 100);
    
    return () => clearTimeout(timer);
  }, [activeSection, isHeaderScrolled, navItems]);

  // Add event listeners for layout changes
  useEffect(() => {
    const handleResize = () => {
      // Always position relative to first menu item when at the top
      if (window.scrollY < 100) {
        setActiveSection('intro');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    closeMobileMenu();
    
    if (location.pathname === '/') {
      // For "Prezentare", always scroll to very top (0,0)
      if (item.sectionId === 'intro') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('intro');
      } else {
        scrollToSection(item.sectionId);
      }
    } else {
      navigate('/', { replace: true });
      setTimeout(() => {
        if (item.sectionId === 'intro') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('intro');
        } else {
          scrollToSection(item.sectionId);
        }
      }, 100);
    }
  };

  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) return;

    if (sectionId === 'intro') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('intro');
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
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
          {/* Animated underline indicator - z-index adjusted to ensure it's visible */}
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