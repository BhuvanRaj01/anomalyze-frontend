import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ openModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleModalLinkClick = (modalName) => {
    openModal(modalName);
    setIsOpen(false);
  };

  const handleScrollLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
         <img src="/logo.png" alt="Anomalise Logo" className="logo-icon" />
          ANOMALISE
        </a>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="#services" className="nav-links" onClick={handleScrollLinkClick}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => handleModalLinkClick('howItWorks')}>
              How It Works
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-links" onClick={() => handleModalLinkClick('whyUs')}>
              Why Us
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;