"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const CTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#063124] py-20 md:py-28 lg:py-32">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/night-pool.webp"
          alt="Ananta Experience"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
        />
        {/* Responsive green gradient overlay */}
        <div className="absolute inset-0 bg-[#063124]/85 md:bg-transparent md:bg-gradient-to-r md:from-transparent md:via-[#063124]/95 md:to-[#063124] z-[1]" />
      </div>

      {/* Elegant Leaf Corner Decor Images */}
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={160}
        height={160}
        className="absolute left-0 bottom-0 rotate-90 opacity-40 select-none pointer-events-none z-[2] md:w-48 md:h-48"
        aria-hidden
      />
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={160}
        height={160}
        className="absolute right-0 top-0 -scale-y-100 opacity-45 select-none pointer-events-none z-[2] md:w-48 md:h-48"
        aria-hidden
      />
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={160}
        height={160}
        className="absolute right-0 bottom-0 rotate-180 opacity-40 select-none pointer-events-none z-[2] md:w-48 md:h-48"
        aria-hidden
      />

      {/* Main content shell */}
      <div className="container-shell relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center w-full">
          <div className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5 flex flex-col items-start text-left">
            <ScrollReveal>
              {/* Gold script tagline */}
              <h2 className="font-manstromer text-[#ebd083] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal leading-[1.05] mb-8 filter drop-shadow-md select-none">
                Wish to wake <br />
                up in the wild? <br />
                Granted.
              </h2>

              {/* Current Buttons container */}
              <div className="flex mb-8 w-full">
                <Link
                  href="/booking"
                  className="bg-transparent border-2 border-primary text-[#ebd083] hover:text-white px-12 py-4 text-base font-semibold rounded-tr-2xl rounded-bl-2xl rounded-tl-none rounded-br-none text-center whitespace-nowrap transition-all duration-300 hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98] inline-block w-full sm:w-auto"
                >
                  Book your stay
                </Link>
              </div>

              {/* Subtitle */}
              <p className="font-body text-white/85 text-sm sm:text-base tracking-wide mb-6">
                Experience our spectacular Wellness Retreat
              </p>

              {/* Decorative dash indicator */}
              <div className="flex gap-2.5 items-center mt-2">
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
