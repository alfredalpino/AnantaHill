"use client";

import { useState } from 'react';
import { Calendar, Users, Home, ArrowRight } from 'lucide-react';
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
    <section className="py-16 bg-ivory">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-secondary rounded-2xl p-8 md:p-12 shadow-luxury relative z-30"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-white mb-2">Reserve your stay</h2>
            <p className="text-white/80 text-sm">Pick your dates and room to continue with a seamless booking experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-end gap-4">
            {/* Room Selection */}
            <div className="w-full">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold flex items-center gap-2 mb-2">
                <Home size={12} />
                Room
              </label>
              <CustomSelect
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                options={["All Rooms", "Suites", "Deluxe", "Cottages"]}
                variant="full"
                className="!bg-white/5 !border-white/10 !text-white !rounded"
              />
            </div>

            {/* Check In */}
            <div className="w-full">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold flex items-center gap-2 mb-2">
                <Calendar size={12} />
                Check-In
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="w-full">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold flex items-center gap-2 mb-2">
                <Calendar size={12} />
                Check-Out
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="w-full">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold flex items-center gap-2 mb-2">
                <Users size={12} />
                Guests
              </label>
              <GuestCounter
                value={guests}
                onChange={setGuests}
                variant="booking-bar"
                className="!bg-white/5 !border-white/10 !text-white !rounded !h-[46px]"
              />
            </div>

            {/* Submit */}
            <div className="w-full">
              <Link
                href={`/booking?room=${roomType === "All Rooms" ? "The Royal Ananta Suite" : roomType}`}
                className="w-full bg-primary hover:bg-primary/90 text-white px-4 h-[46px] rounded text-[15px] capitalize tracking-wide font-bold transition-all flex items-center justify-center gap-3 shadow-luxury"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingWidget;
