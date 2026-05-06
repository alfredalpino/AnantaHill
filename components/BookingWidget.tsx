"use client";

import { useState } from 'react';
import { Calendar, Users, Home, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [roomType, setRoomType] = useState("All Rooms");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto bg-ivory/80 backdrop-blur-2xl rounded-[32px] p-4 md:p-3 flex flex-col md:flex-row items-stretch gap-2 shadow-luxury mt-[-100px] relative z-30 border border-ivory/20"
    >
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Check In */}
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-2xl transition-all cursor-pointer relative group">
          <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold flex items-center gap-2">
            <Calendar size={12} className="text-primary" />
            Check In
          </label>
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="bg-transparent text-sm text-secondary font-bold focus:outline-none w-full cursor-pointer mt-1"
          />
        </div>

        {/* Check Out */}
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-2xl transition-all cursor-pointer relative group border-t sm:border-t-0 sm:border-l border-ivory/10">
          <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold flex items-center gap-2">
            <Calendar size={12} className="text-primary" />
            Check Out
          </label>
          <input 
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="bg-transparent text-sm text-secondary font-bold focus:outline-none w-full cursor-pointer mt-1"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-2xl transition-all cursor-pointer relative group border-t lg:border-t-0 lg:border-l border-ivory/10">
          <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold flex items-center gap-2">
            <Users size={12} className="text-primary" />
            Guests
          </label>
          <select 
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent text-sm text-secondary font-bold focus:outline-none w-full cursor-pointer appearance-none mt-1"
          >
            <option>1 Adult</option>
            <option>2 Adults</option>
            <option>3 Adults</option>
            <option>2 Adults, 1 Child</option>
            <option>4 Adults</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 bottom-5 text-primary pointer-events-none opacity-50" />
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-2xl transition-all cursor-pointer relative group border-t lg:border-t-0 lg:border-l border-ivory/10">
          <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-bold flex items-center gap-2">
            <Home size={12} className="text-primary" />
            Category
          </label>
          <select 
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="bg-transparent text-sm text-secondary font-bold focus:outline-none w-full cursor-pointer appearance-none mt-1"
          >
            <option>All Rooms</option>
            <option>Suites</option>
            <option>Deluxe</option>
            <option>Cottages</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 bottom-5 text-primary pointer-events-none opacity-50" />
        </div>
      </div>

      <Link 
        href={`/booking?room=${roomType === "All Rooms" ? "The Royal Ananta Suite" : roomType}`}
        className="bg-primary text-ivory px-10 py-5 md:py-0 rounded-[24px] text-xs uppercase tracking-luxury font-bold hover:bg-secondary transition-all shadow-luxury m-1 flex items-center justify-center text-center"
      >
        Check Availability
      </Link>
    </motion.div>
  );
};

export default BookingWidget;
