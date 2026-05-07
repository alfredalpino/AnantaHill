"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import TableReservationModal from '@/components/TableReservationModal';
import DiningCart from '@/components/DiningCart';
import { Utensils, Leaf, Wine, Coffee, Search, ShoppingBag, ChevronDown } from 'lucide-react';
import CustomSelect from '@/components/CustomSelect';

const dishImg = "/images/food.webp";

const dishes = [
  { 
    id: 1,
    category: "Main Course",
    title: "Hillside Lamb Shank", 
    price: "₹1,850", 
    desc: "Slow-cooked for 12 hours with local spices and mountain herbs."
  },
  { 
    id: 2,
    category: "Healthy",
    title: "Organic Harvest Bowl", 
    price: "₹850", 
    desc: "A vibrant mix of roasted roots, fresh greens, and hill-honey dressing."
  },
  { 
    id: 3,
    category: "Traditional",
    title: "Traditional Dhuska Platter", 
    price: "₹750", 
    desc: "Authentic Jharkhand delicacy served with spicy potato curry and farm chutney."
  },
  { 
    id: 4,
    category: "Main Course",
    title: "Wild Mushroom Risotto", 
    price: "Rs. 1,250", 
    desc: "Foraged mushrooms from the hills, creamy arborio rice, and truffle oil."
  },
  { 
    id: 5,
    category: "Traditional",
    title: "Canary Hill Chicken Curry", 
    price: "Rs. 950", 
    desc: "Country chicken prepared with stone-ground spices and served with steamed red rice."
  },
  { 
    id: 6,
    category: "Healthy",
    title: "Himalayan Trout", 
    price: "Rs. 1,650", 
    desc: "Pan-seared trout with lemon butter sauce and seasonal farm vegetables."
  }
];

export default function Dining() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["All", "Main Course", "Healthy", "Traditional"];

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dish.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || dish.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (dish: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => 
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen sm:pt-8 pt-16">

      {/* Menu Filter & List */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            subtitle="The Signature"
            title="Culinary Highlights"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center sm:-mt-8 -mt-2 sm:mb-12 mb-6"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-ivory px-10 py-4 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-accent transition-all shadow-luxury flex items-center gap-3"
            >
              <Utensils size={16} />
              Reserve a Table
            </button>
          </motion.div>

          {/* Search & Categories */}
          {/* Sticky Search & Categories */}
          <div className="sticky bg-ivory top-20 z-40 py-6 -mx-6 px-6 mb-16 flex flex-col md:flex-row md:gap-6 gap-4 justify-between items-center border-b border-border">
            <CustomSelect 
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              options={categories.map(cat => ({ label: cat === "All" ? "All Categories" : cat, value: cat }))}
              variant="full"
              className="w-full md:w-64"
            />
            
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-ivory border border-border px-6 py-3 pl-12 rounded-md focus:outline-none focus:border-primary shadow-soft"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="wait">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                  <motion.div 
                    layout
                    key={dish.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-ivory rounded-md overflow-hidden shadow-soft group h-full flex flex-col border border-border/50"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img src={dishImg} alt={dish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-4 right-4 bg-primary/90 text-ivory text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                        {dish.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-secondary mb-4">{dish.title}</h3>
                      <div className="mt-auto flex justify-between items-center">
                        <button 
                          onClick={() => addToCart(dish)} 
                          className="text-xs uppercase tracking-widest font-bold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all w-max"
                        >
                          Add to Cart
                        </button>
                        <span className="text-primary font-bold text-lg">{"Rs. " + dish.price.substring(1)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-secondary font-serif text-xl">No dishes found matching your criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      <TableReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <DiningCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Floating Cart Button */}
      {cartItems.length > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-10 right-10 z-[100] bg-primary text-ivory p-5 rounded-full shadow-luxury flex items-center gap-3"
        >
          <ShoppingBag size={24} />
          <span className="bg-ivory text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        </motion.button>
      )}
    </div>
  );
}
