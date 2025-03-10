// src/components/UI/Navigation.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/navigation.css';

interface NavigationProps {
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ mobileMenuOpen, closeMobileMenu }) => {
  const navItems = [
    { path: '/', label: 'Acasă' },
    { path: '/reconstituiri', label: 'Reconstituiri' },
    { path: '/impact-cultural', label: 'Impact cultural' },
    { path: '/destin-literar', label: 'Destin literar' },
    { path: '/pecetile-traditiei', label: 'Pecețile tradiției' },
    { path: '/literatura-la-zi', label: 'Literatura la zi' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="mobile-nav-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                  end={item.path === '/'}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;