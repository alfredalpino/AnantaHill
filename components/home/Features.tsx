"use client";

import { Star, Moon, Music } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  {
    title: "Aesthetic Vibes",
    subtitle: "Curated elegance in hillside sanctuaries.",
    icon: Star,
  },
  {
    title: "Soulful Nights",
    subtitle: "Peace under starlit hill canopy.",
    icon: Moon,
  },
  {
    title: "Music Nights",
    subtitle: "Acoustic melodies in dining halls.",
    icon: Music,
  },
];

const Features = () => {
  return (
    <section className="bg-background py-8 md:py-16">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="feature-card flex items-start gap-5">
                <div className="rounded-2xl bg-primary/10 p-4 text-primary-dark">
                  <feature.icon className="h-8 w-8" aria-hidden />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-display text-xl text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
