"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Utensils, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

interface RestaurantProps {
  onReserveTable: () => void;
}

const Restaurant = ({ onReserveTable }: RestaurantProps) => {
  return (
    <section className="section-padding bg-cream/30 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative rounded-md overflow-hidden shadow-luxury h-[400px] md:h-[650px] w-full"
            >
              <img src="/images/restaurant.webp" alt="The Ananta Dining Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
            <div>
              <SectionHeader
                centered={false}
                subtitle="Culinary Narrative"
                title="A Symphony of Hillside Flavors"
              />
              <p className="text-secondary text-lg leading-relaxed font-light italic">
                "At Ananta, every meal is a tribute to the land. Our kitchen celebrates the rugged beauty of Canary Hill through refined heritage recipes and the freshest harvests from our organic gardens."
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-primary shrink-0 shadow-soft group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Utensils size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Heritage Fine Dining</h4>
                  <p className="text-secondary/70 text-sm leading-relaxed">A curated fusion of local heritage flavors and global culinary techniques.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-primary shrink-0 shadow-soft group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">The Mirrored Hall</h4>
                <p className="text-secondary/70 text-sm leading-relaxed">Dine amidst golden reflections and soft evening glows for an immersive sensory escape.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <button onClick={onReserveTable} className="luxury-button text-xs min-w-[275px]">
                Reserve a Table
              </button>
              <Link href="/dining" className="luxury-button-outline text-xs min-w-[275px] text-center">
                Explore The Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
