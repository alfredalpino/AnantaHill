"use client";

import { useState } from 'react';
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

export default function Home() {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  return (
    <div className="relative">
      <Hero onReserveTable={() => setIsTableModalOpen(true)} />

      <ScrollReveal delay={100}>
        <About />
      </ScrollReveal>

      {/* <ScrollReveal delay={150}>
        <Features />
      </ScrollReveal> */}

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
        <CTA />
      </ScrollReveal>

      <ScrollReveal delay={700}>
        <Testimonials />
      </ScrollReveal>

      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
    </div>
  );
}
