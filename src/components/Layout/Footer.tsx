// src/components/Layout/Footer.tsx
import React from 'react';
import '../../styles/components/footer.css';

const Footer: React.FC = () => {
  // Function to open Google Maps with the address
  const openGoogleMaps = () => {
    // Encode the address for URL
    const encodedAddress = encodeURIComponent('Liceul Teoretic de Informatică Grigore Moisil, Strada Petre Andrei 9, Iași, Romania');
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

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
                  <i className="fas fa-building"></i>
                </div>
                <div className="contact-text">
                  <p className="institution-name">LICEUL TEORETIC DE INFORMATICĂ „GRIGORE MOISIL" IAŞI</p>
                  <p>
                    <strong>Adresa: </strong>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        openGoogleMaps();
                      }}
                      className="contact-link"
                      title="Deschide în Google Maps"
                    >
                      Str. Petre Andrei nr. 9
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-text">
                  <p>
                    <strong>Telefon/Fax: </strong>
                    <a href="tel:0232-211-826" className="contact-link" title="Apelează">
                      0232-211-826
                    </a> / 
                    <a href="tel:0232-216-290" className="contact-link" title="Apelează">
                      0232-216-290
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <p>
                    <strong>E-mail: </strong>
                    <a href="mailto:licinfoiasi@liis.ro" className="contact-link" title="Trimite email">
                      licinfoiasi@liis.ro
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-bus"></i>
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