// Footer.tsx
import React from 'react';
import './Footer.css'; // Import the CSS file

interface FooterProps {
  aboutText: string;
  contactText: string;
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ aboutText, contactText,copyrightText }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Acerca de nosotros</h3>
          <p>{aboutText}</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>{contactText}</p>
        </div>
      </div>
      <div className="copyright">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
