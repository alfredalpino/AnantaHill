"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import BookingWidget from '@/components/BookingWidget';
import SectionHeader from '@/components/SectionHeader';
import { ArrowRight, Star, Quote, CheckCircle2, MapPin, Wind, Waves, Coffee, Sparkles, Utensils, Leaf } from 'lucide-react';
import TableReservationModal from '@/components/TableReservationModal';

const roomImg = "/images/room.jpg";
const dishImg = "https://images.unsplash.com/photo-1550966841-3ee2cc6b1ff8?auto=format&fit=crop&q=80&w=800";



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
            src="/images/hero-bg.webp"
            alt="Ananta Resort"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Layer */}
        <div className="container-custom relative z-30 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="text-6xl md:text-[6rem] font-serif text-primary mb-8 tracking-tight"
            >
              Ananta <br className='md:hidden block' />
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="text-white"
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
                <Link href="/rooms" className="luxury-button px-14 sm:px-10 text-xs !bg-white !text-accent hover:!bg-primary hover:!text-white">
                  Explore Stay
                </Link>
                <button 
                  onClick={() => setIsTableModalOpen(true)}
                  className="px-14 sm:px-10 py-5 border border-white/70 text-white text-xs uppercase tracking-[0.3em] font-medium transition-all hover:bg-white hover:text-accent self-center bg-white/10 backdrop-blur-sm"
                >
                  Reserve Table
                </button>
              </div>
            </motion.div>
          </div>
        </div>


      </section>

      {/* Booking Section Hidden for now
      <section className="p-0 bg-ivory">
        <BookingWidget />
      </section>
      */}

      {/* About/Story Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
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
              <Link href="/our-story" className="luxury-button-outline group">
                Discover More <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
            </motion.div>

            <div className="h-[500px] md:h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="rounded-md overflow-hidden shadow-luxury h-full"
              >
                <img src="/images/main.webp" alt="Ananta Resort" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Curated Experiences */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
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
                className="group relative h-[500px] rounded-md overflow-hidden shadow-luxury cursor-pointer border border-border/50"
              >
                <img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-3 block drop-shadow-md"
                  >
                    {exp.subtitle}
                  </motion.span>
                  
                  <h3 className="text-3xl font-serif text-ivory mb-4 drop-shadow-lg">{exp.title}</h3>
                  
                  <div className="opacity-100 transition-all duration-700 ease-in-out">
                    <p className="text-ivory/80 text-sm leading-relaxed mb-8 font-light drop-shadow-sm">
                      {exp.desc}
                    </p>
                    <Link href="/dining" className="inline-flex items-center gap-2 text-primary text-[10px] uppercase tracking-luxury font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all drop-shadow-sm">
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
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="text-left">
              <span className="uppercase tracking-luxury text-xs font-bold text-primary mb-4 block">Stay with Us</span>
              <h2 className="text-4xl md:text-6xl font-serif text-secondary">The Collection</h2>
            </div>
            <Link href="/rooms" className="luxury-button-outline px-10 py-3">
              View All Rooms
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-md overflow-hidden h-[500px] lg:h-[600px] group shadow-luxury border border-border/50"
            >
              <img src={roomImg} alt="Royal Suite" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-10 md:p-16">
                <span className="text-ivory text-xs uppercase tracking-luxury mb-2 font-bold">Heritage Experience</span>
                <h3 className="text-3xl md:text-5xl text-ivory font-serif mb-6">The Royal Ananta Suite</h3>

                <div className="flex items-center gap-10">
                  <span className="text-ivory font-bold">Rs. 25,000 / night</span>
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
                className="relative rounded-md overflow-hidden group shadow-luxury md:h-[280px] h-[320px] border border-border/50"
              >
                <img src={roomImg} alt="Hill View" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors cursor-pointer">
                  <Link href="/booking?room=Hill View Deluxe" className="absolute inset-0" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-2xl text-ivory font-serif">Hill View Deluxe</h3>
                  <p className="text-ivory text-xs mt-2 uppercase tracking-luxury font-bold">Starting from Rs. 12,000</p>

                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative rounded-md overflow-hidden group shadow-luxury md:h-[280px] h-[320px] border border-border/50"
              >
                <img src={roomImg} alt="Garden Cottage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors cursor-pointer">
                  <Link href="/booking?room=Garden Cottage" className="absolute inset-0" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-2xl text-ivory font-serif">Garden Cottage</h3>
                  <p className="text-ivory text-xs mt-2 uppercase tracking-luxury font-bold">Starting from Rs. 15,000</p>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="section-padding bg-cream/30 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            {/* Visual Side */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative rounded-md overflow-hidden shadow-luxury h-[500px] md:h-[650px] w-full"
              >
                <img src="/images/restaurant.webp" alt="The Ananta Dining Room" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-black/5" />
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
              <div>
                <SectionHeader
                  centered={false}
                  subtitle="Culinary Narrative"
                  title="A Symphony of Hillside Flavors"
                />
                <p className="text-secondary text-lg leading-relaxed font-light italic">
                  "At Ananta, every meal is a tribute to the land. Our kitchen celebrates the rugged beauty of Canary Hill through refined heritage recipes and the freshest harvests from our organic gardens."
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-primary shrink-0 shadow-soft group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Heritage Fine Dining</h4>
                    <p className="text-secondary/70 text-sm leading-relaxed">A curated fusion of local heritage flavors and global culinary techniques.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center text-primary shrink-0 shadow-soft group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">The Mirrored Hall</h4>
                  <p className="text-secondary/70 text-sm leading-relaxed">Dine amidst golden reflections and soft evening glows for an immersive sensory escape.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <button onClick={() => setIsTableModalOpen(true)} className="luxury-button text-xs">
                  Reserve a Table
                </button>
                <Link href="/dining" className="luxury-button-outline text-xs">
                  Explore The Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="section-padding bg-ivory overflow-hidden">
        <div className="container-custom">
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
                text: "An exquisite culinary journey. The mirrored elegance of the dining room combined with the authentic flavors of Jharkhand was the highlight of our stay. The Dhuska platter is a must-try!",
                author: "Ananya Sharma",
                role: "Dining Guest"
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

      {/* Modern CTA Section */}
      <section className="relative section-padding overflow-hidden bg-secondary">
        <div className="container-custom relative z-20 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              className="text-5xl md:text-7xl font-sans text-ivory mb-8 leading-tight"
            >
              Discover the <br /> <span className="text-primary">Infinite Calm</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-ivory/90 text-lg mb-12 max-w-2xl mx-auto font-normal"
            >
              Whether it's a weekend getaway or a month-long retreat, find your sanctuary in the heart of Canary Hill. Your story begins at Ananta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link href="/booking" className="bg-primary text-ivory px-10 py-5 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all shadow-luxury min-w-[240px]">
                Book Your Stay
              </Link>
              <Link href="/contact" className="border border-ivory/30 text-ivory px-10 py-5 rounded-md text-xs uppercase tracking-luxury font-bold hover:bg-ivory hover:text-secondary transition-all min-w-[240px]">
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
