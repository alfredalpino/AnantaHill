"use client";

import { Calendar, ShieldCheck, Info } from 'lucide-react';
import GuestCounter from '@/components/GuestCounter';

interface BookingFormProps {
  onSubmit: (e: React.FormEvent) => void;
  guests: number;
  onGuestsChange: (value: number) => void;
}

const BookingForm = ({ onSubmit, guests, onGuestsChange }: BookingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section>
        <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Personal Details</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm shadow-soft transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Email Address</label>
            <input type="email" placeholder="john@example.com" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm shadow-soft transition-all" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Stay Information</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Check-in Date</label>
            <div className="relative">
              <input type="date" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm shadow-soft transition-all appearance-none" />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Check-out Date</label>
            <div className="relative">
              <input type="date" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm shadow-soft transition-all appearance-none" />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <GuestCounter 
            value={guests}
            onChange={onGuestsChange}
            className="w-full"
          />
        </div>
      </section>

      <section>
        <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Additional Requests</h3>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Message (Optional)</label>
          <textarea rows={4} placeholder="Any specific requirements for your stay?" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm shadow-soft transition-all resize-none"></textarea>
        </div>
      </section>

      <div className="pt-4">
        <button type="submit" className="luxury-button w-full py-6 text-sm flex items-center justify-center gap-3">
          <ShieldCheck size={20} /> Complete Reservation
        </button>
        <p className="text-[10px] text-center text-secondary/40 italic mt-6 flex items-center justify-center gap-2">
          <Info size={12} /> This is a secure booking request. No payment is required right now.
        </p>
      </div>
    </form>
  );
};

export default BookingForm;
