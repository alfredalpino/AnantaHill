"use client";

import { CreditCard, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface BookingSummaryProps {
  room: {
    image: string;
    price: number;
    category?: string;
  };
  roomName: string;
}

const BookingSummary = ({ room, roomName }: BookingSummaryProps) => {
  const gst = room.price * 0.18;
  const finalTotal = room.price + gst;

  return (
    <div className="card-premium overflow-hidden sticky top-24">
      <div className="h-56 relative overflow-hidden">
        <Image 
          src={room.image} 
          alt={roomName} 
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-secondary shadow-sm">
            <span className="text-primary-dark font-bold text-[10px] uppercase tracking-widest">{room.category || 'Luxury Room'}</span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-text-primary mb-1">
            {roomName}
          </h3>
          <p className="text-sm text-text-muted">
            Includes all premium amenities and breakfast.
          </p>
        </div>

        <div className="space-y-4 border-y border-secondary-dark py-6">
          <div className="flex justify-between text-sm">
            <span className="text-text-body">Base Rate (1 Night)</span>
            <span className="font-bold text-text-primary">₹{room.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-primary-dark">
            <span className="font-medium">Special Discount</span>
            <span className="font-bold">-₹0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-body">GST (18%)</span>
            <span className="font-bold text-text-primary">₹{gst.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-text-primary">Total Amount</span>
          <span className="text-2xl font-bold text-primary-dark">₹{finalTotal.toLocaleString()}</span>
        </div>

        <div className="flex gap-3 rounded-xl bg-secondary-dark/50 p-4">
          <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
          <p className="text-[11px] leading-relaxed text-text-body">
            <strong className="font-semibold text-text-primary">Secure Booking:</strong> Full refund if cancelled 48 hours before check-in. All taxes included.
          </p>
        </div>
      </div>

      <div className="bg-secondary-dark/30 p-5 flex items-center justify-center gap-3 border-t border-secondary-dark">
        <CreditCard className="text-text-muted" size={18} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Pay Securely Online or at Hotel</p>
      </div>
    </div>
  );
};

export default BookingSummary;
