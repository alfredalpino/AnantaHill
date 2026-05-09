"use client";

import { Plus, Minus, Users } from 'lucide-react';

interface GuestCounterProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  variant?: 'default' | 'booking-bar' | 'booking-form';
}

const GuestCounter = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  label = "Guests",
  className = "",
  variant = 'default'
}: GuestCounterProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  if (variant === 'booking-bar') {
    return (
      <div className={`flex items-center justify-between px-4 bg-white/5 border border-white/10 rounded-xl ${className}`}>
        <button 
          type="button"
          onClick={decrement}
          className={`text-white/40 hover:text-white transition-colors ${value <= min ? 'opacity-20 cursor-not-allowed' : ''}`}
        >
          <Minus size={16} />
        </button>
        
        <span className="font-bold text-sm text-white">{value}</span>

        <button 
          type="button"
          onClick={increment}
          className={`text-white/40 hover:text-white transition-colors ${value >= max ? 'opacity-20 cursor-not-allowed' : ''}`}
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }

  if (variant === 'booking-form') {
    return (
      <div className={`flex items-center justify-between px-6 py-4 bg-white border border-secondary rounded-2xl ${className}`}>
        <button 
          type="button"
          onClick={decrement}
          className={`text-text-muted hover:text-text-primary transition-colors ${value <= min ? 'opacity-20 cursor-not-allowed' : ''}`}
        >
          <Minus size={20} />
        </button>
        
        <span className="font-bold text-lg text-text-primary">{value}</span>

        <button 
          type="button"
          onClick={increment}
          className={`text-text-muted hover:text-text-primary transition-colors ${value >= max ? 'opacity-20 cursor-not-allowed' : ''}`}
        >
          <Plus size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="field-label ml-1 flex items-center gap-2">
          <Users size={12} className="text-primary-dark" />
          {label}
        </label>
      )}
      <div className="flex items-center justify-between bg-white border border-secondary rounded-2xl px-6 py-4 mt-1">
        <button 
          type="button"
          onClick={decrement}
          className={`w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary-dark transition-all hover:bg-primary-dark hover:text-white active:scale-90 ${value <= min ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <Minus size={16} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-text-primary font-bold">{value} {value === 1 ? 'Guest' : 'Guests'}</span>
        </div>

        <button 
          type="button"
          onClick={increment}
          className={`w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary-dark transition-all hover:bg-primary-dark hover:text-white active:scale-90 ${value >= max ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;
