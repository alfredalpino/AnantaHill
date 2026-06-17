'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Story', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isHome = pathname === '/';
    const heroTransparent = isHome && !isScrolled;

    useEffect(() => {
        const syncScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        syncScroll();
        window.addEventListener('scroll', syncScroll, { passive: true });
        return () => window.removeEventListener('scroll', syncScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={cn(
                'nav-glass fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-300 ease-out',
                heroTransparent && 'nav-glass--hero-transparent',
                isScrolled && 'nav-glass--scrolled py-2.5',
                !isScrolled && 'py-4'
            )}
        >
            <div className="container-shell flex items-center justify-between px-0">
                <Link href="/" className="flex items-center gap-2 group shrink-0 lg:w-1/4" aria-label="Go to home">
                    <Image
                        src="/nav-logo.png"
                        alt="Ananta Logo"
                        width={180}
                        height={60}
                        className="h-11 w-auto transition-all duration-300 md:h-12"
                    />
                </Link>

                {/* Desktop Nav Links (Centered) */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-7 px-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-[15px] font-semibold transition-colors relative py-1',
                                heroTransparent
                                    ? pathname === link.href
                                        ? 'text-primary-light'
                                        : 'text-white/85 hover:text-white'
                                    : pathname === link.href
                                      ? 'text-primary-dark font-bold'
                                      : 'text-text-body hover:text-primary-dark'
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <span
                                    className={cn(
                                        'absolute bottom-0 left-0 right-0 h-0.5 rounded-full',
                                        heroTransparent ? 'bg-primary-light' : 'bg-primary-dark'
                                    )}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Side Buttons */}
                <div className="hidden md:flex items-center justify-end gap-4 shrink-0 lg:w-1/4">
                    <Link 
                        href="/login" 
                        className={cn(
                            'text-sm font-bold transition-colors',
                            heroTransparent ? 'text-white/90 hover:text-white' : 'text-text-body hover:text-primary-dark'
                        )}
                    >
                        Login
                    </Link>
                    <Link href="/booking" className="btn-primary py-2 px-6 text-sm">
                        Book now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className={cn('md:hidden p-2', heroTransparent ? 'text-white' : 'text-text-primary')}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'nav-glass-panel fixed inset-0 z-[60] flex flex-col p-4 sm:p-6 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-out md:hidden',
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex justify-end pt-2">
                    <button
                        type="button"
                        className="p-2 text-text-primary hover:bg-black/5 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close navigation"
                    >
                        <X className="w-7 h-7" />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 gap-6 pb-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-2xl font-display transition-colors text-center w-full',
                                pathname === link.href ? 'text-primary-dark font-bold' : 'text-text-primary'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="my-4 h-px w-2/3 bg-secondary/50 mx-auto" />
                    
                    <div className="w-full max-w-[240px] flex flex-col gap-3 mt-2">
                        <Link 
                            href="/login" 
                            className="w-full text-center py-3.5 rounded-xl border-2 border-secondary text-text-primary font-bold hover:bg-secondary/10 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link 
                            href="/booking" 
                            className="btn-primary w-full text-center py-3.5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Book now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
