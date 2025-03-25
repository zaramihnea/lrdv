import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import './styles/global.css';

// ScrollToTop component for route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to top when path changes
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App: React.FC = () => {
  // Track if this is the initial load
  const isFirstLoad = useRef(true);

  // Force scroll to top on initial load with a short delay
  useEffect(() => {
    if (isFirstLoad.current) {
      // Immediate scroll
      window.scrollTo(0, 0);
      
      // Also scroll after a short delay to override any other scripts
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        isFirstLoad.current = false;
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;