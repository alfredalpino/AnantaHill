"use client";

import { motion, useAnimationControls } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { useEffect, useState, useRef } from 'react';

const testimonials = [
  {
    text: "A truly soul-stirring experience. The views from Canary Hill combined with Ananta's hospitality made our anniversary unforgettable.",
    author: "Vikram & Anjali",
    role: "Suites Guest"
  },
  {
    text: "An exquisite culinary journey. The mirrored elegance of the dining room combined with the authentic flavors of Jharkhand was the highlight of our stay.",
    author: "Ananya Sharma",
    role: "Dining Guest"
  },
  {
    text: "Modern luxury blended perfectly with heritage. The attention to detail in the architecture and service is unmatched in the region.",
    author: "Rajesh Khanna",
    role: "Corporate Guest"
  },
  {
    text: "The ultimate retreat from city life. The tranquility and the impeccable service made us feel like royalty. Truly a hidden gem.",
    author: "Priya Das",
    role: "Leisure Guest"
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [index, itemsToShow]);

  const handleNext = async () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    
    const nextIndex = index + 1;
    setIndex(nextIndex);

    await controls.start({
      x: `calc(-${(nextIndex * 100) / itemsToShow}% - ${(nextIndex * 24) / itemsToShow}px)`,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    });

    if (nextIndex >= testimonials.length) {
      await controls.set({ x: 0 });
      setIndex(0);
    }
    
    isTransitioning.current = false;
  };

  const handleDotClick = async (i: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setIndex(i);
    await controls.start({
      x: `calc(-${(i * 100) / itemsToShow}% - ${(i * 24) / itemsToShow}px)`,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    });
    isTransitioning.current = false;
  };

  // Duplicate testimonials for infinite loop look
  const displayItems = [...testimonials, ...testimonials];

  return (
    <section className="section-padding bg-ivory overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          subtitle="Testimonials"
          title="Guest Experiences"
          centered="responsive"
        />

        <div className="relative mt-12">
          <div className="overflow-hidden px-4 -mx-4" ref={containerRef}>
            <motion.div
              className="flex gap-6"
              animate={controls}
              initial={{ x: 0 }}
            >
              {displayItems.map((feedback, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsToShow}% - ${(24 * (itemsToShow - 1)) / itemsToShow}px)`
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (i % testimonials.length) * 0.1 }}
                    className="bg-cream p-8 md:p-10 rounded-md shadow-soft hover:shadow-luxury transition-all relative group border border-border/50 h-full flex flex-col justify-between"
                  >
                    <div>
                      <Quote className="text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 transition-colors" size={40} />
                      <div className="flex gap-1 mb-6 text-primary">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-secondary text-base md:text-lg leading-relaxed mb-8 italic">
                        "{feedback.text}"
                      </p>
                    </div>
                    <div className="pt-6 border-t border-border/50">
                      <h4 className="font-serif text-xl text-secondary">{feedback.author}</h4>
                      <p className="text-primary text-[10px] uppercase tracking-luxury font-bold mt-1">{feedback.role}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index % testimonials.length === i ? 'w-8 bg-primary' : 'w-2 bg-primary/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
