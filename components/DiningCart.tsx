"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

interface DiningCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const DiningCart = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: DiningCartProps) => {
  const [roomNo, setRoomNo] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  const total = items.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsOrdered(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-ivory w-full max-w-md h-full shadow-luxury flex flex-col"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-cream">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-xl font-serif text-secondary">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-border rounded-full transition-colors group" aria-label="Close cart">
                <X size={24} className="text-secondary group-hover:text-primary transition-colors" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isOrdered ? (
                items.length > 0 ? (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                        <div className="flex-1">
                          <h4 className="text-sm font-serif text-secondary mb-1">{item.title}</h4>
                          <p className="text-primary font-bold text-xs">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-cream rounded-full px-3 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-secondary/60 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-secondary/60 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-secondary/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-20">
                    <ShoppingBag size={48} className="mb-4 text-secondary/20" />
                    <p className="font-serif text-lg text-secondary">Your cart is empty</p>
                    <p className="text-xs uppercase tracking-widest mt-2 text-secondary/40">Add some delicacies to start</p>
                    <button 
                      onClick={onClose}
                      className="mt-10 luxury-button-outline !px-10 !py-4 text-[15px] opacity-100"
                    >
                      Close Cart
                    </button>
                  </div>
                )
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-serif text-secondary mb-2">Order Placed!</h3>
                  <p className="text-secondary/60 text-sm mb-8 italic">
                    Your meal is being prepared and will be delivered to Room {roomNo} shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setIsOrdered(false);
                      onClose();
                    }}
                    className="text-primary text-[15px] capitalize tracking-wide font-bold border-b border-primary pb-1"
                  >
                    Back to menu
                  </button>
                </motion.div>
              )}
            </div>

            {!isOrdered && items.length > 0 && (
              <div className="p-6 bg-cream border-t border-border space-y-6">
                <form onSubmit={handleOrder} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40">Delivery Room Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 104" 
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      className="w-full bg-ivory border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-secondary/60 text-sm">Total Amount</span>
                    <span className="text-xl font-bold text-primary font-semibold">Rs. {total.toLocaleString()}</span>
                  </div>

                  <button 
                    type="submit"
                    className="luxury-button w-full py-4 text-[15px]"
                  >
                    Place in-room order
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DiningCart;
