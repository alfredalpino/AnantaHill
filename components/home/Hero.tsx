"use client";

import { useState, forwardRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, ChevronLeft, ChevronRight, WavesLadder, Martini, CookingPot, Tent, BedDouble } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ScrollReveal from '@/components/ScrollReveal';

interface HeroProps {
  onReserveTable?: () => void;
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateStr?: string) {
  if (!dateStr) return "Select Date";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Hero({ onReserveTable }: HeroProps) {
  const router = useRouter();
  
  // Booking Bar States
  const [resort, setResort] = useState("Ananta by the Hill");
  const [isResortOpen, setIsResortOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests] = useState<number>(2);

  const resortsList = [
    "Ananta by the Hill",
    "Ananta Valley Resort",
    "Ananta Lake Club"
  ];

  const handleBookNow = () => {
    const params = new URLSearchParams();
    params.set("resort", resort);
    params.set("guests", guests.toString());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(`/booking?${params.toString()}`);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Custom Inputs for React DatePicker inside bottom booking bar
  const CustomDateInput = forwardRef<
    HTMLButtonElement,
    { checkIn?: string; checkOut?: string; onClick?: () => void }
  >(({ checkIn, checkOut, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex w-full h-full items-stretch text-left transition-colors hover:bg-white/5 cursor-pointer"
    >
      <div className="flex flex-row items-center w-full justify-between py-4 md:py-5 px-6">
        <div className="flex flex-col flex-1 text-left">
          <span className="block text-[11px] sm:text-xs font-bold text-white uppercase tracking-[0.15em] leading-none">CHECK IN</span>
          <span className="text-sm font-semibold text-white block mt-1 truncate leading-none">
            {formatDisplayDate(checkIn)}
          </span>
        </div>
        <div className="h-8 w-px bg-white/25 mx-6 self-center" />
        <div className="flex flex-col flex-1 text-left">
          <span className="block text-[11px] sm:text-xs font-bold text-white uppercase tracking-[0.15em] leading-none">CHECK OUT</span>
          <span className="text-sm font-semibold text-white block mt-1 truncate leading-none">
            {formatDisplayDate(checkOut)}
          </span>
        </div>
      </div>
    </button>
  ));
  CustomDateInput.displayName = 'CustomDateInput';

  return (
    <section
      id="home-hero-section"
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#1E1919] pt-20 pb-6"
    >
      {/* Background Graphic & Cover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/night-pool.webp"
          alt="Ananta By The Hill resort at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
        {/* Dark luxury radial/horizontal gradient cover to keep left-aligned text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent md:bg-gradient-to-r" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
      </div>

      {/* Elegant Leaf Corner Decor Images from remote */}
      <Image
        src="/graphics/hero-graphic-1.png"
        alt=""
        width={140}
        height={140}
        className="decor-leaf -left-5 top-24 opacity-50 md:top-24"
        aria-hidden
      />
      <Image
        src="/graphics/hero-graphic-2.png"
        alt=""
        width={200}
        height={200}
        className="decor-leaf w-60 h-60 sm:-right-10 right-0 sm:-bottom-4 bottom-32 -scale-x-100 opacity-50 z-10"
        aria-hidden
      />


      {/* Main Luxury Content Grid */}
      <div className="relative z-10 container-shell flex flex-1 flex-col justify-center py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left text-white max-w-2xl px-4">
            <ScrollReveal delay={100}>
              {/* Eyebrow */}
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary block mb-3">
                A Luxury Resort Hotel & Banquet in Hazaribagh
              </span>

              {/* Huge Main Title */}
              <h1 className="font-display font-bold leading-[0.95] text-white text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase">
                Ananta
              </h1>

              {/* Subtitle with elegant gold horizontal lines */}
              <div className="flex items-center gap-3 sm:gap-4 my-2 text-primary font-semibold tracking-[0.35em] text-xs sm:text-sm md:text-base uppercase select-none">
                <span className="h-[1px] w-8 sm:w-16 bg-primary/80"></span>
                By The Hill
                <span className="h-[1px] w-8 sm:w-16 bg-primary/80"></span>
              </div>

              {/* Elegant Tagline Script */}
              <div className="font-script text-[#ebd083] text-4xl sm:text-5xl md:text-6xl my-4 pl-1 filter drop-shadow">
                Escape. Indulge. Unwind.
              </div>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-white/80 leading-relaxed max-w-xl my-4 sm:my-6">
                Ananta by the Hill is where luxury meets nature.
                An exquisite retreat in Hazaribagh offering world-class hospitality, serene views, a sparkling swimming pool,
                a well-stocked bar, fine dining, and elegant banquet spaces for unforgettable celebrations.
              </p>

              {/* Grid of 5 Premium Features with Lucide Icons */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 gap-x-2 sm:gap-x-0 w-full my-6 sm:my-8 pt-6 sm:divide-x sm:divide-white/15">
                {/* 1. Swimming Pool */}
                <div className="flex flex-col items-center text-center sm:px-2 group">
                  <div className="h-9 w-9 text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                    <WavesLadder className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.15em] leading-tight">
                    Swimming<br />Pool
                  </span>
                </div>

                {/* 2. Bar & Lounge */}
                <div className="flex flex-col items-center text-center px-2 group">
                  <div className="h-9 w-9 text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                    <Martini className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.15em] leading-tight">
                    Bar &<br />Lounge
                  </span>
                </div>

                {/* 3. Fine Dining */}
                <div className="flex flex-col items-center text-center px-2 group">
                  <div className="h-9 w-9 text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                    <CookingPot className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.15em] leading-tight">
                    Fine<br />Dining
                  </span>
                </div>

                {/* 4. Banquet & Events */}
                <div className="flex flex-col items-center text-center px-2 group">
                  <div className="h-9 w-9 text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                    <Tent className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.15em] leading-tight">
                    Banquet<br />& Events
                  </span>
                </div>

                {/* 5. Luxury Stay */}
                <div className="flex flex-col items-center text-center px-2 group">
                  <div className="h-9 w-9 text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                    <BedDouble className="w-full h-full" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-[0.15em] leading-tight">
                    Luxury<br />Stay
                  </span>
                </div>
              </div>

              {/* Discover More Link */}
              <Link
                href="/rooms"
                className="group relative inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest py-2 border-b border-primary/50 hover:border-primary transition-all duration-300"
              >
                Discover More
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Layout Column (Space or Floating Cards) */}
          <div className="hidden md:flex lg:col-span-5 flex-col justify-end lg:h-full lg:min-h-[450px]">
            {/* Location Card positioned beautifully bottom right */}
            <div className="self-end lg:mr-4 mb-4 z-10 w-full max-w-[320px] rounded-xl bg-black/30 backdrop-blur-xs border border-primary/30 p-8 shadow-luxury transition-all duration-300 hover:border-primary/20">
              <div className="flex items-start gap-3">
                <MapPin className="h-8 w-8 text-white/70 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm text-white font-sans tracking-wide">
                    Hazaribagh, Jharkhand
                  </h4>
                  <p className="text-sm text-white/75 max-w-[160px] mt-1 font-body">
                    Where every moment feels like a getaway.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Unified Luxury Gold Booking Bar - Positioned between sections on desktop, in-flow on mobile */}
      <div className="relative z-20 container-shell mx-auto px-4 sm:px-6 mb-8 mt-4 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:z-30 md:mb-0 md:mt-0">
        <div className="w-full bg-[#ab9657] py-2 px-4 md:px-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-10 items-stretch">
            
            {/* 1. Resorts Select Dropdown */}
            <div className="relative md:col-span-3 border-b border-white/10 md:border-b-0 md:border-r border-white/25 flex items-stretch">
              <button
                type="button"
                onClick={() => setIsResortOpen(!isResortOpen)}
                className="flex w-full h-full items-center justify-between text-left transition-colors hover:bg-white/5 px-6 py-4 md:py-5 cursor-pointer"
              >
                <div className="flex flex-col flex-1">
                  <span className="block text-[11px] sm:text-xs font-bold text-white uppercase tracking-[0.15em] leading-none">RESORTS</span>
                  <span className="text-sm font-semibold text-white block mt-1 truncate leading-none">{resort}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/80 transition-transform duration-300 ${isResortOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Resort Dropdown Box */}
              {isResortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsResortOpen(false)} />
                  <div className="absolute left-0 bottom-full mb-2 z-50 w-64 rounded-xl border border-white/10 bg-[#261E1E] py-2 shadow-luxury max-h-48 overflow-y-auto">
                    {resortsList.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setResort(item);
                          setIsResortOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary/20 ${
                          resort === item ? 'text-primary font-bold bg-primary/10' : 'text-white'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 2 & 3. Integrated Check-in & Check-out Date Range Selector */}
            <div className="md:col-span-5 flex items-stretch border-b border-white/20 md:border-b-0 md:border-r border-white/25 py-1 md:py-0">
              <DatePicker
                selectsRange
                startDate={checkIn ? new Date(checkIn) : null}
                endDate={checkOut ? new Date(checkOut) : null}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [start, end] = dates;
                  setCheckIn(start ? toIsoDate(start) : "");
                  setCheckOut(end ? toIsoDate(end) : "");
                }}
                minDate={today}
                customInput={<CustomDateInput checkIn={checkIn} checkOut={checkOut} />}
                wrapperClassName="w-full h-full flex items-stretch"
                dateFormat="dd-MM-yyyy"
                popperClassName="z-50 tf-datepicker-popper"
                calendarClassName="!rounded-2xl !border !border-secondary !shadow-premium"
                monthsShown={1}
                showPopperArrow={false}
                formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 2)}
                popperPlacement="top-start"
                renderCustomHeader={({ monthDate, date, decreaseMonth, increaseMonth }) => (
                  <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-1 w-full">
                    <button
                      type="button"
                      onClick={decreaseMonth}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-secondary/80 bg-white text-text-primary transition-colors hover:bg-secondary/40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-display text-lg font-bold text-text-primary">
                      {(monthDate || date).toLocaleString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <button
                      type="button"
                      onClick={increaseMonth}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-secondary/80 bg-white text-text-primary transition-colors hover:bg-secondary/40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              />
            </div>

            {/* 4. Book Now Submit CTA */}
            <div className="md:col-span-2 flex items-center justify-center md:pl-4 py-3 md:py-0">
              <button
                type="button"
                onClick={handleBookNow}
                className="sm:w-40 w-full py-3.5 px-6 rounded-tl-2xl rounded-br-2xl text-sm font-bold uppercase tracking-wider text-[#063124] btn-gold-skeuo transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:brightness-[1.04]"
              >
                BOOK NOW
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
