'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const MOTION_SPEED_MULTIPLIER = 0.05;

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            node.classList.add('reveal-visible');
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            node.classList.add('reveal-visible');
            return;
        }

        const timeoutIds = new Set<number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const timeoutId = window.setTimeout(() => {
                            entry.target.classList.add('reveal-visible');
                            observer.unobserve(entry.target);
                            timeoutIds.delete(timeoutId);
                        }, Math.max(0, Math.round(delay * MOTION_SPEED_MULTIPLIER)));
                        timeoutIds.add(timeoutId);
                    }
                });
            },
            { threshold: 0.01, rootMargin: '120px 0px -40px 0px' }
        );

        observer.observe(node);

        return () => {
            timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
            timeoutIds.clear();

            observer.unobserve(node);
            observer.disconnect();
        };
    }, [delay]);

    return (
        <div ref={ref} className={`reveal-hidden ${className}`}>
            {children}
        </div>
    );
}
