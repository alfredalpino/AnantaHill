"use client";

import { useState } from 'react';
import { Calendar, Users, Home, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomSelect from './CustomSelect';
import GuestCounter from './GuestCounter';

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("All Rooms");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto bg-ivory/80 backdrop-blur-2xl rounded-md p-4 md:p-3 flex flex-col md:flex-row items-stretch gap-2 shadow-luxury mt-[-100px] relative z-30 border border-ivory/20"
    >
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Check In */}
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-md transition-all cursor-pointer relative group">
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
        <div className="flex flex-col gap-1 p-5 hover:bg-ivory/50 rounded-md transition-all cursor-pointer relative group border-t sm:border-t-0 sm:border-l border-ivory/10">
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

        <GuestCounter 
          value={guests}
          onChange={setGuests}
          className="flex-1 p-5 hover:bg-ivory/50 rounded-md transition-all cursor-pointer relative group border-t lg:border-t-0 lg:border-l border-ivory/10"
        />

        <CustomSelect 
          label="Category"
          icon={<Home size={12} className="text-primary" />}
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          options={["All Rooms", "Suites", "Deluxe", "Cottages"]}
          className="flex-1 p-5 hover:bg-ivory/50 rounded-md transition-all cursor-pointer relative group border-t lg:border-t-0 lg:border-l border-ivory/10"
          variant="rounded"
        />
      </div>

      <Link 
        href={`/booking?room=${roomType === "All Rooms" ? "The Royal Ananta Suite" : roomType}`}
        className="bg-primary text-ivory px-10 py-5 md:py-0 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-secondary transition-all shadow-luxury m-1 flex items-center justify-center text-center"
      >
        Check Availability
      </Link>
    </motion.div>
  );
};

export default BookingWidget;
