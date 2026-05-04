import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withShadow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', withShadow = true }) => {
  return (
    <div className={`bg-white border-luxury ${withShadow ? 'shadow-soft' : ''} p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
