"use client";

import { Calendar, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';
import GuestCounter from '@/components/GuestCounter';

interface BookingFormProps {
  onSubmit: (e: React.FormEvent) => void;
  guests: number;
  onGuestsChange: (value: number) => void;
}

const BookingForm = ({ onSubmit, guests, onGuestsChange }: BookingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Form Header */}
      <div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold block mb-3">Reservation</span>
        <h2 className="text-4xl font-serif text-secondary mb-4">Your details</h2>
        <p className="text-secondary/50 text-sm leading-relaxed">Complete the form to continue to secure checkout.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1">
            <User size={14} /> Full Name
          </label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all" 
          />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1">
            <Mail size={14} /> Email
          </label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all" 
          />
        </div>

        {/* Phone */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1">
            <Phone size={14} /> Phone
          </label>
          <input 
            type="tel" 
            placeholder="+91 6200112103" 
            className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all" 
          />
        </div>

        {/* Guests */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1">
            <Users size={14} /> Guests
          </label>
          <GuestCounter 
            value={guests}
            onChange={onGuestsChange}
            variant="booking-form"
            className="w-full"
          />
        </div>

        {/* Stay Dates Heading (Full Width) */}
        <div className="col-span-full">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1 mb-2">
            <Calendar size={14} /> Stay Dates
          </label>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-widest font-bold text-secondary/30 ml-4">Check-In</span>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all appearance-none pr-14" 
                />
                <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-widest font-bold text-secondary/30 ml-4">Check-Out</span>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all appearance-none pr-14" 
                />
                <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="col-span-full pt-4 space-y-3">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary flex items-center gap-2.5 ml-1">
            <MessageSquare size={14} /> Special Requests
          </label>
          <textarea 
            rows={5} 
            placeholder="Let us know if you have any special requirements..." 
            className="w-full bg-[#F9F8F6] border border-[#EBEAE6] px-6 py-4 rounded focus:outline-none focus:border-primary text-sm transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded text-[15px] capitalize tracking-wide font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          Proceed to Payment
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
