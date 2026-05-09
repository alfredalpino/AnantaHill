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
        <div className="fixed inset-0 z-[200] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-secondary-dark flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary-dark" size={24} />
                <h2 className="text-xl font-display font-bold text-text-primary">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary-dark rounded-full transition-colors" aria-label="Close cart">
                <X size={24} className="text-text-primary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!isOrdered ? (
                items.length > 0 ? (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-6 border-b border-secondary-dark last:border-0">
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-text-primary mb-1">{item.title}</h4>
                          <p className="text-primary-dark font-bold text-sm">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-secondary-dark rounded-xl px-3 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-text-muted hover:text-text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-text-primary tabular-nums">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-text-muted hover:text-text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-text-muted hover:text-error transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <ShoppingBag size={64} className="mb-4 text-secondary-dark" />
                    <p className="font-display text-2xl font-bold text-text-primary">Your cart is empty</p>
                    <p className="text-sm text-text-muted mt-2">Add some delicacies to start your culinary journey.</p>
                    <button 
                      onClick={onClose}
                      className="mt-10 btn-outline"
                    >
                      Browse Menu
                    </button>
                  </div>
                )
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-text-primary mb-2">Order Placed!</h3>
                  <p className="text-text-body text-base mb-8">
                    Your meal is being prepared and will be delivered to Room {roomNo} shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setIsOrdered(false);
                      onClose();
                    }}
                    className="btn-primary"
                  >
                    Back to menu
                  </button>
                </motion.div>
              )}
            </div>

            {!isOrdered && items.length > 0 && (
              <div className="p-6 bg-secondary-dark/30 border-t border-secondary-dark space-y-6">
                <form onSubmit={handleOrder} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Delivery Room Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 104" 
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                      className="w-full bg-white border border-secondary-dark px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-text-body text-base">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-dark">₹{total.toLocaleString()}</span>
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary w-full py-4 text-base font-bold"
                  >
                    Place Order
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
