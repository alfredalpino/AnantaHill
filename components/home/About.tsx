"use client";

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  "Colonial Architecture",
  "Private Orchards",
  "Panoramic Hill Views",
  "Refined Hospitality",
];

const About = () => {
  return (
    <section id="our-story" className="section-shell relative overflow-hidden bg-[#F5EBE4] !pt-20 sm:!pt-24 md:!pt-28 z-10">
      <Image
        src="/graphics/hero-graphic-1.png"
        alt=""
        width={160}
        height={240}
        className="pointer-events-none absolute -left-6 md:-top-16 -top-20 opacity-60"
        aria-hidden
      />
      <Image
        src="/graphics/leaf-graphic.png"
        alt=""
        width={240}
        height={234}
        className="pointer-events-none w-48 md:w-60 absolute sm:top-24 bottom-8 opacity-60 sm:-right-12 -right-8"
        aria-hidden
      />

      <div className="container-shell relative z-[1]">
        <div className="section-head">
          <ScrollReveal>
            <p className="eyebrow mb-2">Our journey</p>
            <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
              The Ananta story
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-body md:text-lg">
              Perched gracefully on the serene slopes of Canary Hill, Ananta is more than just a
              destination; it&apos;s a whisper of the hills, a breath of fresh air, and a tribute to
              refined living.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="flex flex-col items-center gap-10 md:gap-12 lg:flex-row lg:gap-14">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xl shadow-premium lg:w-[46%] lg:max-w-140 lg:shrink-0">
              <Image
                src="/images/our-story.jpeg"
                alt="Ananta resort pool and pergolas by day"
                width={960}
                height={720}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="w-full max-w-xl space-y-4 sm:space-y-5 lg:flex-1">
              <p className="eyebrow">Hillside haven</p>
              <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
                Luxury meets nature
              </h3>
              <p className="text-base leading-relaxed text-text-body sm:text-lg">
                Inspired by the heritage of grand estates and the simplicity of nature, we have
                crafted a space where every corner tells a story of luxury, comfort, and peace.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm font-medium text-text-primary"
                  >
                    <span className="story-bullet" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/our-story" className="btn-outline mt-2 inline-flex">
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
