"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import TableReservationModal from '@/components/TableReservationModal';
import DiningCart from '@/components/DiningCart';
import { Utensils, Leaf, Wine, Coffee, Search, ShoppingBag, ChevronDown } from 'lucide-react';

const dishImg = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800";

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
    price: "₹1,250", 
    desc: "Foraged mushrooms from the hills, creamy arborio rice, and truffle oil."
  },
  { 
    id: 5,
    category: "Traditional",
    title: "Canary Hill Chicken Curry", 
    price: "₹950", 
    desc: "Country chicken prepared with stone-ground spices and served with steamed red rice."
  },
  { 
    id: 6,
    category: "Healthy",
    title: "Himalayan Trout", 
    price: "₹1,650", 
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
    <div className="pt-32 bg-ivory min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden p-0 bg-cream border-b border-border">
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.4em] text-xs font-bold text-primary mb-6 block"
          >
            Culinary Art
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-secondary mb-8"
          >
            Farm-to-Table <br /> <span className="italic font-light">Excellence</span>
          </motion.h1>
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="luxury-button"
          >
            Reserve a Table
          </motion.button>
        </div>
      </section>

      {/* Menu Filter & List */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeader 
            subtitle="The Signature"
            title="Culinary Highlights"
          />

          {/* Search & Categories */}
          {/* Sticky Search & Categories */}
          <div className="sticky top-20 z-40 bg-cream/80 backdrop-blur-lg py-6 -mx-6 px-6 mb-16 flex flex-col md:flex-row gap-6 justify-between items-center border-b border-border/50 shadow-sm">
            <div className="relative w-full md:w-64">
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-ivory border border-border px-8 py-3 rounded-full focus:outline-none focus:border-primary text-xs uppercase tracking-widest appearance-none shadow-soft cursor-pointer font-bold text-secondary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" size={16} />
            </div>
            
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-ivory border border-border px-6 py-3 pl-12 rounded-full focus:outline-none focus:border-primary text-sm shadow-soft"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40" size={18} />
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                    className="bg-ivory rounded-3xl overflow-hidden shadow-soft group h-full flex flex-col"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img src={dishImg} alt={dish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="absolute top-4 right-4 bg-primary/90 text-ivory text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                        {dish.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-serif text-secondary mb-4">{dish.title}</h3>
                      <div className="mt-auto flex justify-between items-center">
                        <button 
                          onClick={() => addToCart(dish)} 
                          className="text-xs uppercase tracking-widest font-bold text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all w-max"
                        >
                          Add to Cart
                        </button>
                        <span className="text-primary font-bold text-lg">{dish.price}</span>
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
