"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for window.onload
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-8 flex justify-center"
            >
              <Image 
                src="/logo.png" 
                alt="Ananta Logo" 
                width={200} 
                height={80} 
                className="h-28 w-auto object-contain"
              />
            </motion.div>
            
            {/* Loading Bar Container */}
            <div className="w-64 h-[1px] bg-accent/5 relative overflow-hidden mx-auto">
              {/* Progress Line */}
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: [0.19, 1, 0.22, 1] 
                }}
                className="absolute top-0 bottom-0 w-32 bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
