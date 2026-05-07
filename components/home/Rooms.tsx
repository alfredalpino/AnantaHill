"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const roomImg = "/images/room.jpg";

const Rooms = () => {
  return (
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
            className="relative rounded-md overflow-hidden h-[450px] lg:h-[600px] group shadow-luxury border border-border/50"
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
  );
};

export default Rooms;
