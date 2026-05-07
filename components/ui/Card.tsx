import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  withShadow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', withShadow = true }) => {
  return (
    <div className={`bg-ivory border border-border rounded-md ${withShadow ? 'shadow-luxury' : ''} p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
