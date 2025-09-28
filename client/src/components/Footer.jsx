import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-content-wrapper">
        <div className="footer-container">
          <div className="footer-links">
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/disclosure" className="footer-link">Responsible Disclosure</a>
            <a href="mailto:contact@anomalise.com" className="footer-link">contact@anomalise.com</a>
          </div>
          <div className="footer-copyright">
            &copy; {currentYear} Anomalise. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;