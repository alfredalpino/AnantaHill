"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Wind, Waves, Coffee, Leaf, MapPin, Trees } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const amenities = [
  { icon: Wind, title: "Mountain Yoga", desc: "Start your day with sunrise sessions overlooking the peaks." },
  { icon: Waves, title: "Infinity Pool", desc: "Heated outdoor pool with panoramic views of the valley." },
  { icon: Trees, title: "Organic Farm", desc: "Harvest your own vegetables for a personalized meal." },
  { icon: Coffee, title: "Artisan Cafe", desc: "Freshly roasted local coffee and mountain-infused teas." },
  { icon: Leaf, title: "Orchard Lawns", desc: "Expansive alfresco spaces for evening events and starlit strolls." },
  { icon: MapPin, title: "Nature Trails", desc: "Guided treks through the hidden paths of Canary Hill." },
];

export default function OurStoryPage() {
    return (
        <div className="min-h-screen">
            {/* Narrative Header */}
            <section className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden bg-secondary md:h-[60vh]">
                <div className="relative z-10 container-shell text-center">
                    <ScrollReveal>
                        <p className="eyebrow mb-4 text-accent">Est. 2018</p>
                        <h1 className="mb-6 font-display text-4xl font-bold text-text-primary md:text-6xl lg:text-7xl">
                            A Legacy of <br />
                            <span className="text-primary-dark">Hillside Tranquility</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-base italic text-text-body md:text-xl">
                            "Ananta" translates to infinity—a reflection of the boundless peace and timeless beauty that defines our hillside retreat.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-y border-secondary bg-white/50 py-10 md:py-16">
                <div className="container-shell">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                        {[
                            { label: "Acres of Nature", value: "50+" },
                            { label: "Luxury Suites", value: "24" },
                            { label: "Elevation (ft)", value: "1200" },
                            { label: "Guest Satisfaction", value: "99%" },
                        ].map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="text-center">
                                    <div className="font-display text-3xl font-bold text-primary-dark md:text-5xl">{stat.value}</div>
                                    <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-shell bg-background">
                <div className="container-shell">
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
                        <div className="w-full space-y-6 lg:w-1/2">
                            <ScrollReveal>
                                <h2 className="font-display text-3xl font-bold text-text-primary md:text-5xl leading-tight">
                                    Harmony with Nature
                                </h2>
                                <div className="mt-8 space-y-6 text-base leading-relaxed text-text-body md:text-lg">
                                    <p>
                                        Founded on the belief that true luxury lies in the harmony between man and nature, Ananta was envisioned as a sanctuary for those seeking to escape the cacophony of modern life. Our location on Canary Hill provides a natural vantage point, where the sunrise paints the sky in hues of gold.
                                    </p>
                                    <p>
                                        Every stone used in our construction, every plant in our organic farm, and every recipe in our kitchen is a tribute to the local heritage of Jharkhand. We blend traditional craftsmanship with contemporary elegance to create an experience that is both authentic and refined.
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <Link href="/rooms" className="btn-primary inline-flex px-8">
                                        View our rooms
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ScrollReveal delay={200}>
                                <div className="relative aspect-3/3 overflow-hidden rounded-2xl shadow-premium">
                                    <Image
                                        src="/images/lawn.webp"
                                        alt="Ananta Grounds"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-8 left-8 right-8 rounded-xl bg-white/90 p-6 backdrop-blur-md shadow-lg border border-white/50 hidden md:block">
                                        <p className="font-display text-2xl font-bold italic text-primary-dark">
                                            "Where the hills find their home."
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amenities Grid */}
            <section className="section-shell bg-secondary/30">
                <div className="container-shell">
                    <div className="section-head text-center">
                        <ScrollReveal>
                            <p className="eyebrow mb-2">The Ananta Life</p>
                            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-5xl">
                                Curated Amenities
                            </h2>
                        </ScrollReveal>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {amenities.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="feature-card flex flex-col gap-6 p-8 md:p-10">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-dark">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-2xl font-bold text-text-primary mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-text-body text-base leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
