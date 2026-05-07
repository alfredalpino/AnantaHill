"use client";

import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { roomData } from '@/constants/rooms';
import BookingSuccess from '@/components/booking/BookingSuccess';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';

const BookingContent = () => {
  const searchParams = useSearchParams();
  const roomName = searchParams.get('room') || "The Royal Ananta Suite";
  const room = roomData[roomName] || roomData["The Royal Ananta Suite"];
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <BookingSuccess roomName={roomName} />;
  }

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container-custom">
        <Link href="/rooms" className="inline-flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors mb-12 uppercase tracking-widest text-[10px] font-bold">
          <ChevronLeft size={16} /> Back to Accommodations
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Form */}
          <div className="w-full lg:w-3/5">
            <h1 className="text-4xl md:text-5xl font-semibold text-secondary mb-4">Confirm Reservation</h1>
            <p className="text-secondary/60 mb-12 italic">Please provide your details to finalize the booking process.</p>
            
            <BookingForm 
              onSubmit={handleSubmit}
              guests={guests}
              onGuestsChange={setGuests}
            />
          </div>

          {/* Right Side: Summary */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
            <BookingSummary room={room} roomName={roomName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-ivory flex items-center justify-center text-primary italic">Preparing Your Retreat...</div>}>
      <BookingContent />
    </Suspense>
  );
}
