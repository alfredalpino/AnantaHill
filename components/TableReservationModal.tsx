"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TableReservationModal = ({ isOpen, onClose }: TableReservationModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-ivory rounded-3xl shadow-luxury overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 md:p-10 overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-secondary hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif mb-2">Table Reservation</h2>
                    <p className="text-secondary text-sm">Join us for a farm-to-table culinary journey.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-cream border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">Phone Number</label>
                        <input type="tel" placeholder="+91 00000 00000" className="w-full bg-cream border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                          <Calendar size={14} className="text-primary" /> Date
                        </label>
                        <input type="date" className="w-full bg-cream border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                          <Clock size={14} className="text-primary" /> Time
                        </label>
                        <select className="w-full bg-cream border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm">
                          <option>07:00 PM</option>
                          <option>07:30 PM</option>
                          <option>08:00 PM</option>
                          <option>08:30 PM</option>
                          <option>09:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                        <Users size={14} className="text-primary" /> Guests
                      </label>
                      <input type="number" min="1" max="20" placeholder="Number of guests" className="w-full bg-cream border border-border px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-secondary flex items-center gap-2">
                        <MessageSquare size={14} className="text-primary" /> Special Requests
                      </label>
                      <textarea placeholder="Any dietary restrictions or special occasions?" rows={3} className="w-full bg-cream border border-border px-4 py-4 rounded-xl focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full luxury-button mt-4">
                      Confirm Reservation
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </motion.div>
                  <h2 className="text-3xl font-serif">Reservation Received</h2>
                  <p className="text-secondary max-w-xs mx-auto">We've received your request and will confirm your table shortly. Look forward to seeing you!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TableReservationModal;
