"use client";

import { motion } from 'framer-motion';

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
  onAddToCart: (dish: Dish) => void;
}

const DishCard = ({ dish, dishImg, onAddToCart }: DishCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="bg-ivory rounded-md overflow-hidden shadow-soft group h-full flex flex-col border border-border/50"
    >
      <div className="h-64 overflow-hidden relative">
        <img 
          src={dishImg} 
          alt={dish.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-4 right-4 bg-primary/90 text-ivory text-[10px] uppercase font-bold px-3 py-1 rounded-full">
          {dish.category}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-serif font-semibold text-secondary mb-4">{dish.title}</h3>
        <div className="mt-auto flex justify-between items-center">
          <button 
            onClick={() => onAddToCart(dish)} 
            className="text-xs uppercase tracking-widest font-bold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all w-max"
          >
            Add to Cart
          </button>
          <span className="text-primary font-bold text-lg">
            {"Rs. " + dish.price.substring(dish.price.startsWith("Rs. ") ? 4 : 1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
