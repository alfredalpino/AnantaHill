"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Utensils, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface RestaurantProps {
  onReserveTable: () => void;
}

const Restaurant = ({ onReserveTable }: RestaurantProps) => {
  return (
    <section className="section-shell bg-secondary/30">
      <div className="container-shell">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Visual Side */}
          <div className="w-full lg:w-1/2">
            <ScrollReveal>
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-premium">
                <Image
                  src="/images/restaurant.webp"
                  alt="The Ananta Dining Room"
                  fill
                  className="object-cover transition-transform duration-[2s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </ScrollReveal>
          </div>

          {/* Content Side */}
          <div className="w-full space-y-10 lg:w-1/2">
            <ScrollReveal delay={200}>
              <div className="section-head text-left mx-0">
                <p className="eyebrow mb-2">Culinary Narrative</p>
                <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
                  A Symphony of Hillside Flavors
                </h2>
                <p className="mt-6 text-base leading-relaxed text-text-body md:text-lg">
                  At Ananta, every meal is a tribute to the land. Our kitchen celebrates the rugged beauty of Canary Hill through refined heritage recipes and the freshest harvests from our organic gardens.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-10">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary-dark shrink-0 shadow-sm group-hover:bg-primary-dark group-hover:text-white transition-all duration-500">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-text-primary mb-2">Heritage Fine Dining</h4>
                    <p className="text-text-body text-base leading-relaxed">A curated fusion of local heritage flavors and global culinary techniques.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary-dark shrink-0 shadow-sm group-hover:bg-primary-dark group-hover:text-white transition-all duration-500">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-text-primary mb-2">The Mirrored Hall</h4>
                    <p className="text-text-body text-base leading-relaxed">Dine amidst golden reflections and soft evening glows for an immersive sensory escape.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mt-12">
                <button 
                  onClick={onReserveTable} 
                  className="btn-primary px-10 py-4 text-base font-bold text-center"
                >
                  Reserve a Table
                </button>
                <Link 
                  href="/dining" 
                  className="btn-outline px-10 py-4 text-base font-bold text-center"
                >
                  Explore The Menu
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
