"use client";

import { useState } from 'react';
import Link from 'next/link';
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
  },
  {
    id: 4,
    category: "Deluxe",
    name: "Heritage Twin Room",
    desc: "Perfect for friends or small families, blending traditional craftsmanship with modern amenities.",
    price: "10,500",
    size: "400 sq ft",
    occupancy: "3 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast']
  },
  {
    id: 5,
    category: "Suites",
    name: "Executive Suite",
    desc: "A perfect blend of luxury and functionality for the modern traveler.",
    price: "18,500",
    size: "600 sq ft",
    occupancy: "2 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast']
  },
  {
    id: 6,
    category: "Cottages",
    name: "Stone Cottage",
    desc: "Rugged exterior with a plush, warm interior for an authentic mountain stay.",
    price: "14,000",
    size: "500 sq ft",
    occupancy: "2 Guests",
    image: "/images/room.jpg",
    amenities_labels: ['WiFi', 'AC', 'Breakfast']
  }
];

export default function RoomsPage() {
    const [filter, setFilter] = useState('All');
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const categories = ["All", "Suites", "Cottages", "Deluxe"];

    const filteredRooms = rooms.filter(room =>
        filter === 'All' || room.category === filter
    );

    return (
        <div className="min-h-screen">
            <section className="relative flex h-[38vh] min-h-[280px] items-center justify-center overflow-hidden bg-secondary md:h-[42vh]">
                <div className="relative z-10 container-shell text-center">
                    <ScrollReveal>
                        <h1 className="mb-3 font-display text-3xl font-bold text-text-primary md:text-5xl">
                            Accommodations
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm text-text-body md:text-base">
                            Suites, cottages, and deluxe rooms are grouped for clarity, with transparent pricing and capacity.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/booking"
                                className="btn-primary inline-flex px-8 py-3 text-sm font-semibold"
                            >
                                Book a stay
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="sticky top-[80px] z-30 border-b border-secondary border-t border-secondary/50 bg-[#F5EBE4]/95 shadow-sm backdrop-blur">
                <div className="container-shell flex items-center gap-2 overflow-x-auto py-4 md:justify-center md:gap-3 md:py-5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 ${filter === cat
                                ? 'bg-primary-dark text-secondary shadow-sm'
                                : 'text-text-muted hover:bg-secondary hover:text-text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="section-shell bg-background">
                <div className="container-shell">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredRooms.map((room, i) => (
                            <ScrollReveal key={room.id} delay={i % 3 * 120}>
                                <RoomCard room={room} onViewDetails={setSelectedRoom} />
                            </ScrollReveal>
                        ))}
                    </div>

                    {filteredRooms.length === 0 && (
                        <div className="py-20 text-center">
                            <h3 className="font-display text-xl font-bold text-text-primary md:text-2xl">
                                No rooms in this category
                            </h3>
                            <p className="mt-2 text-sm text-text-muted">Try another filter or view all rooms.</p>
                        </div>
                    )}
                </div>
            </section>

            <RoomDetailsModal
                isOpen={Boolean(selectedRoom)}
                onClose={() => setSelectedRoom(null)}
                room={selectedRoom}
            />
        </div>
    );
}
