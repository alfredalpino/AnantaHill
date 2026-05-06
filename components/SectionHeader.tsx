"use client";

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader = ({ title, subtitle, centered = true, light = false }: SectionHeaderProps) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`uppercase tracking-luxury text-xs font-bold mb-4 block ${light ? 'text-ivory/80' : 'text-primary'}`}
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-serif ${light ? 'text-ivory' : 'text-secondary'}`}
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className={`h-px mt-8 ${centered ? 'mx-auto' : ''} ${light ? 'bg-ivory/30' : 'bg-primary/40'}`}
      />
    </div>
  );
};

export default SectionHeader;
