"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const experiences = [
  {
    title: "Dining Experience",
    desc: "Savor the freshest organic produce harvested directly from our hill-side farms.",
    img: "/images/food.webp",
    href: "/dining"
  },
  {
    title: "Wellness Retreat",
    desc: "Rejuvenate your spirit with our signature spa treatments and mountain yoga sessions.",
    img: "/images/mountain-view.webp",
    href: "/rooms"
  },
  {
    title: "Starlit Dinners",
    desc: "Private dinners under the vast mountain sky, illuminated by bonfires and starlight.",
    img: "/images/night-pool.webp",
    href: "/dining"
  }
];

const Experiences = () => {
  return (
    <section className="section-shell bg-[#827546] relative overflow-hidden py-20">
      {/* Decorative leaf corner drawings */}
      <Image
        src="/graphics/leaf-graphic.png"
        alt=""
        width={220}
        height={214}
        className="absolute -left-10 sm:top-0 -top-10 -scale-x-100 opacity-50 select-none pointer-events-none"
        aria-hidden
      />
      <Image
        src="/graphics/leaf-graphic.png"
        alt=""
        width={220}
        height={214}
        className="sm:block hidden absolute -right-5 sm:-right-10 top-0 opacity-50 select-none pointer-events-none"
        aria-hidden
      />

      <div className="container-shell relative z-10">
        <div className="section-head text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#ebd083] mb-3">
              Memories in the Making
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Curated experiences
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-white/90 mt-4 max-w-3xl mx-auto">
              Experiences shaped by land, season, and intention, so your time here feels grounded, not staged.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group relative flex flex-col bg-[#74683d] rounded-[32px] overflow-hidden shadow-luxury transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_5px_30px_rgba(0,0,0,0.35)] h-full">
                {/* Image Container */}
                <div className="relative w-full h-[250px] sm:h-[280px] md:h-[260px] lg:h-[300px] overflow-hidden rounded-t-[32px]">
                  <Image
                    src={exp.img}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {/* Smooth blend gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#74683d] via-[#74683d]/40 to-transparent z-10" />
                </div>

                {/* Content Container */}
                <div className="p-8 pt-0 flex flex-col items-start relative z-20 flex-grow">
                  {/* Lotus Icon Badge */}
                  <div className="relative -mt-7 mb-4 z-20 flex items-center justify-center w-14 h-14 rounded-full border border-[#ebd083]/45 bg-[#74683d] shadow-premium overflow-hidden">
                    <Image
                      src="/graphics/lotus.png"
                      alt="Lotus Icon"
                      width={36}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  <h3 className="font-display text-2xl lg:text-3xl text-white font-medium mb-3">
                    {exp.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-6 font-light flex-grow">
                    {exp.desc}
                  </p>
                  
                  <Link 
                    href={exp.href} 
                    className="inline-flex items-center gap-2 text-[#ebd083] text-sm font-semibold tracking-wider hover:text-white transition-colors duration-300 group/link mt-auto"
                  >
                    Explore experience
                    <ArrowRight className="w-4 h-4 stroke-[#ebd083] transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
