"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [subject, setSubject] = useState("General Enquiry");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen">
            <section className="relative flex h-[38vh] min-h-[280px] items-center justify-center overflow-hidden bg-secondary md:h-[42vh]">
                <div className="relative z-10 container-shell text-center">
                    <ScrollReveal>
                        <h1 className="mb-3 font-display text-3xl font-bold text-text-primary md:text-5xl">
                            Begin Your Journey
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm text-text-body md:text-base">
                            Reach out to us for bookings, events, or any inquiries. We're here to ensure your experience at Ananta is unforgettable.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section-shell bg-background">
                <div className="container-shell">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <ScrollReveal>
                                <div className="space-y-8">
                                    <h3 className="font-display text-2xl font-bold text-text-primary">Reach Out</h3>
                                    
                                    <div className="space-y-8">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-1">Call Us</h4>
                                                <a href="tel:+919942631802" className="text-text-primary font-bold hover:text-primary-dark transition-colors">+91 9942631802</a>
                                                <p className="text-text-muted text-xs">Mon - Sun, 24/7</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-1">Email Us</h4>
                                                <a href="mailto:reservations@ananta.com" className="text-text-primary font-bold hover:text-primary-dark transition-colors block">reservations@ananta.com</a>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-1">Visit Us</h4>
                                                <p className="text-text-primary font-bold leading-relaxed">
                                                    Canary Hill Rd, Hirabaug, <br />
                                                    Hazaribagh, Jharkhand 825301
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <a 
                                            href="https://wa.me/919942631802" 
                                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg"
                                        >
                                            <FaWhatsapp size={20} />
                                            Chat on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <ScrollReveal delay={200}>
                                <div className="card-premium p-8 md:p-12">
                                    {!isSubmitted ? (
                                        <>
                                            <h3 className="font-display text-2xl font-bold text-text-primary mb-8">Send an Enquiry</h3>
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-muted">First Name</label>
                                                        <input type="text" placeholder="John" className="w-full bg-secondary/30 border border-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Last Name</label>
                                                        <input type="text" placeholder="Doe" className="w-full bg-secondary/30 border border-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm" />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Email Address</label>
                                                        <input type="email" placeholder="john@example.com" className="w-full bg-secondary/30 border border-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Subject</label>
                                                        <select 
                                                            value={subject}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                            className="w-full bg-secondary/30 border border-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-primary-dark text-sm appearance-none"
                                                        >
                                                            <option>General Enquiry</option>
                                                            <option>Room Booking</option>
                                                            <option>Wedding Celebration</option>
                                                            <option>Corporate Event</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Your Message</label>
                                                    <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-secondary/30 border border-secondary px-4 py-6 rounded-xl focus:outline-none focus:border-primary-dark text-sm resize-none"></textarea>
                                                </div>

                                                <button type="submit" className="btn-primary w-full md:w-auto px-12 py-4 gap-3 flex items-center justify-center">
                                                    Send Message <Send size={16} />
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center py-10">
                                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark mb-6">
                                                <CheckCircle2 size={40} />
                                            </div>
                                            <h3 className="font-display text-2xl font-bold text-text-primary mb-4">Message Sent Successfully</h3>
                                            <p className="text-text-muted max-w-sm mb-10">
                                                Thank you for reaching out. Our team will get back to you within the next 24 hours.
                                            </p>
                                            <button 
                                                onClick={() => setIsSubmitted(false)}
                                                className="text-primary-dark font-bold text-sm underline underline-offset-4"
                                            >
                                                Send another message
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    <div className="mt-20">
                        <ScrollReveal>
                            <div className="rounded-2xl overflow-hidden h-[500px] shadow-premium border border-secondary">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.2070274789867!2d85.38901109999999!3d24.0121705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f49dd5046726e3%3A0x4a5e87ccee39e142!2sAnanta%20By%20The%20Hill!5e1!3m2!1sen!2sin!4v1778131316538!5m2!1sen!2sin" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
