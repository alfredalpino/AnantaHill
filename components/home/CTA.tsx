"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-secondary">
      <div className="container-custom relative z-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.5em] text-[10px] font-bold text-primary mb-6 block"
          >
            Ready for your escape?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-ivory mb-8 leading-tight"
          >
            Discover the <br /> <span className="text-primary">Infinite Calm</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-ivory/90 text-lg mb-12 max-w-2xl mx-auto font-normal"
          >
            Whether it's a weekend getaway or a month-long retreat, find your sanctuary in the heart of Canary Hill. Your story begins at Ananta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/booking" className="bg-primary text-ivory px-10 py-5 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all shadow-luxury min-w-[240px]">
              Book Your Stay
            </Link>
            <Link href="/contact" className="border border-ivory/30 text-ivory px-10 py-5 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all min-w-[240px]">
              Plan An Event
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
