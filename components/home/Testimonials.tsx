"use client";

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const testimonials = [
  {
    text: "A truly soul-stirring experience. The views from Canary Hill combined with Ananta's hospitality made our anniversary unforgettable.",
    author: "Vikram & Anjali",
    role: "Suites Guest"
  },
  {
    text: "An exquisite culinary journey. The mirrored elegance of the dining room combined with the authentic flavors of Jharkhand was the highlight of our stay. The Dhuska platter is a must-try!",
    author: "Ananya Sharma",
    role: "Dining Guest"
  },
  {
    text: "Modern luxury blended perfectly with heritage. The attention to detail in the architecture and service is unmatched in the region.",
    author: "Rajesh Khanna",
    role: "Corporate Guest"
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-ivory overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          subtitle="Testimonials"
          title="Guest Experiences"
          centered="responsive"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((feedback, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-cream p-10 rounded-md shadow-soft hover:shadow-luxury transition-all relative group border border-border/50"
            >
              <Quote className="text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 transition-colors" size={40} />
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>
              <p className="text-secondary text-lg leading-relaxed mb-8 italic">
                "{feedback.text}"
              </p>
              <div className="pt-6 border-t border-border/50">
                <h4 className="font-serif text-xl text-secondary">{feedback.author}</h4>
                <p className="text-primary text-[10px] uppercase tracking-luxury font-bold mt-1">{feedback.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
