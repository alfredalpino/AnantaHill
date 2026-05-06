"use client";

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Wind, Waves, CheckCircle2, Coffee, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const amenities = [
  { icon: <Wind />, title: "Mountain Yoga", desc: "Start your day with sunrise sessions overlooking the peaks." },
  { icon: <Waves />, title: "Infinity Pool", desc: "Heated outdoor pool with panoramic views of the valley." },
  { icon: <CheckCircle2 />, title: "Organic Farm", desc: "Harvest your own vegetables for a personalized meal." },
  { icon: <Coffee />, title: "Artisan Cafe", desc: "Freshly roasted local coffee and mountain-infused teas." },
  { icon: <Sparkles />, title: "Wellness Spa", desc: "Signature treatments using indigenous herbs and stones." },
  { icon: <MapPin />, title: "Nature Trails", desc: "Guided treks through the hidden paths of Canary Hill." },
];

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden p-0 bg-cream border-b border-border">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.4em] text-xs font-bold text-primary mb-6 block"
          >
            Our Philosophy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-secondary mb-8 leading-tight"
          >
            The Essence of <br /> <span className="italic font-light text-primary">Ananta</span>
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <SectionHeader 
              subtitle="The Journey"
              title="A Legacy of Tranquility"
            />
            <p className="text-secondary text-xl leading-relaxed mb-8 italic">
              "Ananta" translates to infinity—a reflection of the boundless peace and timeless beauty that defines our hill-side retreat.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-secondary/80 leading-relaxed"
            >
              <p>
                Founded on the belief that true luxury lies in the harmony between man and nature, Ananta was envisioned as a sanctuary for those seeking to escape the cacophony of modern life. Our location on Canary Hill provides a natural vantage point, where the sunrise paints the sky in hues of gold and the night sky is a tapestry of stars.
              </p>
              <p>
                Every stone used in our construction, every plant in our organic farm, and every recipe in our kitchen is a tribute to the local heritage of Jharkhand. We blend traditional craftsmanship with contemporary elegance to create an experience that is both authentic and refined.
              </p>
              <div className="pt-6">
                <Link href="/accommodations" className="luxury-button">
                  Experience Our Stay <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </motion.div>

            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-luxury h-[500px]">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200" alt="About Ananta" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-[32px] hidden md:block shadow-luxury">
                <p className="text-ivory font-serif text-2xl italic">"Where the hills <br /> find their home."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transferred Section: The Ananta Life */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-6">
          <SectionHeader 
            subtitle="The Ananta Life"
            title="Resort Amenities"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {amenities.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-ivory rounded-[32px] shadow-soft hover:shadow-luxury transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-serif text-secondary mb-4">{item.title}</h4>
                <p className="text-secondary/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary text-ivory text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to Write Your Story?</h2>
          <p className="text-ivory/60 max-w-2xl mx-auto mb-12 italic text-lg">
            Join us at Ananta and discover the peace you've been searching for. Our concierge is ready to craft your perfect escape.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="luxury-button">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
