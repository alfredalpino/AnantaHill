"use client";

import { Calendar, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (e: React.FormEvent) => void;
  guests: number;
  onGuestsChange: (value: number) => void;
}

const BookingForm = ({ onSubmit, guests, onGuestsChange }: BookingFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="field-label flex items-center gap-2">
            <User size={14} /> Full Name
          </label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="field-input" 
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="field-label flex items-center gap-2">
            <Mail size={14} /> Email
          </label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="field-input" 
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="field-label flex items-center gap-2">
            <Phone size={14} /> Phone
          </label>
          <input 
            type="tel" 
            placeholder="+91 00000 00000" 
            className="field-input" 
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="field-label flex items-center gap-2">
            <Users size={14} /> Guests
          </label>
          <select 
            value={guests}
            onChange={(e) => onGuestsChange(Number(e.target.value))}
            className="field-input appearance-none"
          >
            {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="col-span-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="field-label flex items-center gap-2">
                        <Calendar size={14} /> Check-In
                    </label>
                    <input 
                        type="date" 
                        className="field-input" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="field-label flex items-center gap-2">
                        <Calendar size={14} /> Check-Out
                    </label>
                    <input 
                        type="date" 
                        className="field-input" 
                    />
                </div>
            </div>
        </div>

        {/* Special Requests */}
        <div className="col-span-full space-y-2">
          <label className="field-label flex items-center gap-2">
            <MessageSquare size={14} /> Special Requests
          </label>
          <textarea 
            rows={4} 
            placeholder="Let us know if you have any special requirements..." 
            className="field-input resize-none"
          ></textarea>
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          className="btn-primary w-full py-4 text-base font-bold"
        >
          Confirm Reservation
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
