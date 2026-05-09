"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TableReservationModal = ({ isOpen, onClose }: TableReservationModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-text-muted hover:text-text-primary transition-colors z-20"
              >
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <p className="eyebrow mb-2">The Mirrored Hall</p>
                    <h2 className="font-display text-3xl font-bold text-text-primary mb-2">Table Reservation</h2>
                    <p className="text-text-muted text-sm">Join us for a farm-to-table culinary journey.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="field-label">Full Name</label>
                        <input type="text" placeholder="John Doe" className="field-input" />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label">Phone Number</label>
                        <input type="tel" placeholder="+91 00000 00000" className="field-input" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="field-label flex items-center gap-2">
                          <Calendar size={14} className="text-primary-dark" /> Date
                        </label>
                        <input type="date" className="field-input" />
                      </div>
                      <div className="space-y-2">
                        <label className="field-label flex items-center gap-2">
                          <Clock size={14} className="text-primary-dark" /> Time
                        </label>
                        <select className="field-input">
                          <option>07:00 PM</option>
                          <option>07:30 PM</option>
                          <option>08:00 PM</option>
                          <option>08:30 PM</option>
                          <option>09:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="field-label flex items-center gap-2">
                        <Users size={14} className="text-primary-dark" /> Guests
                      </label>
                      <input type="number" min="1" max="20" placeholder="Number of guests" className="field-input" />
                    </div>

                    <div className="space-y-2">
                      <label className="field-label flex items-center gap-2">
                        <MessageSquare size={14} className="text-primary-dark" /> Special Requests
                      </label>
                      <textarea placeholder="Any dietary restrictions or special occasions?" rows={3} className="field-input resize-none"></textarea>
                    </div>

                    <button type="submit" className="btn-primary w-full mt-4 font-bold">
                      Confirm Reservation
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h2 className="font-display text-3xl font-bold text-text-primary">Reservation Received</h2>
                  <p className="text-text-body max-w-xs mx-auto">We've received your request and will confirm your table shortly. Look forward to seeing you!</p>
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
