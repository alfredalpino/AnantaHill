"use client";

import { Plus, Minus, Users } from 'lucide-react';

interface GuestCounterProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

const GuestCounter = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  label = "Guests",
  className = "" 
}: GuestCounterProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1 flex items-center gap-2">
          <Users size={12} className="text-primary" />
          {label}
        </label>
      )}
      <div className="flex items-center justify-between bg-cream border border-border rounded-2xl px-6 py-4 mt-1">
        <button 
          type="button"
          onClick={decrement}
          className={`w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-ivory active:scale-90 ${value <= min ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <Minus size={16} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-secondary font-bold">{value} {value === 1 ? 'Guest' : 'Guests'}</span>
        </div>

        <button 
          type="button"
          onClick={increment}
          className={`w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-ivory active:scale-90 ${value >= max ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;
