import React from 'react';

const Card = ({ children, className = '', withShadow = true }) => {
  return (
    <div className={`bg-white border-luxury ${withShadow ? 'shadow-soft' : ''} p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
