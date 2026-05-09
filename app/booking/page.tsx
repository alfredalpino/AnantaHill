"use client";

import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import BookingSuccess from '@/components/booking/BookingSuccess';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';
import ScrollReveal from '@/components/ScrollReveal';

// Mock room data matching Tathastu's logic
const roomData: Record<string, any> = {
    "The Royal Ananta Suite": { price: 25000, category: "Suites", image: "/images/room.jpg", desc: "Our flagship suite offering panoramic views of the hills with a private balcony and a colonial-style living area." },
    "Hill View Deluxe": { price: 12000, category: "Deluxe", image: "/images/room.jpg", desc: "Elegant and spacious rooms featuring large windows that frame the majestic peaks of Canary Hill." },
    "Garden Cottage": { price: 15000, category: "Cottages", image: "/images/room.jpg", desc: "Tucked away in our private orchards, these cottages offer ultimate privacy and a rustic-luxe vibe." }
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
        return <BookingSuccess roomName={roomName} />;
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="section-shell pb-16 pt-8 md:pb-24">
                <div className="container-shell">
                    <div className="mb-10 max-w-2xl space-y-4 pt-4">
                        <ScrollReveal text-left>
                            <p className="eyebrow">Booking</p>
                            <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                                Reserve your stay
                            </h1>
                            <p className="text-sm text-text-muted md:text-base">
                                Choose dates and room, then continue to secure payment.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Left Side: Form */}
                        <div className="lg:col-span-7">
                            <ScrollReveal>
                                <div className="space-y-8">
                                    <BookingForm
                                        onSubmit={handleSubmit}
                                        guests={guests}
                                        onGuestsChange={setGuests}
                                    />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right Side: Summary */}
                        <div className="lg:col-span-5 relative">
                            <ScrollReveal delay={200}>
                                <div className="sticky top-28">
                                    <BookingSummary room={room} roomName={roomName} />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-white flex flex-col items-center justify-center text-primary-dark italic">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary-dark mb-4" />
            Preparing Your Retreat...
        </div>}>
            <BookingContent />
        </Suspense>
    );
}
