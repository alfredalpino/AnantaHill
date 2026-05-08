"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Wifi, Coffee, Wind, Tv, Users, Maximize } from 'lucide-react';
import { useState } from 'react';
import RoomDetailsModal from '@/components/RoomDetailsModal';
import RoomCard from '@/components/cards/RoomCard';

const roomImg = "/images/room.jpg";

const rooms = [
  {
    id: 1,
    category: "Suites",
    name: "The Royal Ananta Suite",
    desc: "Our flagship suite offering panoramic views of the hills with a private balcony and a colonial-style living area.",
    price: "25,000",
    size: "850 sq ft",
    occupancy: "2 Guests",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Wind key="wi" />, <Tv key="t" />]
  },
  {
    id: 2,
    category: "Deluxe",
    name: "Hill View Deluxe",
    desc: "Elegant and spacious rooms featuring large windows that frame the majestic peaks of Canary Hill.",
    price: "12,000",
    size: "450 sq ft",
    occupancy: "2 Guests",
    amenities: [<Wifi key="w" />, <Wind key="wi" />, <Tv key="t" />]
  },
  {
    id: 3,
    category: "Cottages",
    name: "Garden Cottage",
    desc: "Tucked away in our private orchards, these cottages offer ultimate privacy and a rustic-luxe vibe.",
    price: "15,000",
    size: "550 sq ft",
    occupancy: "2 Guests",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Wind key="wi" />]
  },
  {
    id: 4,
    category: "Deluxe",
    name: "Heritage Twin Room",
    desc: "Perfect for friends or small families, blending traditional craftsmanship with modern amenities.",
    price: "10,500",
    size: "400 sq ft",
    occupancy: "3 Guests",
    amenities: [<Wifi key="w" />, <Tv key="t" />]
  },
  {
    id: 5,
    category: "Suites",
    name: "Executive Suite",
    desc: "A perfect blend of luxury and functionality for the modern traveler.",
    price: "18,500",
    size: "600 sq ft",
    occupancy: "2 Guests",
    amenities: [<Wifi key="w" />, <Coffee key="c" />, <Tv key="t" />]
  },
  {
    id: 6,
    category: "Cottages",
    name: "Stone Cottage",
    desc: "Rugged exterior with a plush, warm interior for an authentic mountain stay.",
    price: "14,000",
    size: "500 sq ft",
    occupancy: "2 Guests",
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
    <div className="pt-32 pb-20 bg-ivory min-h-screen">
      <div className="container-custom">
        <SectionHeader 
          subtitle="Accommodations"
          title="Sanctuaries of Rest"
        />

        {/* Filter Bar */}
        <div className="sticky top-[80px] z-40 flex overflow-x-auto no-scrollbar gap-4 py-5 mb-16 bg-ivory border-b border-border -mx-6 px-6 scroll-smooth">
          <div className="flex gap-4 mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-8 py-2 rounded-full sm:text-sm text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
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
              <RoomCard 
                key={room.id} 
                room={room} 
                roomImg={roomImg} 
                onOpenDetails={openDetails} 
              />
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
