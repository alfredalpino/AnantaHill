"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Users, Wifi, Wind, Coffee, Check, Maximize, Tv, UserCheck, Utensils, Dog, Waves } from 'lucide-react';
import Image from 'next/image';

const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'AC': Wind,
    'Breakfast': Coffee,
    'Pool Access': Waves,
    'Private Pool': Waves,
    'All Meals': Utensils,
    'Butler': UserCheck,
    'Banquet Access': Users,
    'Jacuzzi': Waves,
    'Pet friendly': Dog,
};

interface Room {
  id: number | string;
  category: string;
  name: string;
  desc: string;
  description?: string; // Tathastu uses description
  price: string | number;
  guests?: number | string;
  amenities_labels?: string[];
  image?: string;
}

interface RoomCardProps {
  room: Room;
  onViewDetails?: (room: any) => void;
}

const RoomCard = ({ room, onViewDetails }: RoomCardProps) => {
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const amenities = room.amenities_labels || ['WiFi', 'AC', 'Breakfast'];
  
  // Normalize data for consistency with Tathastu logic
  const displayPrice = typeof room.price === 'string' ? parseInt(room.price.replace(/,/g, '')) : room.price;
  const displayGuests = room.guests || 2;
  const displayDesc = room.description || room.desc;

  return (
    <div className="card-premium h-full flex flex-col overflow-hidden group">
      <div
        className="relative h-64 overflow-hidden cursor-pointer block"
        onClick={() => onViewDetails && onViewDetails(room)}
      >
        <Image
          src={room.image || '/images/room.jpg'}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary shadow-sm">
          <span className="text-primary-dark font-bold">₹{displayPrice.toLocaleString()}</span>
          <span className="text-text-muted text-xs">/night</span>
        </div>
        
        <div className="absolute bottom-4 left-4 bg-primary-dark/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {room.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-6 pb-7 md:p-7 md:pb-8">
        <div className="mb-2 flex items-start justify-between">
          <button
            className="text-xl font-bold font-display text-text-primary group-hover:text-primary-dark transition-colors cursor-pointer text-left"
            onClick={() => onViewDetails && onViewDetails(room)}
          >
            {room.name}
          </button>
          <div className="flex items-center gap-1 text-text-muted text-sm">
            <Users className="w-4 h-4" />
            <span>{displayGuests}</span>
          </div>
        </div>

        <p className="text-xs text-text-muted mb-4 line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>

        {/* Stay highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(highlightsExpanded ? amenities : amenities.slice(0, 3)).map((amenity) => {
            const Icon = amenityIcons[amenity] || Check;
            return (
              <span key={amenity} className="flex items-center gap-1.5 px-3 py-1 bg-secondary-dark/50 rounded-full text-[10px] font-bold text-text-primary">
                <Icon className="w-3 h-3 text-primary-dark" />
                {amenity}
              </span>
            );
          })}
          {amenities.length > 3 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHighlightsExpanded((v) => !v);
              }}
              className="text-[10px] font-bold text-primary-dark pt-1 underline-offset-2 hover:underline"
            >
              {highlightsExpanded ? 'Show less' : `+${amenities.length - 3} more`}
            </button>
          )}
        </div>

        {/* CTA */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onViewDetails && onViewDetails(room)}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border-2 border-secondary-dark bg-white py-2.5 text-xs font-semibold text-text-primary transition-colors hover:bg-secondary-dark"
          >
            Details
          </button>
          <Link
            href={`/booking?room=${encodeURIComponent(room.name)}`}
            className="btn-primary flex min-h-[44px] items-center justify-center rounded-xl py-2.5 text-center text-xs font-semibold"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
