"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const experiences = [
  {
    title: "Farm-to-Table",
    subtitle: "Dining Experience",
    desc: "Savor the freshest organic produce harvested directly from our hill-side farms.",
    img: "/images/food.webp"
  },
  {
    title: "Wellness Retreat",
    subtitle: "Hill-Top Serenity",
    desc: "Rejuvenate your spirit with our signature spa treatments and mountain yoga sessions.",
    img: "/images/mountain-view.webp"
  },
  {
    title: "Starlit Dinners",
    subtitle: "Private Evenings",
    desc: "Private dinners under the vast mountain sky, illuminated by bonfires and starlight.",
    img: "/images/night-pool.webp"
  }
];

const Experiences = () => {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-custom">
        <SectionHeader
          subtitle="Memories in the Making"
          title="Curated Experiences"
          centered="responsive"
        />

        <div className="grid md:grid-cols-3 gap-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative h-[400px] lg:h-[500px] rounded-md overflow-hidden shadow-luxury cursor-pointer border border-border/50"
            >
              <img
                src={exp.img}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-3 block drop-shadow-md"
                >
                  {exp.subtitle}
                </motion.span>
                
                <h3 className="text-2xl font-serif text-ivory mb-4 drop-shadow-lg">{exp.title}</h3>
                
                <div className="opacity-100 transition-all duration-700 ease-in-out">
                  <p className="text-ivory/80 text-sm leading-relaxed mb-8 font-light drop-shadow-sm">
                    {exp.desc}
                  </p>
                  <Link href="/dining" className="inline-flex items-center gap-2 text-primary text-[10px] uppercase tracking-luxury font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all drop-shadow-sm">
                    Explore Experience <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
