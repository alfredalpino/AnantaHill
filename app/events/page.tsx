"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Briefcase, PartyPopper } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function EventsPage() {
    const eventTypes = [
        {
            title: "Royal Weddings",
            subtitle: "Begin Your Forever",
            desc: "Exchange vows against the backdrop of majestic hills. Our sprawling lawns and heritage-inspired ballrooms provide the perfect stage for your dream wedding.",
            img: "/images/lawn.webp",
            icon: Heart
        },
        {
            title: "Corporate Retreats",
            subtitle: "Inspire Excellence",
            desc: "Foster innovation and team spirit in a setting that breathes tranquility. Our modern conference facilities are equipped for productivity and rejuvenation.",
            img: "/images/lounge-view.webp",
            icon: Briefcase
        },
        {
            title: "Private Celebrations",
            subtitle: "Moments of Joy",
            desc: "From milestone birthdays to intimate anniversaries, celebrate your life's special moments in our exclusive private dining spaces and garden decks.",
            img: "/images/night-pool.webp",
            icon: PartyPopper
        }
    ];

    return (
        <div className="min-h-screen">
            <section className="relative flex h-[38vh] min-h-[280px] items-center justify-center overflow-hidden bg-secondary md:h-[42vh]">
                <div className="relative z-10 container-shell text-center">
                    <ScrollReveal>
                        <h1 className="mb-3 font-display text-3xl font-bold text-text-primary md:text-5xl">
                            Celebrations at the Hill
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm text-text-body md:text-base">
                            From majestic weddings to intimate gatherings, we provide the perfect backdrop for life's most cherished moments.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/contact"
                                className="btn-primary inline-flex px-8 py-3 text-sm font-semibold"
                            >
                                Plan your event
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section-shell bg-background">
                <div className="container-shell">
                    <div className="space-y-20 md:space-y-32">
                        {eventTypes.map((type, i) => (
                            <ScrollReveal key={i}>
                                <div
                                    className={`flex flex-col items-center gap-10 md:gap-12 lg:flex-row lg:gap-14 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    <div className="aspect-4/3 w-full overflow-hidden rounded-2xl shadow-premium lg:w-[48%] lg:shrink-0">
                                        <Image
                                            src={type.img}
                                            alt={type.title}
                                            width={960}
                                            height={720}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    <div className="w-full max-w-xl space-y-4 sm:space-y-5 lg:flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                                                <type.icon size={20} />
                                            </div>
                                            <p className="eyebrow text-accent">{type.subtitle}</p>
                                        </div>
                                        <h3 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                                            {type.title}
                                        </h3>
                                        <p className="text-base leading-relaxed text-text-body sm:text-lg">
                                            {type.desc}
                                        </p>
                                        <ul className="grid grid-cols-1 gap-2.5 sm:gap-3 sm:grid-cols-2">
                                            {[
                                                "Customized Gourmet Menus",
                                                "Dedicated Event Planner",
                                                "State-of-the-Art AV",
                                                "Exclusive Decor Options"
                                            ].map((f) => (
                                                <li
                                                    key={f}
                                                    className="flex items-center gap-2 text-sm font-medium text-text-primary"
                                                >
                                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-dark" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href="/contact"
                                            className="btn-outline inline-flex"
                                        >
                                            Inquire now
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-shell bg-secondary/30">
                <div className="container-shell">
                    <div className="section-head text-center">
                        <ScrollReveal>
                            <p className="eyebrow mb-2">The Venues</p>
                            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-5xl">
                                Elegant Spaces
                            </h2>
                        </ScrollReveal>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: "The Grand Ballroom", cap: "500 Guests", img: "/images/restaurant.webp" },
                            { name: "Hillside Meadows", cap: "1000 Guests", img: "/images/lawn-2.webp" },
                            { name: "The Heritage Deck", cap: "150 Guests", img: "/images/pool.webp" },
                            { name: "Orchard Pavilion", cap: "80 Guests", img: "/images/main.webp" }
                        ].map((venue, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="group relative h-[350px] overflow-hidden rounded-2xl shadow-premium">
                                    <Image src={venue.img} alt={venue.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <h4 className="text-white font-bold font-display text-xl">{venue.name}</h4>
                                        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mt-1">{venue.cap}</p>
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
