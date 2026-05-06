"use client";

import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | { label: string; value: string }[];
  label?: string;
  className?: string;
  icon?: ReactNode;
  variant?: 'full' | 'rounded';
}

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  label, 
  className = "", 
  icon,
  variant = 'rounded'
}: CustomSelectProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1 flex items-center gap-2">
          {icon}
          {label}
        </label>
      )}
      <div className="relative group">
        <select 
          value={value}
          onChange={onChange}
          className={`
            w-full appearance-none cursor-pointer focus:outline-none focus:border-primary transition-all
            bg-cream border border-border text-secondary font-medium
            ${variant === 'full' ? 'rounded-full px-8 py-3 text-xs uppercase tracking-widest font-bold' : 'rounded-2xl px-6 py-4 text-sm'}
          `}
        >
          {options.map((opt) => {
            const labelStr = typeof opt === 'string' ? opt : opt.label;
            const valueStr = typeof opt === 'string' ? opt : opt.value;
            return (
              <option key={valueStr} value={valueStr} className="bg-ivory text-secondary">
                {labelStr}
              </option>
            );
          })}
        </select>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60 group-hover:text-primary transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
