"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const About = () => {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <SectionHeader
              centered={false}
              subtitle="Our Journey"
              title="The Ananta Story"
            />
            <p className="text-secondary text-lg leading-relaxed mb-6">
              Perched gracefully on the serene slopes of Canary Hill, Ananta is more than just a destination; it's a whisper of the hills, a breath of fresh air, and a tribute to refined living.
            </p>
            <p className="text-secondary text-lg leading-relaxed mb-10">
              Inspired by the heritage of grand estates and the simplicity of nature, we have crafted a space where every corner tells a story of luxury, comfort, and peace.
            </p>
            <Link href="/our-story" className="luxury-button-outline group">
              Discover More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>

          <div className="h-[400px] md:h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="rounded-md overflow-hidden shadow-luxury h-full"
            >
              <img src="/images/main.webp" alt="Ananta Resort" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
