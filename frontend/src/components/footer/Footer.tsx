// Footer.tsx
import React from 'react';
import './Footer.css'; // Import the CSS file

interface FooterProps {
  aboutText: string;
  contactText: string;
  servicesText: string;
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({ aboutText, contactText, servicesText, copyrightText }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>{aboutText}</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>{contactText}</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <p>{servicesText}</p>
        </div>
      </div>
      <div className="copyright">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
