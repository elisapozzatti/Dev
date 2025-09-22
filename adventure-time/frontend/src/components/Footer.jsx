import React from 'react';
import SocialIcons from './SocialIcons';
import "./Footer.css";
 
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-grid">
            
            <div>
              <div className="logo-section">
                
                <div className="social-icons">
                <SocialIcons />
                </div>
              </div>
            </div>

            <div>
              <h3>Contattaci</h3>
              <ul>
                <li><a href="#">Servizi</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </div>

            <div>
              <h3>Contattaci</h3>
              <ul>
                <li><a href="#">Servizi</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </div>

            <div>
              <h3>Contattaci</h3>
              <ul>
                <li><a href="#">Servizi</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-left">
              <li><a href="#">Termini e condizioni</a></li>
              <li><a href="#">Informativa privacy</a></li>
              <li><a href="#">Gestisci cookie</a></li>
            </div>
            <p className="footer-right">© 2025 CareHub</p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;