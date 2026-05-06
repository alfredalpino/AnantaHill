"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import BookingWidget from '@/components/BookingWidget';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRight, Star, Quote, CheckCircle2, MapPin, Wind, Waves, Coffee, Sparkles, Utensils } from 'lucide-react';
import TableReservationModal from '@/components/TableReservationModal';

const roomImg = "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1200";



export default function Home() {
  const heroRef = useRef(null);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden p-0">
        <motion.div 
          style={{ y, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90 z-10" />
          {/* Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
            src="/images/hero-bg.webp" 
            alt="Ananta Resort" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="container mx-auto px-6 relative z-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-primary/50" />
            <span className="uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold text-ivory">
              Where Time Stands Still
            </span>
            <div className="h-[1px] w-12 bg-primary/50" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="text-7xl md:text-[11rem] font-serif text-ivory mb-12 leading-[0.8] tracking-tighter"
          >
            Ananta <br /> 
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              className="italic font-light text-[#D4B887] text-5xl md:text-8xl tracking-normal mt-4 block"
            >
              By The Hill
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full px-6 md:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              <Link href="/accommodations" className="luxury-button w-full md:min-w-[240px] py-5 flex items-center justify-center">
                Explore Sanctuary
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              <Link href="/about" className="luxury-button-outline w-full md:min-w-[240px] py-5 border-ivory/75 text-ivory hover:bg-ivory hover:text-secondary group flex items-center justify-center gap-3">
                Discover Our Story
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Booking Section Hidden for now
      <section className="p-0 bg-ivory">
        <BookingWidget />
      </section>
      */}

      {/* About/Story Section */}
      <section className="section-padding bg-ivory">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <SectionHeader 
                centered={false}
                subtitle="Our Story"
                title="Timeless Elegance in Nature's Lap"
              />
              <p className="text-secondary text-lg leading-relaxed mb-6">
                Perched gracefully on the serene slopes of Canary Hill, Ananta is more than just a destination; it's a whisper of the hills, a breath of fresh air, and a tribute to refined living.
              </p>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Inspired by the heritage of grand estates and the simplicity of nature, we have crafted a space where every corner tells a story of luxury, comfort, and peace.
              </p>
              <Link href="/about" className="luxury-button-outline group">
                Discover More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </motion.div>

            <div className="h-[500px] md:h-[600px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="rounded-[40px] overflow-hidden shadow-luxury h-full"
              >
                <img src="/images/main.webp" alt="Ananta Resort" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Curated Experiences */}
      <section className="section-padding bg-ivory">
        <div className="container mx-auto px-6">
          <SectionHeader 
            subtitle="Memories in the Making"
            title="Curated Experiences"
          />
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
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
            ].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-luxury cursor-pointer"
              >
                <img 
                  src={exp.img} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block"
                    >
                      {exp.subtitle}
                    </motion.span>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-ivory mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{exp.title}</h3>
                  
                  <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                    <p className="text-ivory/90 text-sm leading-relaxed mb-8 italic font-medium">
                      {exp.desc}
                    </p>
                    <Link href="/dining" className="inline-flex items-center gap-2 text-primary text-[10px] uppercase tracking-luxury font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all">
                      Explore Experience <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="section-padding bg-ivory">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="text-left">
              <span className="uppercase tracking-luxury text-xs font-bold text-primary mb-4 block">Stay with Us</span>
              <h2 className="text-4xl md:text-6xl font-serif text-secondary">The Collection</h2>
            </div>
            <Link href="/accommodations" className="luxury-button-outline px-10 py-3 text-[10px]">
              View All Rooms
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[40px] overflow-hidden h-[500px] lg:h-[600px] group shadow-luxury"
            >
              <img src={roomImg} alt="Royal Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 md:p-16">
                <span className="text-ivory text-xs uppercase tracking-luxury mb-2 font-bold">Heritage Experience</span>
                <h3 className="text-3xl md:text-5xl text-ivory font-serif mb-6">The Royal Ananta Suite</h3>
                
                <div className="flex items-center gap-10">
                  <span className="text-ivory font-bold">₹25,000 / night</span>
                  <Link href="/booking?room=The Royal Ananta Suite" className="text-ivory text-xs uppercase tracking-widest border-b border-ivory pb-1 hover:text-primary hover:border-primary transition-all">Book Now</Link>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative rounded-[32px] overflow-hidden h-[230px] md:h-[280px] group shadow-luxury"
              >
                <img src={roomImg} alt="Hill View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors cursor-pointer">
                  <Link href="/booking?room=Hill View Deluxe" className="absolute inset-0" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-2xl text-ivory font-serif">Hill View Deluxe</h3>
                  <p className="text-ivory text-xs mt-2 uppercase tracking-luxury font-bold">Starting from ₹12,000</p>
                  
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative rounded-[32px] overflow-hidden flex-1 group shadow-luxury min-h-[230px]"
              >
                <img src={roomImg} alt="Garden Cottage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors cursor-pointer">
                  <Link href="/booking?room=Garden Cottage" className="absolute inset-0" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-2xl text-ivory font-serif">Garden Cottage</h3>
                  <p className="text-ivory text-xs mt-2 uppercase tracking-luxury font-bold">Starting from ₹15,000</p>
                  
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-[40px] overflow-hidden shadow-luxury h-[500px]">
                <img src="/images/restaurant.webp" alt="Restaurant" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <SectionHeader 
                centered={false}
                subtitle="Culinary Excellence"
                title="The Orchid Garden Restaurant & Bar"
              />
              <p className="text-secondary text-lg leading-relaxed mb-8 italic">
                Experience a symphony of flavors in a setting of modern sophistication and warm, golden light.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-primary shrink-0 shadow-soft">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif mb-1">Fine Dining</h4>
                    <p className="text-secondary/80 text-sm font-medium">A curated menu of local and international delicacies, served in an atmosphere of refined elegance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-primary shrink-0 shadow-soft">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif mb-1">The Signature Bar</h4>
                    <p className="text-secondary/80 text-sm font-medium">Enjoy a premium selection of spirits and artisanal cocktails at our sophisticated mirrored bar.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setIsTableModalOpen(true)} className="luxury-button">Reserve a Table</button>
                <Link href="/dining" className="luxury-button-outline">View Full Menu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Feedback Section */}
      <section className="section-padding bg-ivory overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader 
            subtitle="Testimonials"
            title="Guest Experiences"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "A truly soul-stirring experience. The views from Canary Hill combined with Ananta's hospitality made our anniversary unforgettable.",
                author: "Vikram & Anjali",
                role: "Suites Guest"
              },
              {
                text: "The farm-to-table dining is exceptional. You can literally taste the freshness of the hills in every bite. A sanctuary in the truest sense.",
                author: "Dr. Sarah Mitchell",
                role: "Cottage Guest"
              },
              {
                text: "Modern luxury blended perfectly with heritage. The attention to detail in the architecture and service is unmatched in the region.",
                author: "Rajesh Khanna",
                role: "Corporate Guest"
              }
            ].map((feedback, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="bg-cream p-10 rounded-[40px] shadow-soft hover:shadow-luxury transition-all relative group border border-border/50"
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

      {/* Modern CTA Section */}
      <section className="relative py-32 overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[url('/images/main.webp')] bg-cover bg-center opacity-20 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="uppercase tracking-[0.5em] text-[10px] font-bold text-primary mb-6 block"
            >
              Ready for your escape?
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif text-ivory mb-8 leading-tight"
            >
              Discover the <br /> <span className="italic font-light text-primary">Infinite Calm</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-ivory/90 text-lg mb-12 italic max-w-xl font-medium"
            >
              Whether it's a weekend getaway or a month-long retreat, find your sanctuary in the heart of Canary Hill. Your story begins at Ananta.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link href="/booking" className="bg-primary text-ivory px-10 py-5 rounded-full text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all shadow-luxury">
                Book Your Stay
              </Link>
              <Link href="/contact" className="border border-ivory/30 text-ivory px-10 py-5 rounded-full text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all">
                Plan An Event
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      <TableReservationModal 
        isOpen={isTableModalOpen} 
        onClose={() => setIsTableModalOpen(false)} 
      />
    </div>
  );
}
