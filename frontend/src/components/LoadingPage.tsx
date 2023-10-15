import React from 'react';
import logo from '../assets/loading_logo.png';
import './LoadingPage.css';

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-container">
        <img src={logo} alt="Loading" className="loading-image" />
    </div>
  );
};

export default LoadingPage;