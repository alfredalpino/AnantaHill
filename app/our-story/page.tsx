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

export default function OurStory() {
  return (
    <div className="flex flex-col bg-ivory">
      {/* Narrative Header */}
      <section className="pt-32 pb-20 bg-ivory">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="uppercase tracking-[0.5em] text-xs font-bold text-primary mb-4 block">Est. 2018</span>
            <h1 className="text-5xl md:text-7xl font-serif text-secondary mb-12 tracking-tighter leading-[1.2]">
              A Legacy of <br />
              <span className="text-primary font-normal">Hillside Tranquility</span>
            </h1>
            <p className="text-secondary/70 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-light italic">
              "Ananta" translates to infinity—a reflection of the boundless peace and timeless beauty that defines our hillside retreat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border/50 bg-cream/30">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Acres of Nature", value: "50+" },
              { label: "Luxury Suites", value: "24" },
              { label: "Elevation (ft)", value: "1200" },
              { label: "Guest Satisfaction", value: "99%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-primary mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-secondary/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-secondary/80 text-lg leading-relaxed"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-8">Harmony with Nature</h2>
              <p>
                Founded on the belief that true luxury lies in the harmony between man and nature, Ananta was envisioned as a sanctuary for those seeking to escape the cacophony of modern life. Our location on Canary Hill provides a natural vantage point, where the sunrise paints the sky in hues of gold.
              </p>
              <p>
                Every stone used in our construction, every plant in our organic farm, and every recipe in our kitchen is a tribute to the local heritage of Jharkhand. We blend traditional craftsmanship with contemporary elegance to create an experience that is both authentic and refined.
              </p>
              <div className="pt-6">
                <Link href="/rooms" className="luxury-button">
                  View Our Rooms <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </motion.div>

            <div className="relative">
              <div className="rounded-md overflow-hidden shadow-luxury h-[400px] md:h-[600px] relative">
                <img src="/images/lawn.webp" alt="About Ananta" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-secondary/10" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -left-10 bg-primary p-12 rounded-md hidden md:block shadow-luxury border-8 border-ivory"
              >
                <p className="text-ivory font-serif text-3xl italic leading-tight">"Where the hills <br /> find their home."</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ananta Life */}
      <section className="section-padding bg-cream/50">
        <div className="container-custom">
          <SectionHeader
            subtitle="The Ananta Life"
            title="Curated Amenities"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-ivory rounded-md shadow-soft hover:shadow-luxury transition-all flex items-start gap-8 group border border-border/10 hover:border-primary/20"
              >
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-cream flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-ivory transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-2xl font-serif text-secondary group-hover:text-primary transition-colors leading-tight">{item.title}</h4>
                  <p className="text-secondary/60 text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
