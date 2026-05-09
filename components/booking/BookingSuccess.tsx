"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface BookingSuccessProps {
  roomName: string;
}

const BookingSuccess = ({ roomName }: BookingSuccessProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white p-10 md:p-16 rounded-3xl shadow-premium text-center border border-secondary-dark"
      >
        <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">Reservation Sent</h2>
        <p className="text-text-body text-base md:text-lg mb-10 leading-relaxed">
          Thank you for choosing Ananta. Our concierge will contact you within 30 minutes to finalize your stay in the <strong className="text-primary-dark">{roomName}</strong>.
        </p>
        <Link href="/" className="btn-primary inline-flex">Return Home</Link>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
