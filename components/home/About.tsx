"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const About = () => {
  return (
    <section className="section-shell bg-white">
      <div className="container-shell">
        <div className="section-head">
          <ScrollReveal>
            <p className="eyebrow mb-2">Our journey</p>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
              The Ananta story
            </h2>
            <p className="text-base leading-relaxed text-text-body mt-4">
              Perched gracefully on the serene slopes of Canary Hill, Ananta is more than just a destination; it's a whisper of the hills, a breath of fresh air, and a tribute to refined living.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="flex flex-col items-center gap-10 md:gap-12 lg:flex-row lg:gap-14">
            <div className="aspect-4/3 w-full overflow-hidden rounded-2xl shadow-premium lg:w-[46%] lg:max-w-140 lg:shrink-0">
              <Image
                src="/images/main.webp"
                alt="Ananta Resort"
                width={960}
                height={720}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full max-w-xl space-y-4 sm:space-y-5 lg:flex-1">
              <p className="eyebrow text-accent">Hillside Haven</p>
              <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
                Luxury meets nature
              </h3>
              <p className="text-base leading-relaxed text-text-body sm:text-lg">
                Inspired by the heritage of grand estates and the simplicity of nature, we have crafted a space where every corner tells a story of luxury, comfort, and peace.
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2">
                {[
                  "Colonial Architecture",
                  "Panoramic Hill Views",
                  "Private Orchards",
                  "Refined Hospitality"
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm font-medium text-text-primary"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-dark" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/our-story"
                className="btn-outline inline-flex"
              >
                Read our story
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
