'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('ananta_has_seen_loading');
    if (hasSeenLoading) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('ananta_has_seen_loading', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="relative h-32 w-32 animate-pulse">
        <Image
          src="/nav-logo.png"
          alt="Ananta Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute bottom-10">
        <div className="h-1 w-48 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-full origin-left animate-[loading_2s_ease-in-out_infinite] bg-primary" />
        </div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
