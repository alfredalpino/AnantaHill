"use client";

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Heart, Briefcase, PartyPopper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Events() {
  const eventTypes = [
    {
      title: "Royal Weddings",
      subtitle: "Begin Your Forever",
      desc: "Exchange vows against the backdrop of majestic hills. Our sprawling lawns and heritage-inspired ballrooms provide the perfect stage for your dream wedding.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      icon: <Heart />
    },
    {
      title: "Corporate Retreats",
      subtitle: "Inspire Excellence",
      desc: "Foster innovation and team spirit in a setting that breathes tranquility. Our modern conference facilities are equipped for productivity and rejuvenation.",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200",
      icon: <Briefcase />
    },
    {
      title: "Private Celebrations",
      subtitle: "Moments of Joy",
      desc: "From milestone birthdays to intimate anniversaries, celebrate your life's special moments in our exclusive private dining spaces and garden decks.",
      img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200",
      icon: <PartyPopper />
    }
  ];

  return (
    <div className="bg-ivory pt-32 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeader 
          subtitle="Occasions"
          title="Celebrations at the Hill"
        />

        <div className="grid grid-cols-1 gap-32">
          {eventTypes.map((type, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
            >
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cream rounded-full -z-10 blur-3xl opacity-50" />
                <div className="rounded-[40px] overflow-hidden shadow-luxury h-[450px] md:h-[550px] group relative">
                  <img src={type.img} alt={type.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cream border border-border flex items-center justify-center text-primary">
                    {type.icon}
                  </div>
                  <span className="uppercase tracking-widest text-[10px] font-bold text-primary">{type.subtitle}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-secondary mb-8">{type.title}</h3>
                <p className="text-secondary/70 text-lg leading-relaxed mb-10">
                  {type.desc}
                </p>
                <div className="space-y-4 mb-12">
                  {["Customized Gourmet Menus", "Dedicated Event Planner", "State-of-the-Art AV Equipment", "Exclusive Decor Options"].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-secondary/80 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="luxury-button px-10">
                  Plan Your Event
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venues Showcase */}
        <section className="mt-40">
          <SectionHeader 
            subtitle="The Venues"
            title="Elegant Spaces"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "The Grand Ballroom", cap: "500 Guests", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800" },
              { name: "Hillside Meadows", cap: "1000 Guests", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800" },
              { name: "The Heritage Deck", cap: "150 Guests", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" },
              { name: "Orchard Pavilion", cap: "80 Guests", img: "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?auto=format&fit=crop&q=80&w=800" }
            ].map((venue, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[300px] rounded-2xl overflow-hidden shadow-soft cursor-pointer"
              >
                <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-ivory font-serif text-xl">{venue.name}</h4>
                  <p className="text-ivory/70 text-[10px] uppercase tracking-luxury mt-1">{venue.cap}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
