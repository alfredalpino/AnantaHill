"use client";

import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const musicEvents = [
  {
    title: "Acoustic Sunsets",
    img: "/images/music-event/event-1.jpeg",
    status: "Upcoming"
  },
  {
    title: "Jazz & Spirits",
    img: "/images/music-event/event-2.jpeg",
    status: "Past"
  },
  {
    title: "Starlit Rhythms",
    img: "/images/music-event/event-3.jpeg",
    status: "Past"
  }
];

const LiveMusic = () => {
  return (
    <section className="section-shell relative overflow-hidden bg-[#F5EBE4]">
      {/* Decorative leaf corner drawings */}
      <Image
        src="/graphics/leaf-root.png"
        alt=""
        width={280}
        height={280}
        className="absolute -left-8 -top-8 opacity-40 select-none pointer-events-none"
        aria-hidden
      />
      <Image
        src="/graphics/hero-graphic-2.png"
        alt=""
        width={160}
        height={160}
        className="pointer-events-none md:block hidden absolute -bottom-36 -scale-x-100 opacity-40 -right-8"
        aria-hidden
      />
      <div className="container-shell relative z-10">
        <div className="section-head text-center">
          <ScrollReveal>
            <p className="eyebrow mb-2">Soulful Evenings</p>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
              Live Music & Events
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {musicEvents.map((event, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-luxury mb-6 border border-secondary/50">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Status Tag */}
                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm z-20 ${event.status === "Upcoming" ? "bg-primary-dark text-white" : "bg-white/80 text-text-muted backdrop-blur-md border border-white/40"
                    }`}>
                    {event.status}
                  </div>
                </div>

                <div className="text-center px-4 mt-2">
                  <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-primary-dark transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMusic;
