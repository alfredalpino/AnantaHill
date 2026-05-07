"use client";

import { useState } from 'react';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Experiences from '@/components/home/Experiences';
import Rooms from '@/components/home/Rooms';
import Restaurant from '@/components/home/Restaurant';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import TableReservationModal from '@/components/TableReservationModal';

export default function Home() {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Hero onReserveTable={() => setIsTableModalOpen(true)} />
      <About />
      <Experiences />
      <Rooms />
      <Restaurant onReserveTable={() => setIsTableModalOpen(true)} />
      <Testimonials />
      <CTA />

      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
    </div>
  );
}
