"use client";

import Image from "next/image";
import { ArrowRight, MapPin, Waves, Wine, UtensilsCrossed, PartyPopper, BedDouble } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const amenities = [
  { label: "Swimming Pool", icon: Waves },
  { label: "Bar & Lounge", icon: Wine },
  { label: "Fine Dining", icon: UtensilsCrossed },
  { label: "Banquet & Events", icon: PartyPopper },
  { label: "Luxury Stay", icon: BedDouble },
] as const;

export default function Hero() {
  const scrollToStory = () => {
    document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home-hero-section"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-accent pb-28 sm:pb-32 md:pb-36 lg:pb-40"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/night-pool.webp"
          alt="Ananta By The Hill resort at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
      </div>

      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={140}
        height={140}
        className="decor-leaf left-0 top-24 opacity-50 md:top-28"
        aria-hidden
      />
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={140}
        height={140}
        className="decor-leaf right-0 top-32 -scale-x-100 opacity-40"
        aria-hidden
      />

      <div className="relative z-10 w-full">
        <div className="container-shell flex flex-col items-start pt-28 text-left md:pt-32">
          <ScrollReveal delay={80}>
            <p className="hero-eyebrow mb-4 md:mb-5">
              A luxury resort hotel &amp; banquet in Hazaribagh
            </p>

            <h1 className="font-display text-[3.25rem] font-bold uppercase leading-[0.92] tracking-[0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Ananta
            </h1>

            <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
              <span className="h-px w-8 bg-primary sm:w-12" aria-hidden />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-primary sm:text-base md:text-lg">
                By The Hill
              </p>
              <span className="h-px w-8 bg-primary sm:w-12" aria-hidden />
            </div>

            <p className="hero-script mt-5 md:mt-6">Escape. Indulge. Unwind.</p>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/90 sm:text-[15px] md:mt-7 md:max-w-xl md:text-base">
              Perched on the serene slopes of Canary Hill, Ananta is a hillside haven where
              refined hospitality, warm evenings by the pool, and unforgettable celebrations
              come together in the heart of Hazaribagh.
            </p>

            <ul className="mt-8 flex gap-x-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 sm:flex-wrap sm:overflow-visible sm:gap-x-8 md:gap-x-10 [&::-webkit-scrollbar]:hidden">
              {amenities.map(({ label, icon: Icon }) => (
                <li key={label} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="hero-amenity-icon">
                    <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.25} aria-hidden />
                  </span>
                  <span className="max-w-[88px] text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-white/90 sm:max-w-none sm:text-[10px]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToStory}
              className="group mt-9 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-primary-light transition-colors hover:text-white sm:mt-10"
            >
              Discover more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-28 left-4 right-4 z-10 sm:bottom-32 sm:left-auto sm:right-4 sm:max-w-[200px] sm:text-right md:bottom-36 lg:right-8 lg:max-w-[220px]">
        <div className="flex items-start gap-2 text-primary-light sm:justify-end">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <div>
            <p className="text-sm font-semibold text-white">Hazaribagh, Jharkhand</p>
            <p className="mt-1 text-xs leading-relaxed text-white/75 italic">
              Where every moment feels like a getaway
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
