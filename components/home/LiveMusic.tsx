"use client";

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const musicEvents = [
  {
    title: "Acoustic Sunsets",
    img: "/images/music-event/event-1.jpeg",
    status: "Upcoming"
  },
  {
    title: "Jazz & Spirits",
    img: "/images/music-event/event-2.jpeg",
    status: "Past"
  },
  {
    title: "Starlit Rhythms",
    img: "/images/music-event/event-3.jpeg",
    status: "Past"
  }
];

const LiveMusic = () => {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-custom">
        <SectionHeader
          subtitle="Soulful Evenings"
          title="Live Music & Events"
          centered="responsive"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {musicEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group flex flex-col"
            >
              <div className="relative h-[450px] lg:h-[550px] rounded-md overflow-hidden mb-6">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                
                {/* Status Tag */}
                <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm z-20 ${
                  event.status === "Upcoming" ? "bg-primary text-white" : "bg-white/40 text-secondary backdrop-blur-md border border-white/20"
                }`}>
                  {event.status}
                </div>
              </div>

              <div className="text-center px-4">
                <h3 className="text-2xl font-serif text-secondary group-hover:text-primary transition-colors">{event.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMusic;
