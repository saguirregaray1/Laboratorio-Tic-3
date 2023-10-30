import React from 'react';

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
    <button className="card-button" style={buttonStyle} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default CustomButton;