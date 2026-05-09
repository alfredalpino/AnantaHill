'use client';

import { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  BedDouble,
  Users
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const RangeDateInput = forwardRef<
  HTMLButtonElement,
  { checkIn?: string; checkOut?: string; onClick?: () => void; disabled?: boolean }
>(function RangeDateInputComponent({ checkIn, checkOut, onClick, disabled }, ref) {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      disabled={disabled}
      className={clsx("w-full text-left transition-all", disabled && "opacity-50 cursor-not-allowed")}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
            <Calendar className="h-3.5 w-3.5" />
            Check-in
          </label>
          <div className={clsx(
            "flex h-12 w-full items-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white transition-colors",
            !disabled && "hover:border-white/40 hover:bg-white/15 focus:border-white focus:bg-white/20 focus:outline-none"
          )}>
            {checkIn ? (
              <span className="font-medium text-white">{checkIn}</span>
            ) : (
              <span className="text-white/60">Select date</span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
            <Calendar className="h-3.5 w-3.5" />
            Check-out
          </label>
          <div className={clsx(
            "flex h-12 w-full items-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white transition-colors",
            !disabled && "hover:border-white/40 hover:bg-white/15 focus:border-white focus:bg-white/20 focus:outline-none"
          )}>
            {checkOut ? (
              <span className="font-medium text-white">{checkOut}</span>
            ) : (
              <span className="text-white/60">Select date</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
});

export default function BookingBar() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("Deluxe Room");
  const [guests, setGuests] = useState<number>(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableRooms = [
    { name: "Deluxe Room", capacity: 3 },
    { name: "Premium Suite", capacity: 4 },
    { name: "Luxury Villa", capacity: 6 },
  ];

  const isValid = Boolean(checkIn && checkOut && roomType);

  const handleSearch = () => {
    if (!isValid) return;
    const params = new URLSearchParams();
    params.set("room", roomType);
    params.set("guests", guests.toString());
    params.set("checkIn", checkIn);
    params.set("checkOut", checkOut);
    router.push(`/booking?${params.toString()}`);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="relative z-20 mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-12 lg:mt-16 lg:px-7">
      <div className="rounded-3xl bg-primary-dark p-4 text-white shadow-premium sm:p-6 md:p-8 lg:p-10">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h2 className="font-display text-white text-2xl font-bold md:text-3xl">Reserve your stay</h2>
          <p className="mt-1 text-sm text-white/80 md:text-base">
            Pick your dates and room to continue with a seamless booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:items-end lg:gap-6">
          {/* Room Dropdown */}
          <div className="relative flex flex-col lg:col-span-3">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              <BedDouble className="h-3.5 w-3.5" />
              Room
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/15 focus:border-white focus:bg-white/20 focus:outline-none"
              >
                <span className="truncate font-medium text-white">{roomType || "Select room"}</span>
                <ChevronDown className={clsx("h-4 w-4 text-white/70 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>

              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-[70]" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[80] overflow-hidden rounded-xl border border-secondary/20 bg-white py-1 shadow-premium">
                    {availableRooms.map((room) => (
                      <button
                        key={room.name}
                        type="button"
                        className="w-full px-4 py-2.5 text-left text-sm text-text-primary transition-colors hover:bg-secondary/20"
                        onClick={() => {
                          setRoomType(room.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {room.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="lg:col-span-5">
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
              customInput={<RangeDateInput checkIn={checkIn} checkOut={checkOut} />}
              wrapperClassName="w-full block"
              dateFormat="dd-MM-yyyy"
              popperClassName="z-[80] tf-datepicker-popper"
              calendarClassName="!rounded-2xl !border !border-secondary !shadow-premium"
              monthsShown={typeof window !== 'undefined' && window.innerWidth < 1280 ? 1 : 2}
              showPopperArrow={false}
              formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 2)}
              dayClassName={() => "tf-datepicker-day"}
              popperPlacement="bottom-start"
              renderCustomHeader={({ monthDate, date, decreaseMonth, increaseMonth }) => (
                <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-1 w-full">
                  <button
                    type="button"
                    onClick={decreaseMonth}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-secondary/80 bg-white text-text-primary transition-colors hover:bg-secondary/40"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-display text-xl font-bold text-text-primary">
                    {(monthDate || date).toLocaleString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <button
                    type="button"
                    onClick={increaseMonth}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-secondary/80 bg-white text-text-primary transition-colors hover:bg-secondary/40"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            />
          </div>

          {/* Guests Stepper */}
          <div className="flex flex-col lg:col-span-2">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              <Users className="h-3.5 w-3.5" />
              Guests
            </label>
            <div className="flex h-12 w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-2 text-white transition-colors hover:border-white/40 hover:bg-white/15 focus-within:border-white focus-within:bg-white/20">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent"
                disabled={guests <= 1}
                onClick={() => setGuests((p) => Math.max(1, p - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold tabular-nums">{guests}</span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent"
                onClick={() => setGuests((p) => Math.min(10, p + 1))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!isValid}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-primary-dark transition-all hover:bg-secondary hover:shadow-lg disabled:cursor-not-allowed disabled:bg-white/50 disabled:text-primary-dark/50 disabled:shadow-none"
            >
              Book Now
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
