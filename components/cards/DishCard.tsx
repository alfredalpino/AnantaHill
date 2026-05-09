"use client";

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Dish {
  id: number;
  category: string;
  title: string;
  price: string;
  desc?: string;
}

interface DishCardProps {
  dish: Dish;
  dishImg: string;
  onAddToCart: (dish: Dish, quantity: number) => void;
}

const DishCard = ({ dish, dishImg, onAddToCart }: DishCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="card-premium group h-full flex flex-col p-4 overflow-hidden bg-white">
      <div className="relative h-48 overflow-hidden rounded-xl mb-6">
        <Image 
          src={dishImg} 
          alt={dish.title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary shadow-sm">
            <span className="text-primary-dark font-bold text-[10px] uppercase tracking-widest">{dish.category}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-text-primary leading-tight flex-1 mr-4">
            {dish.title}
          </h3>
          <span className="text-lg font-bold text-primary-dark whitespace-nowrap">
            {dish.price}
          </span>
        </div>
        
        <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-2">
          {dish.desc || "Artfully prepared with authentic spices and the freshest local ingredients."}
        </p>

        <div className="mt-auto flex items-center gap-3">
          <div className="flex items-center justify-between bg-secondary-dark rounded-xl px-2 py-1.5 w-24 border border-secondary">
            <button 
              onClick={decrement}
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="font-bold text-text-primary text-sm tabular-nums">{quantity}</span>
            <button 
              onClick={increment}
              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <button 
            onClick={() => onAddToCart(dish, quantity)} 
            className="btn-primary flex-1 py-3 text-xs font-bold"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
