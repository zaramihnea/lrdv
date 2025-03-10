import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ReconstituiriPage from './pages/ReconstituiriPage';
import ImpactCulturalPage from './pages/ImpactCulturalPage';
import DestinLiterarPage from './pages/DestinLiterarPage';
import PecetileTraditionPage from './pages/PecetileTraditionPage';
import LiteraturaLaZiPage from './pages/LiteraturaLaZiPage';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reconstituiri" element={<ReconstituiriPage />} />
          <Route path="/impact-cultural" element={<ImpactCulturalPage />} />
          <Route path="/destin-literar" element={<DestinLiterarPage />} />
          <Route path="/pecetile-traditiei" element={<PecetileTraditionPage />} />
          <Route path="/literatura-la-zi" element={<LiteraturaLaZiPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;