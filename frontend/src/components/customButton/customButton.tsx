import React from 'react';

interface CustomButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, color}) => {
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button className="card-button" style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;