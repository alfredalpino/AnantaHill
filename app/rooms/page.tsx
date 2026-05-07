"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Wifi, Coffee, Wind, Tv, Users, Maximize } from 'lucide-react';
import { useState } from 'react';
import RoomDetailsModal from '@/components/RoomDetailsModal';

const roomImg = "/images/room.jpg";

const rooms = [
  {
    id: 1,
    category: "Suites",
    name: "The Royal Ananta Suite",
    desc: "Our flagship suite offering panoramic views of the hills with a private balcony and a colonial-style living area.",
    price: "25,000",
    size: "850 sq ft",
    occupancy: "2 Adults",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Wind key="wi" />, <Tv key="t" />]
  },
  {
    id: 2,
    category: "Deluxe",
    name: "Hill View Deluxe",
    desc: "Elegant and spacious rooms featuring large windows that frame the majestic peaks of Canary Hill.",
    price: "12,000",
    size: "450 sq ft",
    occupancy: "2 Adults",
    amenities: [<Wifi key="w" />, <Wind key="wi" />, <Tv key="t" />]
  },
  {
    id: 3,
    category: "Cottages",
    name: "Garden Cottage",
    desc: "Tucked away in our private orchards, these cottages offer ultimate privacy and a rustic-luxe vibe.",
    price: "15,000",
    size: "550 sq ft",
    occupancy: "2 Adults",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Wind key="wi" />]
  },
  {
    id: 4,
    category: "Deluxe",
    name: "Heritage Twin Room",
    desc: "Perfect for friends or small families, blending traditional craftsmanship with modern amenities.",
    price: "10,500",
    size: "400 sq ft",
    occupancy: "2 Adults, 1 Child",
    amenities: [<Wifi key="w" />, <Tv key="t" />]
  },
  {
    id: 5,
    category: "Suites",
    name: "Executive Suite",
    desc: "A perfect blend of luxury and functionality for the modern traveler.",
    price: "18,500",
    size: "600 sq ft",
    occupancy: "2 Adults",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Tv key="t" />]
  },
  {
    id: 6,
    category: "Cottages",
    name: "Stone Cottage",
    desc: "Rugged exterior with a plush, warm interior for an authentic mountain stay.",
    price: "14,000",
    size: "500 sq ft",
    occupancy: "2 Adults",
    amenities: [<Wifi key="w" />, <Wind key="wi" />]
  }
];

export default function Accommodations() {
  const [filter, setFilter] = useState("All");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null);
  const categories = ["All", "Suites", "Cottages", "Deluxe"];

  const openDetails = (room: any) => {
    setSelectedRoomData(room);
    setIsDetailsOpen(true);
  };

  const filteredRooms = filter === "All" 
    ? rooms 
    : rooms.filter(room => room.category === filter);

  return (
    <div className="sm:pt-40 pt-32 sm:pb-20 pb-12 bg-ivory min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeader 
          subtitle="Accommodations"
          title="Sanctuaries of Rest"
        />

        {/* Filter Bar */}
        <div className="sticky top-[80px] z-40 flex overflow-x-auto no-scrollbar gap-4 py-8 mb-16 bg-ivory border-b border-border -mx-6 px-6 scroll-smooth">
          <div className="flex gap-4 mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 rounded-full text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat 
                    ? "bg-primary text-ivory shadow-luxury" 
                    : "bg-cream text-secondary hover:bg-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room) => (
              <motion.div 
                layout
                key={room.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-cream rounded-[32px] overflow-hidden shadow-soft flex flex-col group h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={roomImg} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-6 left-6 bg-ivory/90 backdrop-blur-md px-4 py-2 rounded-full shadow-soft z-10">
                    <span className="text-primary font-bold text-xs">₹{room.price} <small className="text-secondary/60 font-normal">/ night</small></span>
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

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif text-secondary mb-4">{room.name}</h3>
                  {/* <p className="text-secondary/70 text-sm leading-relaxed mb-8 flex-1 italic line-clamp-3">{room.desc}</p> */}
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 text-primary/60 mb-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="w-8 h-8 rounded-full bg-ivory border border-border flex items-center justify-center scale-90">
                          {amenity}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button onClick={() => openDetails(room)} className="luxury-button-outline w-full py-4 text-[10px]">View Details</button>
                      <Link href={`/booking?room=${room.name}`} className="luxury-button w-full py-4 text-[10px] flex items-center justify-center">Book Now</Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      

      <RoomDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        room={selectedRoomData}
      />
    </div>
  );
}
