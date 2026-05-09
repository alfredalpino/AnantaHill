"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

interface HeroProps {
  onReserveTable: () => void;
}

export default function Hero({ onReserveTable }: HeroProps) {
  return (
    <section
      id="home-hero-section"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-accent"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-1.webp"
          alt="Ananta Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/40 via-black/20 to-black/50"
        aria-hidden
      />

      <div className="relative z-10 container-shell flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <ScrollReveal delay={120}>
          <h1 className="mb-4 uppercase font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-7xl lg:text-8xl">
            Ananta
          </h1>
          <p className="eyebrow mb-6 text-primary md:text-lg">
            By The Hill
          </p>
          <div className="mx-auto mb-8 max-w-xl space-y-4 text-sm leading-relaxed text-white/95 sm:text-base md:text-lg">
            <p>
              Boutique hillside retreat crafted for calm stays, private celebrations, and unforgettable escapes.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/rooms"
              className="btn-primary inline-flex max-w-72 w-full sm:mx-0 mx-auto justify-center px-10 py-4 text-base font-semibold sm:w-auto"
            >
              Explore Stay
            </Link>
            <button
              onClick={onReserveTable}
              className="btn-outline inline-flex max-w-72 w-full sm:mx-0 mx-auto justify-center border-2 border-white/90 bg-white/5 px-10 py-4 text-base text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-primary-dark sm:w-auto"
            >
              Reserve Table
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
