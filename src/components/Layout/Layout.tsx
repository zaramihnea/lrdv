// src/components/Layout/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/components/layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  /*const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }; */

  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      {/* {showScrollTop && (
  <button 
    className="scroll-to-top" 
    onClick={scrollToTop}
    aria-label="Scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </button>
)} */}
    </div>
  );
};

export default Layout;