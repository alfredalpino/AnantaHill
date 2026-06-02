"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Experiences from '@/components/home/Experiences';
import Rooms from '@/components/home/Rooms';
import Restaurant from '@/components/home/Restaurant';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import Features from '@/components/home/Features';
import TableReservationModal from '@/components/TableReservationModal';
import LiveMusic from '@/components/home/LiveMusic';
import ScrollReveal from '@/components/ScrollReveal';

const BookingBar = dynamic(() => import('@/components/BookingBar'), { ssr: false });

export default function Home() {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Hero />
        <BookingBar
          variant="compact"
          className="absolute left-1/2 top-full z-30 w-[92%] max-w-[1280px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <ScrollReveal delay={100}>
        <About />
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <Features />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <Rooms />
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <Experiences />
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <Restaurant onReserveTable={() => setIsTableModalOpen(true)} />
      </ScrollReveal>

      <ScrollReveal delay={500}>
        <LiveMusic />
      </ScrollReveal>

      <ScrollReveal delay={600}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal delay={700}>
        <CTA />
      </ScrollReveal>

      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
    </div>
  );
}
