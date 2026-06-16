"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const CTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#a6853c] py-20 md:py-28 lg:py-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/our-story.jpeg"
          alt="Ananta Experience"
          width={1920}
          height={1080}
          quality={95}
          loading="lazy"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
        />
        {/* Responsive gold gradient overlay */}
        <div className="absolute inset-0 bg-[#a6853c]/85 md:bg-transparent md:bg-gradient-to-r md:from-transparent md:via-[#a6853c]/95 md:to-[#a6853c] z-[1]" />
      </div>

      {/* Decorative leaf corner drawings */}
      <Image
        src="/graphics/hero-graphic-1.png"
        alt=""
        width={160}
        height={160}
        className="absolute -right-10 -top-8 opacity-50 -scale-x-100 select-none pointer-events-none"
        aria-hidden
      />
      <Image
        src="/graphics/leaf-graphic.png"
        alt=""
        width={160}
        height={160}
        className="sm:block hidden pointer-events-none absolute bottom-0 scale-x-100 opacity-50 -right-4"
        aria-hidden
      />

      {/* Main content shell */}
      <div className="container-shell relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center w-full">
          <div className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5 flex flex-col items-start text-left">
            <ScrollReveal>
              {/* Script tagline */}
              <h2 className="font-script text-white text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.2] mb-8 select-none">
                Elevated by Nature, <br />
                Exquisite by Experience, <br />
                Yours to Indulge.
              </h2>

              {/* Action Badge */}
              <div className="mb-6">
                <Link
                  href="/booking"
                  className="inline-block px-8 py-3 rounded-2xl border border-white text-white hover:bg-white hover:text-[#a6853c] transition-all duration-300 font-body tracking-wide"
                >
                  Ananta By The Hill
                </Link>
              </div>

              {/* Description paragraph */}
              <p className="font-body text-white/90 text-base sm:text-lg leading-relaxed mb-6 max-w-md">
                A luxury resort by the hill with world-class amenities, a sparkling pool, and breathtaking views — designed for unforgettable stays.
              </p>

              {/* Decorative dash indicator */}
              <div className="flex gap-2.5 items-center mt-4">
                <span className="h-[2px] w-8 bg-[#ebd083] rounded-full" />
                <span className="h-[2px] w-8 bg-white/30 rounded-full" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
