"use client";

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  category: string;
  price: string;
  occupancy: string;
  desc: string;
  amenities: React.ReactNode[];
}

interface RoomCardProps {
  room: Room;
  roomImg: string;
  onOpenDetails: (room: Room) => void;
}

const RoomCard = ({ room, roomImg, onOpenDetails }: RoomCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-cream rounded-md overflow-hidden shadow-soft flex flex-col group h-full border border-border/80"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={roomImg} 
          alt={room.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Price Tag */}
        <div className="absolute top-6 left-6 bg-ivory/90 backdrop-blur-md px-4 py-2 rounded-full shadow-soft z-10">
          <span className="text-primary font-bold text-xs">
            Rs. {room.price} <small className="text-secondary/60 font-normal">/ night</small>
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 right-6 bg-primary text-ivory text-[10px] uppercase font-bold px-3 py-1 rounded-full">
          {room.category}
        </div>

        {/* Occupancy Tag - Right Bottom */}
        <div className="absolute bottom-6 right-6 bg-ivory/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-soft flex items-center gap-2">
          <Users size={12} className="text-primary" />
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{room.occupancy}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-serif text-secondary mb-4">{room.name}</h3>
        <p className="text-secondary/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {room.desc}
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 text-primary/60 mb-2">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-ivory border border-border flex items-center justify-center scale-90">
                {amenity}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={() => onOpenDetails(room)} 
              className="luxury-button-outline w-full py-4 px-2 text-xs"
            >
              Details
            </button>
            <Link 
              href={`/booking?room=${room.name}`} 
              className="luxury-button w-full py-4 px-2 text-xs flex items-center justify-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
