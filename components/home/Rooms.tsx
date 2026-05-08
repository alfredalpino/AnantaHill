"use client";

import { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import RoomCard from '@/components/cards/RoomCard';
import RoomDetailsModal from '@/components/RoomDetailsModal';
import { Wifi, Coffee, Wind, Tv } from 'lucide-react';

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
  }
];

const Rooms = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null);

  const openDetails = (room: any) => {
    setSelectedRoomData(room);
    setIsDetailsOpen(true);
  };

  return (
    <section className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <span className="uppercase tracking-luxury text-xs font-bold text-primary mb-4 block">Stay with Us</span>
            <h2 className="text-4xl md:text-6xl font-serif text-secondary">Explore Our Stays</h2>
          </div>
          <Link href="/rooms" className="luxury-button-outline px-10 py-3">
            View All Rooms
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              roomImg={roomImg} 
              onOpenDetails={openDetails} 
            />
          ))}
        </div>
      </div>

      <RoomDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        room={selectedRoomData}
      />
    </section>
  );
};

export default Rooms;
