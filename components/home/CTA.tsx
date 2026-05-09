"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const CTA = () => {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden md:min-h-[500px]">
      <div className="absolute inset-0 scale-105 transition-transform duration-[20s] ease-out hover:scale-100">
        <Image
          src="/images/night-pool.webp"
          alt="Ananta Experience"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container-shell max-w-3xl text-center">
        <ScrollReveal>
          <p className="eyebrow mb-4 text-primary">Begin your journey</p>
          <h2 className="mb-8 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
            Ready for a different pace?
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Link
              href="/booking"
              className="btn-primary px-10 py-4 text-base font-semibold"
            >
              Book your stay
            </Link>
            <Link
              href="/contact"
              className="btn-outline border-2 border-white/90 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-primary-dark"
            >
              Contact concierge
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
