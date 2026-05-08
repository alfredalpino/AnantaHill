"use client";

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

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
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft group h-full flex flex-col border border-border/40 p-4"
    >
      <div className="h-52 overflow-hidden relative rounded-xl mb-4">
        <img 
          src={dishImg} 
          alt={dish.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-secondary text-[9px] uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
          {dish.category}
        </div>
      </div>

      <div className="px-2 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-sans font-medium text-[#5C5242] leading-tight flex-1 mr-4">
            {dish.title}
          </h3>
          <span className="text-xl font-bold text-primary whitespace-nowrap">
            ₹{dish.price.replace(/[^0-9]/g, '')}
          </span>
        </div>
        
        <p className="text-secondary/50 text-[13px] leading-snug mb-6 line-clamp-2">
          {dish.desc || "Artfully prepared with authentic spices and the freshest local ingredients."}
        </p>

        <div className="mt-auto flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between bg-[#F9F8F6] border border-[#EBEAE6] rounded-lg px-2 py-1.5 w-28">
            <button 
              onClick={decrement}
              className="w-7 h-7 flex items-center justify-center text-secondary/40 hover:text-secondary transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-bold text-secondary text-sm">{quantity}</span>
            <button 
              onClick={increment}
              className="w-7 h-7 flex items-center justify-center text-secondary/40 hover:text-secondary transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => onAddToCart(dish, quantity)} 
            className="flex-1 bg-primary hover:bg-primary/90 text-secondary py-3 rounded-lg flex items-center justify-center transition-all active:scale-[0.97]"
          >
            <span className="text-[13px] text-white tracking-wide font-bold">Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
