"use client";

import { motion } from 'framer-motion';
import { Star, Moon, Music } from 'lucide-react';

const features = [
  {
    title: "Aesthetic Vibes",
    subtitle: "Indulge in the curated elegance of our hillside sanctuaries.",
    icon: <Star size={24} className="text-primary" />,
  },
  {
    title: "Soulful Nights",
    subtitle: "Find peace under the starlit canopy of Canary Hill.",
    icon: <Moon size={24} className="text-primary" />,
  },
  {
    title: "Music Nights",
    subtitle: "Savor live acoustic melodies in our mirrored dining halls.",
    icon: <Music size={24} className="text-primary" />,
  },
];

const Features = () => {
  return (
    <section className="pb-16 bg-ivory">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-soft flex items-center gap-6 border border-border/40 group hover:shadow-luxury transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif text-secondary mb-1">{feature.title}</h3>
                <p className="text-secondary/50 text-[11px] uppercase tracking-widest font-bold leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
