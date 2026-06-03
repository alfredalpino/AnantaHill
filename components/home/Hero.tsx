"use client";

import { useState, forwardRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
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
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#1E1919] pt-20 pb-16 md:pb-24"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent md:bg-gradient-to-r" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

      {/* Elegant Leaf Corner Decor Images from remote */}
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={140}
        height={140}
        className="decor-leaf left-0 top-24 opacity-50 md:top-28"
        aria-hidden
      />
      <Image
        src="/images/decor/leaf-corner.svg"
        alt=""
        width={140}
        height={140}
        className="decor-leaf right-0 top-32 -scale-x-100 opacity-40"
        aria-hidden
      />

      {/* Background Leaf Outline Overlay (Right Bottom Decoration) */}
      <div className="absolute right-0 bottom-16 pointer-events-none z-10 w-72 h-72 md:w-96 md:h-96 opacity-35 select-none shrink-0" aria-hidden>
        <svg viewBox="0 0 400 400" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Detailed Golden Branch/Leaf Drawings */}
          <path d="M400,320 C360,280 300,280 270,300 C250,315 240,335 240,360 M400,320 C380,260 330,220 280,240 C250,250 240,270 240,300" />
          <path d="M270,300 C230,260 170,260 140,280 C120,295 110,315 110,340 M270,300 C250,240 200,200 150,220 C120,230 110,250 110,280" strokeDasharray="3,3" />
          <path d="M340,310 C320,290 310,260 330,240 C350,220 370,240 380,270" />
          <path d="M290,260 C270,240 260,210 280,190 C300,170 320,190 330,220" />
          <path d="M220,210 C200,190 190,160 210,140 C230,120 250,140 260,170" />
          {/* Fine Leaf veins */}
          <path d="M355,275 C345,265 340,255 343,248" />
          <path d="M305,225 C295,215 290,205 293,198" />
          <path d="M235,175 C225,165 220,155 223,148" />
        </svg>
      </div>

      {/* Main Luxury Content Grid */}
      <div className="relative z-10 container-shell flex flex-1 flex-col justify-center py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left text-white max-w-2xl">
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

              {/* Grid of 5 Premium Features with custom Outline SVGs */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 gap-x-2 w-full my-6 sm:my-8 pt-4 border-t border-white/10">
                {/* 1. Swimming Pool */}
                <div className="flex flex-col items-start group">
                  <div className="h-9 w-9 text-primary mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M17 2v11" />
                      <path d="M13 2v7" />
                      <path d="M13 5h4" />
                      <path d="M13 8h4" />
                      <path d="M2 17c1.5 0 2.2-1.2 3.5-1.2s2 1.2 3.5 1.2 2-1.2 3.5-1.2 2 1.2 3.5 1.2" />
                      <path d="M2 20c1.5 0 2.2-1.2 3.5-1.2s2 1.2 3.5 1.2 2-1.2 3.5-1.2 2 1.2 3.5 1.2" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Swimming Pool</span>
                </div>

                {/* 2. Bar & Lounge */}
                <div className="flex flex-col items-start group">
                  <div className="h-9 w-9 text-primary mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M5 3h14l-7 8z" />
                      <path d="M12 11v9" />
                      <path d="M8 20h8" />
                      <path d="M11 6l4-4" />
                      <circle cx="15.5" cy="2" r="0.75" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Bar & Lounge</span>
                </div>

                {/* 3. Fine Dining */}
                <div className="flex flex-col items-start group">
                  <div className="h-9 w-9 text-primary mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M3 18h18" />
                      <path d="M3 18a9 9 0 0 1 18 0" />
                      <path d="M12 4v2" />
                      <circle cx="12" cy="3.5" r="1" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Fine Dining</span>
                </div>

                {/* 4. Banquet & Events */}
                <div className="flex flex-col items-start group">
                  <div className="h-9 w-9 text-primary mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M4 20V9a8 8 0 0 1 16 0v11" />
                      <path d="M6 20v-4h3v4" />
                      <path d="M6 16h3" />
                      <path d="M15 20v-4h3v4" />
                      <path d="M15 16h3" />
                      <path d="M11 20v-2h2v2" />
                      <path d="M10 18h4" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Banquet & Events</span>
                </div>

                {/* 5. Luxury Stay */}
                <div className="flex flex-col items-start group">
                  <div className="h-9 w-9 text-primary mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M3 7v13" />
                      <path d="M21 11v9" />
                      <path d="M3 15h18" />
                      <rect x="5" y="10" width="5" height="3" rx="0.5" />
                      <rect x="11" y="10" width="5" height="3" rx="0.5" />
                      <path d="M12 15v-2h9" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Luxury Stay</span>
                </div>
              </div>

              {/* Discover More Link */}
              <Link
                href="/rooms"
                className="group relative inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest py-2 border-b border-primary/20 hover:border-primary transition-all duration-300"
              >
                Discover More
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Layout Column (Space or Floating Cards) */}
          <div className="hidden md:flex lg:col-span-5 flex-col justify-end lg:h-full lg:min-h-[450px]">
            {/* Location Card positioned beautifully bottom right */}
            <div className="self-end lg:mr-4 mb-4 z-10 w-full max-w-[320px] rounded-2xl bg-black/25 backdrop-blur border border-white/10 p-5 shadow-luxury transition-all duration-300 hover:border-primary/20">
              <div className="flex items-start gap-3">
                <MapPin className="h-8 w-8 text-white/70 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <h4 className="font-medium text-sm text-white font-sans tracking-wide">
                    Hazaribagh, Jharkhand
                  </h4>
                  <p className="text-sm text-white/75 max-w-[180px] mt-1 font-body">
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
