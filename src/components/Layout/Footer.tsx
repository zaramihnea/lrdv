// src/components/Layout/Footer.tsx
import React from 'react';
import '../../styles/components/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-credits">
            <h3 className="footer-title">Literatura Română în Dimensiune Virtuală</h3>
            <p>Concurs național interdisciplinar organizat de Liceul Teoretic de Informatică „Grigore Moisil" Iași</p>
            
            <div className="footer-developers">
              <p className="developers-title">Dezvoltator:</p>
              <p>
                <a href="https://www.linkedin.com/in/zara-mihnea/" target="_blank" rel="noopener noreferrer">
                  Zară Mihnea-Tudor
                </a>
              </p>
            </div>
            
            <p className="copyright">Copyright &copy; {new Date().getFullYear()} · All Rights Reserved.</p>
          </div>
          
          <div className="footer-contact">
            <h3 className="footer-title">Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="contact-text">
                  <p className="institution-name">LICEUL TEORETIC DE INFORMATICĂ „GRIGORE MOISIL" IAŞI</p>
                  <p><strong>Adresa:</strong> Str. Petre Andrei nr. 9</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-text">
                  <p><strong>Telefon/Fax:</strong> 0232-211-826 / 0232-216-290</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-text">
                  <p><strong>E-mail:</strong> licinfoiasi@liis.ro</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="contact-text">
                  <p><strong>Mijloace de transport:</strong> 1, 8, 9, 13, 28, 36, 42, 52</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-icon">❦</div>
        <div className="decoration-line"></div>
      </div>
    </footer>
  );
};

export default Footer;