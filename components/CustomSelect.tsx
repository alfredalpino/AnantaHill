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
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="field-label ml-1 flex items-center gap-2">
          {icon}
          {label}
        </label>
      )}
      <div className="relative group w-full">
        <select 
          value={value}
          onChange={onChange}
          className={`
            w-full appearance-none cursor-pointer focus:outline-none transition-all
            bg-white border border-secondary text-text-primary font-bold
            ${variant === 'full' ? 'rounded-full px-8 py-3 text-xs uppercase tracking-widest' : 'rounded-2xl px-6 py-4 text-sm'}
            ${className}
          `}
        >
          {options.map((opt) => {
            const labelStr = typeof opt === 'string' ? opt : opt.label;
            const valueStr = typeof opt === 'string' ? opt : opt.value;
            return (
              <option key={valueStr} value={valueStr} className="bg-white text-text-primary">
                {labelStr}
              </option>
            );
          })}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
