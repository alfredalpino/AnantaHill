"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize, Users, Coffee, Wind, Tv, Wifi, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
}

const RoomDetailsModal = ({ isOpen, onClose, room }: RoomDetailsModalProps) => {
  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-ivory w-full max-w-4xl rounded-[40px] shadow-luxury overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-ivory/50 backdrop-blur-md hover:bg-cream transition-colors z-20"
            >
              <X size={20} className="text-secondary" />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1200" 
                alt={room.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-ivory">
                <span className="text-[10px] uppercase tracking-luxury font-bold bg-primary px-3 py-1 rounded-full mb-2 inline-block">
                  {room.category}
                </span>
                <h2 className="text-3xl font-serif">{room.name}</h2>
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-primary font-bold text-2xl">₹{room.price} <small className="text-secondary/40 font-normal text-sm">/ night</small></p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 mb-3">Description</h4>
                  <p className="text-secondary/70 text-sm leading-relaxed italic">
                    {room.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 mb-3">Room Size</h4>
                    <div className="flex items-center gap-2 text-secondary">
                      <Maximize size={18} className="text-primary" />
                      <span className="text-sm font-medium">{room.size}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 mb-3">Occupancy</h4>
                    <div className="flex items-center gap-2 text-secondary">
                      <Users size={18} className="text-primary" />
                      <span className="text-sm font-medium">{room.occupancy}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-secondary/70 text-sm">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>Complimentary WiFi</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary/70 text-sm">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>Air Conditioning</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary/70 text-sm">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>Mini Bar</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary/70 text-sm">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>24/7 Room Service</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/booking?room=${room.name}`}
                  onClick={onClose}
                  className="luxury-button w-full py-5 flex items-center justify-center"
                >
                  Book This Room
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailsModal;
