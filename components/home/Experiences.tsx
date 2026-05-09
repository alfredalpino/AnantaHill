"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const experiences = [
  {
    title: "Dining Experience",
    desc: "Savor the freshest organic produce harvested directly from our hill-side farms.",
    img: "/images/food.webp"
  },
  {
    title: "Wellness Retreat",
    desc: "Rejuvenate your spirit with our signature spa treatments and mountain yoga sessions.",
    img: "/images/mountain-view.webp"
  },
  {
    title: "Starlit Dinners",
    desc: "Private dinners under the vast mountain sky, illuminated by bonfires and starlight.",
    img: "/images/night-pool.webp"
  }
];

const Experiences = () => {
  return (
    <section className="section-shell bg-background">
      <div className="container-shell">
        <div className="section-head">
          <ScrollReveal>
            <p className="eyebrow mb-2">Memories in the Making</p>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
              Curated experiences
            </h2>
            <p className="text-base leading-relaxed text-text-body mt-4">
              Experiences shaped by land, season, and intention, so your time here feels grounded, not staged.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group relative h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-premium">
                <Image
                  src={exp.img}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium">
                    {exp.desc}
                  </p>
                  <Link href="/dining" className="inline-flex items-center gap-2 text-white text-sm font-bold group/link">
                    Explore experience
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
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
