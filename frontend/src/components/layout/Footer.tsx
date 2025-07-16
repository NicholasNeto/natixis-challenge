import React from 'react';
import './styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Product Catalog. Natixis - Challenge.</p>
      </div>
    </footer>
  );
};

export default Footer;

