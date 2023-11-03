import React from 'react';
import './customButton.css'

interface CustomButtonProps {
  label: string;
  color: string;
  isDisabled: boolean;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, color, isDisabled}) => {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button className="card-button" onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default CustomButton;