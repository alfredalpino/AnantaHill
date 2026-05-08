"use client";

import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [subject, setSubject] = useState("General Enquiry");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after some time if needed, or just stay as success
  };

  return (
    <div className="bg-ivory sm:pt-40 pt-32 sm:pb-20 pb-12 min-h-screen">
      <div className="container-custom">
        <SectionHeader 
          subtitle="Contact Us"
          title="Begin Your Journey"
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-cream sm:p-10 p-8 rounded-md border border-border shadow-soft"
            >
              <h3 className="text-2xl font-serif font-semibold mb-8">Reach Out</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-border flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Call Us</h4>
                    <a href="tel:+919942631802" className="text-secondary font-medium hover:text-primary transition-colors">+91 9942631802</a>
                    <p className="text-secondary/60 text-xs">Mon - Sun, 24/7</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-border flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Email Us</h4>
                    <a href="mailto:reservations@ananta.com" className="text-secondary font-medium hover:text-primary transition-colors block">reservations@ananta.com</a>
                    <a href="mailto:support@ananta.com" className="text-secondary/60 text-xs hover:text-primary transition-colors block">support@ananta.com</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory border border-border flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Visit Us</h4>
                    <p className="text-secondary font-medium leading-relaxed">
                      Canary Hill Rd, Hirabaug, <br />
                      Hazaribagh, Jharkhand 825301
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-border">
                <a 
                  href="https://wa.me/919942631802" 
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-md font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FaWhatsapp size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-ivory p-8 md:p-12 rounded-md border border-border shadow-luxury h-full"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <h3 className="text-2xl font-serif font-semibold mb-8 text-secondary">Send an Enquiry</h3>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">First Name</label>
                          <input required type="text" placeholder="John" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">Last Name</label>
                          <input required type="text" placeholder="Doe" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">Email Address</label>
                          <input required type="email" placeholder="john@example.com" className="w-full bg-cream border border-border px-6 py-4 rounded-md focus:outline-none focus:border-primary text-sm" />
                        </div>
                        <CustomSelect 
                          label="Subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          options={["General Enquiry", "Room Booking", "Wedding Celebration", "Corporate Event"]}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-secondary">Your Message</label>
                        <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-cream border border-border px-6 py-6 rounded-md focus:outline-none focus:border-primary text-sm resize-none"></textarea>
                      </div>

                      <button type="submit" className="luxury-button w-full md:w-auto px-12 gap-3">
                        Send Message <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-full py-20"
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-semibold text-secondary mb-4">Message Sent Successfully</h3>
                    <p className="text-secondary/60 max-w-sm mb-10 italic">
                      Thank you for reaching out. Our team will get back to you within the next 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary text-[10px] uppercase tracking-luxury font-bold border-b border-primary pb-1"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-md overflow-hidden h-[500px] shadow-luxury border border-border"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.2070274789867!2d85.38901109999999!3d24.0121705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f49dd5046726e3%3A0x4a5e87ccee39e142!2sAnanta%20By%20The%20Hill!5e1!3m2!1sen!2sin!4v1778131316538!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
