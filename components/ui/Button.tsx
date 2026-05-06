import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full text-xs uppercase tracking-luxury font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-ivory hover:bg-accent hover:shadow-luxury",
    secondary: "bg-secondary text-ivory hover:bg-secondary/90 shadow-soft",
    outline: "border border-primary text-primary hover:bg-primary hover:text-ivory",
    ghost: "bg-transparent text-secondary hover:text-primary px-0"
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
