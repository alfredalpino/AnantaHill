import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out rounded-[4px] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border border-gold text-gold bg-transparent hover:bg-gold hover:text-black",
    secondary: "bg-black text-white hover:bg-charcoal",
    outline: "border border-[rgba(200,169,106,0.2)] text-text-primary hover:border-gold hover:text-gold"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
