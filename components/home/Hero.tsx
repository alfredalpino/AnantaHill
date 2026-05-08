"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface HeroProps {
  onReserveTable: () => void;
}

const Hero = ({ onReserveTable }: HeroProps) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-black">
      {/* Cinematic Image Layer */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
          src="/images/hero-1.webp"
          alt="Ananta Resort"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Layer */}
      <div className="container-custom relative z-30 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="text-6xl md:text-[5rem] font-serif text-primary sm:mb-8 mb-5 tracking-tight"
          >
            Ananta <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="text-white text-5xl md:text-[5rem]"
            >
               By The Hill
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="max-w-lg mx-auto sm:space-y-12 space-y-6"
          >
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
              Boutique hillside retreat crafted for calm stays, private celebrations, and unforgettable escapes.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:gap-8 gap-4">
              <Link 
                href="/rooms" 
                className="luxury-button px-12 text-[15px] !py-4 h-[56px] min-w-[200px] flex items-center justify-center !bg-primary !text-white hover:!bg-white hover:!text-primary"
              >
                Explore Stay
              </Link>
              <button 
                onClick={onReserveTable}
                className="px-12 py-4 h-[56px] min-w-[200px] border border-white text-white text-[15px] capitalize tracking-wide font-medium transition-all hover:bg-white hover:text-primary flex items-center justify-center bg-white/10 backdrop-blur-sm"
              >
                Reserve Table
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
