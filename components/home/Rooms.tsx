"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RoomCard from '@/components/RoomCard';
import RoomDetailsModal from '@/components/RoomDetailsModal';
import ScrollReveal from '@/components/ScrollReveal';

const rooms = [
  {
    id: 1,
    category: "Suites",
    name: "The Royal Ananta Suite",
    desc: "Our flagship suite offering panoramic views of the hills with a private balcony and a colonial-style living area.",
    price: "25,000",
    size: "850 sq ft",
    occupancy: "2 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast', 'Butler']
  },
  {
    id: 2,
    category: "Deluxe",
    name: "Hill View Deluxe",
    desc: "Elegant and spacious rooms featuring large windows that frame the majestic peaks of Canary Hill.",
    price: "12,000",
    size: "450 sq ft",
    occupancy: "2 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast']
  },
  {
    id: 3,
    category: "Cottages",
    name: "Garden Cottage",
    desc: "Tucked away in our private orchards, these cottages offer ultimate privacy and a rustic-luxe vibe.",
    price: "15,000",
    size: "550 sq ft",
    occupancy: "2 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast']
  }
];

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <section className="section-shell border-t border-secondary bg-background">
      <div className="container-shell">
        <div className="section-head text-center md:text-left md:mx-0 max-w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
          <div className="max-w-2xl">
            <ScrollReveal>
              <p className="eyebrow mb-2">Pick & choose from different categories</p>
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl">
                Rooms & villas
              </h2>
              <p className="text-sm leading-relaxed text-text-body sm:text-base mt-3">
                Discover suites, deluxe rooms, and garden cottages with clear pricing and straightforward capacity details.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <Link
              href="/rooms"
              className="btn-outline hidden md:inline-flex"
            >
              View all accommodations
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.id} delay={i * 120}>
              <RoomCard room={room} onViewDetails={setSelectedRoom} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <ScrollReveal delay={200}>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 font-semibold text-primary-dark transition-all duration-200 hover:gap-3"
            >
              View all accommodations
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <RoomDetailsModal 
        isOpen={Boolean(selectedRoom)} 
        onClose={() => setSelectedRoom(null)} 
        room={selectedRoom}
      />
    </section>
  );
};

export default Rooms;
