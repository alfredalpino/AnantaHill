'use client';

import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
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

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

type RangeDateInputProps = {
  checkIn?: string;
  checkOut?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "compact" | "full";
};

const RangeDateInput = forwardRef<HTMLButtonElement, RangeDateInputProps>(
  function RangeDateInputComponent({ checkIn, checkOut, onClick, disabled, variant = "full" }, ref) {
    if (variant === "compact") {
      return (
        <button
          type="button"
          onClick={onClick}
          ref={ref}
          disabled={disabled}
          className={clsx(
            "grid w-full grid-cols-2 text-left",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex flex-col border-r border-white/20 px-4 py-3 sm:px-5 sm:py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
              Check-in
            </span>
            <span className="mt-1 text-sm font-medium text-white sm:text-[15px]">
              {checkIn ? formatDisplayDate(checkIn) : "Select date"}
            </span>
          </div>
          <div className="flex flex-col px-4 py-3 sm:px-5 sm:py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
              Check-out
            </span>
            <span className="mt-1 text-sm font-medium text-white sm:text-[15px]">
              {checkOut ? formatDisplayDate(checkOut) : "Select date"}
            </span>
          </div>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        className={clsx("w-full text-left transition-all", disabled && "cursor-not-allowed opacity-50")}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              Check-in
            </label>
            <div className="flex h-12 w-full items-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white">
              {checkIn ? (
                <span className="font-medium">{checkIn}</span>
              ) : (
                <span className="text-white/60">Select date</span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              Check-out
            </label>
            <div className="flex h-12 w-full items-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white">
              {checkOut ? (
                <span className="font-medium">{checkOut}</span>
              ) : (
                <span className="text-white/60">Select date</span>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

export interface BookingBarProps {
  variant?: "compact" | "full";
  className?: string;
}

export default function BookingBar({ variant = "full", className }: BookingBarProps) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("Deluxe Room");
  const [guests] = useState<number>(2);
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

  const datePicker = (
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
      customInput={
        <RangeDateInput checkIn={checkIn} checkOut={checkOut} variant={variant} />
      }
      wrapperClassName="w-full block"
      dateFormat="dd-MM-yyyy"
      popperClassName="z-[80] tf-datepicker-popper"
      calendarClassName="!rounded-2xl !border !border-secondary !shadow-premium"
      monthsShown={typeof window !== "undefined" && window.innerWidth < 1280 ? 1 : 2}
      showPopperArrow={false}
      formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 2)}
      dayClassName={() => "tf-datepicker-day"}
      popperPlacement="bottom-start"
      renderCustomHeader={({ monthDate, date, decreaseMonth, increaseMonth }) => (
        <div className="flex w-full items-center justify-between gap-4 px-3 pb-2 pt-1">
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
  );

  if (variant === "compact") {
    return (
      <section
        className={clsx(
          "relative z-30 mx-auto w-full",
          className
        )}
        aria-label="Book your stay"
      >
        <div className="overflow-hidden rounded-none bg-gradient-gold-bar shadow-[0_12px_40px_rgba(38,30,30,0.22)]">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            <div className="relative flex flex-col border-b border-white/20 lg:w-[28%] lg:border-b-0 lg:border-r">
              <span className="px-4 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 sm:px-5 sm:pt-4">
                Resorts
              </span>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between px-4 pb-3 pt-1 text-left sm:px-5 sm:pb-4"
              >
                <span className="text-sm font-semibold text-white sm:text-[15px]">
                  {roomType}
                </span>
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 text-white/80 transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[70]"
                    onClick={() => setIsDropdownOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute left-0 right-0 top-full z-[80] mx-2 overflow-hidden rounded-xl border border-secondary/20 bg-white py-1 shadow-premium lg:mx-0">
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

            <div className="gold-divider hidden lg:block" />

            <div className="flex-1 border-b border-white/20 lg:border-b-0 lg:border-r">
              {datePicker}
            </div>

            <div className="gold-divider hidden lg:block" />

            <div className="flex items-stretch p-3 sm:p-4 lg:w-[22%] lg:p-4">
              <button
                type="button"
                onClick={handleSearch}
                disabled={!isValid}
                className="btn-gold-skeuo flex h-full min-h-[48px] w-full items-center justify-center rounded-[14px] px-6 text-sm font-bold uppercase tracking-[0.12em] text-[#3e2f14] transition-all disabled:cursor-not-allowed disabled:opacity-55 sm:tracking-[0.16em]"
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={clsx(
        "relative z-20 mx-auto mt-8 w-full max-w-7xl px-4 sm:mt-12 lg:mt-16 lg:px-7",
        className
      )}
    >
      <div className="rounded-3xl bg-primary-dark p-4 text-white shadow-premium sm:p-6 md:p-8 lg:p-10">
        <div className="mb-6 text-center md:mb-8 md:text-left">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Reserve your stay
          </h2>
          <p className="mt-1 text-sm text-white/80 md:text-base">
            Pick your dates and room to continue with a seamless booking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="relative flex flex-col lg:col-span-3">
            <label className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              Room
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-12 w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/15"
              >
                <span className="truncate font-medium">{roomType || "Select room"}</span>
                <ChevronDown
                  className={clsx(
                    "h-4 w-4 text-white/70 transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[70]"
                    onClick={() => setIsDropdownOpen(false)}
                  />
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

          <div className="lg:col-span-5">{datePicker}</div>

          <div className="lg:col-span-4">
            <button
              type="button"
              onClick={handleSearch}
              disabled={!isValid}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-primary-dark transition-all hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
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
