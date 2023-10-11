import React from 'react';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <button className="card-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;