"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BookingSuccessProps {
  roomName: string;
}

const BookingSuccess = ({ roomName }: BookingSuccessProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-cream p-12 rounded-md shadow-luxury text-center border border-border"
      >
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 text-3xl">✓</div>
        <h2 className="text-3xl font-semibold text-secondary mb-4">Reservation Sent</h2>
        <p className="text-secondary/60 mb-10 italic">
          Thank you for choosing Ananta. Our concierge will contact you within 30 minutes to finalize your stay in the {roomName}.
        </p>
        <Link href="/" className="luxury-button inline-block">Return Home</Link>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
