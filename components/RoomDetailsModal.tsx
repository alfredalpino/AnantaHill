"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, ShieldCheck, Check, ArrowRight, Wifi, Wind, Coffee, Waves, UserCheck, Utensils, Dog, Maximize } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'AC': Wind,
    'Breakfast': Coffee,
    'Pool Access': Waves,
    'Private Pool': Waves,
    'All Meals': Utensils,
    'Butler': UserCheck,
    'Banquet Access': Users,
    'Jacuzzi': Waves,
    'Pet friendly': Dog,
    'Complimentary WiFi': Wifi,
    'Air Conditioning': Wind,
    'Mini Bar': Coffee,
    '24/7 Room Service': Utensils,
};

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
}

const RoomDetailsModal = ({ isOpen, onClose, room }: RoomDetailsModalProps) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!room) return null;

  const amenities = ['Complimentary WiFi', 'Air Conditioning', 'Mini Bar', '24/7 Room Service'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop - High Z-index and high contrast overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          
          {/* Modal Content - Split View (Old Layout) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[75vh]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all md:bg-secondary/50 md:text-text-primary md:hover:bg-secondary border border-white/20 md:border-secondary"
            >
              <X size={20} />
            </button>

            {/* Left: Image Side (Split Layout) */}
            <div className="w-full md:w-1/2 h-[40%] md:h-full relative shrink-0 bg-black overflow-hidden group">
              <Image 
                src={room.image || "/images/room.jpg"} 
                alt={room.name} 
                fill
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-50" />
              <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 bg-primary-dark/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                      {room.category}
                  </span>
              </div>
            </div>

            {/* Right: Details Side (Scrollable) */}
            <div className="w-full md:w-1/2 flex flex-col h-[60%] md:h-full bg-white overflow-y-auto custom-scrollbar relative">
              <div className="p-8 md:p-12 pb-4 flex-grow space-y-8">
                {/* Header */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3 pr-8">{room.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-text-muted">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Users className="w-4 h-4 text-primary-dark" />
                          <span>Up to {room.occupancy} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-success">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Free Cancellation</span>
                      </div>
                  </div>
                </div>

                {/* Price Plate */}
                <div className="bg-secondary/20 border border-secondary p-5 rounded-2xl flex items-end justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Starting from</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary-dark">₹{room.price.toLocaleString()}</span>
                            <span className="text-sm font-medium text-text-muted">/night</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                    <h3 className="text-lg font-display font-bold">About this Stay</h3>
                    <p className="text-text-body text-sm md:text-base leading-relaxed">
                        {room.desc || room.description}
                    </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-secondary">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">Room Size</h4>
                    <div className="flex items-center gap-2 text-text-primary">
                      <Maximize size={18} className="text-primary-dark" />
                      <span className="text-sm font-bold">{room.size}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-2">Occupancy</h4>
                    <div className="flex items-center gap-2 text-text-primary">
                      <Users size={18} className="text-primary-dark" />
                      <span className="text-sm font-bold">{room.occupancy}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities Highlights */}
                <div className="space-y-4">
                    <h3 className="text-lg font-display font-bold">Stay highlights</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {amenities.map((amenity) => {
                            const Icon = amenityIcons[amenity] || Check;
                            return (
                                <div key={amenity} className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/30 rounded-lg">
                                        <Icon className="w-4 h-4 text-primary-dark" />
                                    </div>
                                    <span className="text-[11px] font-bold text-text-primary/80 uppercase tracking-widest">{amenity}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
              </div>

              {/* Sticky Bottom Action (Like Table Modal) */}
              <div className="p-6 md:p-8 bg-white border-t border-secondary mt-auto sticky bottom-0 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                  <Link
                      href={`/booking?room=${encodeURIComponent(room.name)}`}
                      onClick={onClose}
                      className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary-dark/20 hover:-translate-y-1 hover:shadow-primary-dark/30 transition-all rounded-2xl"
                  >
                      Book Now <ArrowRight className="w-5 h-5" />
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
