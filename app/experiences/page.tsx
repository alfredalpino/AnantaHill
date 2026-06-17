"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TableReservationModal from '@/components/TableReservationModal';

export default function ExperiencesPage() {
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    // Reusable Ornament Separator
    const GoldOrnament = () => (
        <div className="flex items-center justify-start gap-4 my-4 w-full max-w-md">
            <div className="h-[1.5px] flex-1 bg-[#bda660]" />
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <Image
                    src="/graphics/lotus.png"
                    alt=""
                    width={44}
                    height={44}
                    className="object-contain"
                />
            </div>
            <div className="h-[1.5px] flex-1 bg-[#bda660]" />
        </div>
    );

    return (
        <div className="min-h-screen text-[#261E1E]">

            {/* 1. Header Section */}
            <section className="bg-[#FAF6F0] pt-12 pb-8 md:pt-16 md:pb-10 relative overflow-hidden">
                {/* Header Framing Leaves */}
                <div className="absolute left-0 md:top-1/2 top-[30%] -translate-y-[45%] -translate-x-[26%] sm:opacity-80 opacity-25 w-40 sm:w-52 md:w-64 aspect-square pointer-events-none select-none z-0">
                    <Image
                        src="/graphics/event-leaf-left.png"
                        alt=""
                        fill
                        sizes="(max-w-768px) 208px, 256px"
                        className="object-contain"
                    />
                </div>
                <div className="absolute right-0 md:top-1/2 top-[30%] -translate-y-[45%] translate-x-[26%] sm:opacity-80 opacity-25 w-40 sm:w-52 md:w-64 aspect-square pointer-events-none select-none z-0">
                    <Image
                        src="/graphics/event-leaf-right.png"
                        alt=""
                        fill
                        sizes="(max-w-768px) 208px, 256px"
                        className="object-contain"
                    />
                </div>

                <div className="container-shell relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
                    <ScrollReveal>
                        <h1 className="font-pinyon text-7xl sm:text-8xl md:text-[9.5rem] text-[#bda660] leading-none mb-2 font-normal">
                            Experiences
                        </h1>
                    </ScrollReveal>

                    {/* Lotus Divider */}
                    <ScrollReveal delay={100} className="w-full">
                        <div className="flex items-center justify-center gap-6 my-4 w-full max-w-xl mx-auto px-4">
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#bda660]/90" />
                            <div className="relative w-10 h-6 flex items-center justify-center shrink-0">
                                <Image
                                    src="/graphics/lotus.png"
                                    alt="Lotus symbol"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                />
                            </div>
                            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#bda660]/90" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <p className="font-body text-[#261E1E] text-sm sm:text-base font-semibold tracking-wider max-w-xl mx-auto leading-relaxed mt-4 px-2">
                            Explore our diverse range of exquisite lounge spaces, perfectly tailored for intimate family gatherings, grand celebrations, and memorable dining experiences.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. Solid Full-Width Gold Bar */}
            <div className="w-full h-[4px] bg-[#bda660] relative z-10" />

            {/* 3. Rooftop Section */}
            <section className="bg-[#FAF6F0] py-10 md:py-14 relative overflow-hidden z-10">
                {/* Framing gold leaf on the right edge of screen */}
                <div className="hidden md:block absolute right-0 top-2/3 -translate-y-1/2 translate-x-[28%] opacity-80 w-48 sm:w-60 md:w-80 lg:w-[24rem] aspect-square pointer-events-none select-none z-0">
                    <Image
                        src="/graphics/event-leaf-right.png"
                        alt=""
                        fill
                        sizes="(max-w-768px) 240px, (max-w-1024px) 320px, 384px"
                        className="object-contain"
                    />
                </div>

                <div className="container-shell relative z-10 px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                            {/* Image */}
                            <div className="order-2 lg:order-1 w-full h-[240px] sm:h-[350px] md:h-[400px] relative overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(38,30,30,0.1)]">
                                <Image
                                    src="/images/rooftop.jpeg"
                                    alt="Rooftop bar lounge view"
                                    fill
                                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 550px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="order-1 lg:order-2 flex flex-col items-start justify-center text-left px-2 sm:px-6">
                                <div className="relative z-10 flex flex-col items-start">

                                    {/* Icon & Title Row */}
                                    <div className="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-4 mb-4">
                                        <div className="shrink-0 flex items-center justify-start">
                                            <Image
                                                src="/graphics/event-rooftop.png"
                                                alt="Rooftop Icon"
                                                width={180}
                                                height={180}
                                                className="object-contain h-full w-48 md:w-52"
                                            />
                                        </div>
                                        <h2 className="font-pinyon text-6xl sm:text-7xl lg:text-8xl text-[#261E1E] leading-none font-normal sm:pt-0 pt-4">
                                            Rooftop
                                        </h2>
                                    </div>

                                    <p className="font-body font-medium text-[#4a3e3e] text-sm sm:text-base leading-relaxed max-w-md my-2">
                                        Enjoy breathtaking views and a relaxing ambiance perfect for evening gatherings and celebrations.
                                    </p>

                                    <GoldOrnament />

                                    <button
                                        onClick={() => setIsReservationOpen(true)}
                                        className="btn-primary flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                                    >
                                        <CalendarDays className="w-4 h-4" />
                                        Reserve a Table
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 4. Lawn Sitting Section */}
            <section className="bg-[#F2EDE4] py-10 md:py-14 relative overflow-hidden z-10">
                {/* Framing gold leaf on the left edge of screen */}
                <div className="hidden md:block absolute left-0 top-2/3 -translate-y-1/2 -translate-x-[28%] opacity-80 w-48 sm:w-60 md:w-80 lg:w-[24rem] aspect-square pointer-events-none select-none z-0">
                    <Image
                        src="/graphics/event-leaf-left.png"
                        alt=""
                        fill
                        sizes="(max-w-768px) 240px, (max-w-1024px) 320px, 384px"
                        className="object-contain"
                    />
                </div>

                <div className="container-shell relative z-10 px-4 sm:px-6">
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                            {/* Content (Desktop Left) */}
                            <div className="order-1 lg:order-1 flex flex-col items-start justify-center text-left px-2 sm:px-6">
                                <div className="relative z-10 flex flex-col items-start">

                                    {/* Icon & Title Row (Stacked for Lawn Sitting) */}
                                    <div className="flex flex-col items-start justify-start gap-2 md:gap-3 mb-4">
                                        <div className="shrink-0 flex items-center justify-start">
                                            <Image
                                                src="/graphics/event-lawn.png"
                                                alt="Lawn Sitting Icon"
                                                width={180}
                                                height={150}
                                                className="object-contain h-full w-48 md:w-52"
                                            />
                                        </div>
                                        <h2 className="font-pinyon text-6xl sm:text-7xl lg:text-8xl text-[#261E1E] leading-none font-normal pt-2">
                                            Lawn Sitting
                                        </h2>
                                    </div>

                                    <p className="font-body font-medium text-[#4a3e3e] text-sm sm:text-base leading-relaxed max-w-md my-2">
                                        Surrounded by greenery, our lawn area offers a serene setting for daytime events.
                                    </p>

                                    <GoldOrnament />

                                    <button
                                        onClick={() => setIsReservationOpen(true)}
                                        className="btn-primary flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                                    >
                                        <CalendarDays className="w-4 h-4" />
                                        Reserve a Table
                                    </button>
                                </div>
                            </div>

                            {/* Image (Desktop Right) */}
                            <div className="order-2 lg:order-2 w-full h-[240px] sm:h-[350px] md:h-[400px] relative overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(38,30,30,0.1)]">
                                <Image
                                    src="/images/our-story.jpeg"
                                    alt="Poolside lawn sitting area"
                                    fill
                                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 550px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 5. Dining & Planning Section */}
            <section className="bg-[#FAF6F0] py-10 md:py-14 relative overflow-hidden z-10">
                {/* Framing gold leaf on the right edge of screen */}
                <div className="hidden md:block absolute right-0 top-1/3 translate-x-[28%] opacity-80 w-48 sm:w-60 md:w-80 lg:w-[24rem] aspect-square pointer-events-none select-none z-0">
                    <Image
                        src="/graphics/event-leaf-right.png"
                        alt=""
                        fill
                        sizes="(max-w-768px) 240px, (max-w-1024px) 320px, 384px"
                        className="object-contain"
                    />
                </div>

                <div className="container-shell relative z-10 px-4 sm:px-6">
                    {/* Dining Row */}
                    <ScrollReveal>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                            {/* Image */}
                            <div className="order-2 lg:order-1 w-full h-[240px] sm:h-[350px] md:h-[400px] relative overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(38,30,30,0.1)]">
                                <Image
                                    src="/images/restaurant.webp"
                                    alt="Elegant dining interior area"
                                    fill
                                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 550px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="order-1 lg:order-2 flex flex-col items-start justify-center text-left px-2 sm:px-6">
                                <div className="relative z-10 flex flex-col items-start">

                                    {/* Icon & Title Row */}
                                    <div className="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-4 mb-4">
                                        <div className="shrink-0 flex items-center justify-start">
                                            <Image
                                                src="/graphics/event-dining.png"
                                                alt="Dining Icon"
                                                width={180}
                                                height={150}
                                                className="object-contain h-full w-48 md:w-52"
                                            />
                                        </div>
                                        <h2 className="font-pinyon text-6xl sm:text-7xl lg:text-8xl text-[#261E1E] leading-none font-normal">
                                            Dining
                                        </h2>
                                    </div>

                                    <p className="font-body font-medium text-[#4a3e3e] text-sm sm:text-base leading-relaxed max-w-md my-2">
                                        Savor delicious cuisine in a warm and inviting space designed for memorable dining experiences.
                                    </p>

                                    <GoldOrnament />

                                    <button
                                        onClick={() => setIsReservationOpen(true)}
                                        className="btn-primary flex items-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                                    >
                                        <CalendarDays className="w-4 h-4" />
                                        Reserve a Table
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Planning Special Event Card */}
                    <ScrollReveal>
                        <div className="bg-[#f5eedb] border border-[#bda660]/20 rounded-3xl px-6 sm:px-8 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto mt-24 sm:mt-32 mb-8 relative z-10 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <Image
                                        src="/graphics/event-plan.png"
                                        alt="Planning Icon"
                                        width={72}
                                        height={72}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="font-display text-xl sm:text-2xl font-bold text-[#261E1E]">
                                        Planning a special event?
                                    </h4>
                                    <p className="font-body text-[#5c5252] text-sm sm:text-base">
                                        Let us help you create unforgettable memories.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/contact"
                                className="border-2 border-[#a48f4f] text-[#261E1E] hover:bg-[#a48f4f] hover:text-white transition-all duration-300 font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full hover:-translate-y-0.5 active:scale-95 shrink-0"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Table Reservation Modal */}
            <TableReservationModal
                isOpen={isReservationOpen}
                onClose={() => setIsReservationOpen(false)}
            />
        </div>
    );
}
