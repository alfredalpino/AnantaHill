"use client";

import { CreditCard } from 'lucide-react';

interface BookingSummaryProps {
  room: {
    image: string;
    price: number;
    desc: string;
  };
  roomName: string;
}

const BookingSummary = ({ room, roomName }: BookingSummaryProps) => {
  return (
    <div className="bg-cream rounded-md overflow-hidden shadow-luxury border border-border">
      <div className="h-64 relative">
        <img src={room.image} alt={roomName} className="w-full h-full object-cover" />
        <div className="absolute top-6 right-6 bg-ivory/90 backdrop-blur-md px-4 py-2 rounded-full border border-ivory/20 shadow-soft">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Choice</span>
        </div>
      </div>
      
      <div className="p-10">
        <h2 className="text-3xl font-semibold text-secondary mb-4">{roomName}</h2>
        <p className="text-secondary/60 text-sm leading-relaxed mb-8 italic">{room.desc}</p>

        <div className="border-t border-border pt-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-secondary/40 text-xs uppercase tracking-widest font-bold">Standard Rate</span>
            <span className="text-secondary font-bold">Rs. {room.price.toLocaleString()} / night</span>
          </div>
          <div className="flex justify-between items-center text-primary font-bold">
            <span className="text-xs uppercase tracking-widest">Taxes & Fees</span>
            <span>Included</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="md:text-xl text-lg font-semibold text-secondary">Total Estimate</span>
            <span className="md:text-3xl text-xl font-bold text-primary font-semibold">Rs. {room.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-transparent border-t border-border p-8 flex items-center justify-center gap-4">
        <CreditCard className="text-secondary/30" size={20} />
        <p className="text-secondary/50 text-[10px] uppercase tracking-widest font-bold">Pay upon arrival or secure checkout later</p>
      </div>
    </div>
  );
};

export default BookingSummary;
