"use client";

import { useState } from 'react';
import { Search, ShoppingBag, Utensils } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import DishCard from '@/components/cards/DishCard';
import TableReservationModal from '@/components/TableReservationModal';
import DiningCart from '@/components/DiningCart';

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
  }
];

export default function DiningPage() {
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

    const addToCart = (dish: any, quantity: number = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === dish.id);
            if (existing) {
                return prev.map(item => 
                    item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...dish, quantity }];
        });
        setIsCartOpen(true);
    };

    return (
        <div className="min-h-screen">
            <section className="relative flex h-[38vh] min-h-[280px] items-center justify-center overflow-hidden bg-secondary md:h-[42vh]">
                <div className="relative z-10 container-shell text-center">
                    <ScrollReveal>
                        <h1 className="mb-3 font-display text-3xl font-bold text-text-primary md:text-5xl">
                            Dining & Cuisine
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm text-text-body md:text-base">
                            Savor the freshest organic produce harvested directly from our hill-side farms, prepared with modern techniques.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary inline-flex px-8 py-3 text-sm font-semibold gap-2"
                            >
                                <Utensils className="w-4 h-4" />
                                Reserve a table
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="sticky top-[80px] z-30 border-b border-secondary border-t border-secondary/50 bg-[#F5EBE4]/95 shadow-sm backdrop-blur">
                <div className="container-shell flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${activeCategory === cat
                                    ? 'bg-primary-dark text-secondary shadow-sm'
                                    : 'text-text-muted hover:bg-secondary hover:text-text-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-72">
                        <input 
                            type="text" 
                            placeholder="Search dishes..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-secondary/30 border border-secondary px-4 py-2 pl-10 rounded-xl text-sm focus:outline-none focus:border-primary-dark"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    </div>
                </div>
            </section>

            <section className="section-shell bg-background">
                <div className="container-shell">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredDishes.map((dish, i) => (
                            <ScrollReveal key={dish.id} delay={i * 80}>
                                <DishCard 
                                    dish={dish} 
                                    dishImg="/images/food.webp" 
                                    onAddToCart={addToCart} 
                                />
                            </ScrollReveal>
                        ))}
                    </div>

                    {filteredDishes.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-text-muted font-display text-xl">No dishes found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

            <TableReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
            <DiningCart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                items={cartItems}
                onUpdateQuantity={(id: number, delta: number) => {
                    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
                }}
                onRemove={(id: number) => setCartItems(prev => prev.filter(item => item.id !== id))}
            />

            {cartItems.length > 0 && !isCartOpen && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 z-[100] bg-primary-dark text-white p-4 rounded-full shadow-premium flex items-center gap-3 transition-transform hover:scale-110 active:scale-95"
                >
                    <ShoppingBag size={24} />
                    <span className="bg-white text-primary-dark w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                </button>
            )}
        </div>
    );
}
