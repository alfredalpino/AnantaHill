"use client";

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Users, ChevronLeft, ShieldCheck, CreditCard, Info } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import CustomSelect from '@/components/CustomSelect';
import GuestCounter from '@/components/GuestCounter';

const roomData: Record<string, any> = {
  "The Royal Ananta Suite": {
    price: 25000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1200",
    desc: "Our most prestigious suite offering unparalleled views and heritage luxury.",
    amenities: ["Private Balcony", "Butler Service", "Mini Bar", "Mountain View"]
  },
  "Hill View Deluxe": {
    price: 12000,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200",
    desc: "Wake up to the breathtaking sight of Canary Hill every morning.",
    amenities: ["King Bed", "Rain Shower", "Work Desk", "WiFi"]
  },
  "Garden Cottage": {
    price: 15000,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200",
    desc: "A cozy retreat nestled in our private orchards, perfect for privacy.",
    amenities: ["Private Entrance", "Garden View", "Lounge Area", "Teak Furniture"]
  }
};

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-cream p-12 rounded-[40px] shadow-luxury text-center border border-border"
        >
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">✓</div>
          <h2 className="text-3xl font-serif text-secondary mb-4">Reservation Sent</h2>
          <p className="text-secondary/60 mb-10 italic">
            Thank you for choosing Ananta. Our concierge will contact you within 30 minutes to finalize your stay in the {roomName}.
          </p>
          <Link href="/" className="luxury-button inline-block">Return Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-6">
        <Link href="/rooms" className="inline-flex items-center gap-2 text-secondary/40 hover:text-primary transition-colors mb-12 uppercase tracking-widest text-[10px] font-bold">
          <ChevronLeft size={16} /> Back to Accommodations
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Form */}
          <div className="w-full lg:w-3/5">
            <h1 className="text-4xl md:text-5xl font-serif text-secondary mb-4">Confirm Reservation</h1>
            <p className="text-secondary/60 mb-12 italic">Please provide your details to finalize the booking process.</p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Personal Details</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-cream border border-border px-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm shadow-soft transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-cream border border-border px-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm shadow-soft transition-all" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Stay Information</h3>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Check-in Date</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-cream border border-border px-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm shadow-soft transition-all appearance-none" />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Check-out Date</label>
                    <div className="relative">
                      <input type="date" className="w-full bg-cream border border-border px-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm shadow-soft transition-all appearance-none" />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" size={18} />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <GuestCounter 
                    value={guests}
                    onChange={setGuests}
                    className="w-full"
                  />
                </div>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-luxury text-primary font-bold mb-8 border-b border-border pb-4">Additional Requests</h3>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 ml-1">Message (Optional)</label>
                  <textarea rows={4} placeholder="Any specific requirements for your stay?" className="w-full bg-cream border border-border px-6 py-4 rounded-2xl focus:outline-none focus:border-primary text-sm shadow-soft transition-all resize-none"></textarea>
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
          </div>

          {/* Right Side: Summary */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
            <div className="bg-cream rounded-[40px] overflow-hidden shadow-luxury border border-border">
              <div className="h-64 relative">
                <img src={room.image} alt={roomName} className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-ivory/90 backdrop-blur-md px-4 py-2 rounded-full border border-ivory/20 shadow-soft">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Choice</span>
                </div>
              </div>
              
              <div className="p-10">
                <h2 className="text-3xl font-serif text-secondary mb-4">{roomName}</h2>
                <p className="text-secondary/60 text-sm leading-relaxed mb-8 italic">{room.desc}</p>

                <div className="border-t border-border pt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary/40 text-xs uppercase tracking-widest font-bold">Standard Rate</span>
                    <span className="text-secondary font-bold">₹{room.price.toLocaleString()} / night</span>
                  </div>
                  <div className="flex justify-between items-center text-primary font-bold">
                    <span className="text-xs uppercase tracking-widest">Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-serif text-secondary">Total Estimate</span>
                    <span className="text-3xl font-bold text-primary font-serif">₹{room.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 flex items-center justify-center gap-4">
                <CreditCard className="text-ivory/40" size={24} />
                <p className="text-ivory/60 text-[10px] uppercase tracking-widest font-bold">Pay upon arrival or secure checkout later</p>
              </div>
            </div>
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
