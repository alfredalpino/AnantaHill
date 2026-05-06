"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Rooms', href: '/rooms' },
    { name: 'Dining', href: '/dining' },
    { name: 'Events', href: '/events' },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${
        isMobileMenuOpen 
          ? "bg-ivory shadow-none py-4" 
          : (isScrolled 
              ? "bg-ivory/95 backdrop-blur-md py-3 shadow-soft border-b border-border" 
              : `bg-transparent ${!isHome ? 'border-b border-border/75 py-2' : 'py-6'}`)
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src="/nav-logo.png" 
              alt="Ananta Logo" 
              width={160} 
              height={50} 
              className={`w-auto transition-all duration-500 ${isScrolled ? "md:h-16 h-12" : (isHome ? "md:h-20 h-16" : "md:h-20 h-16")} object-contain`}
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link 
                href={link.href} 
                className={`text-sm uppercase tracking-luxury font-medium transition-colors ${
                  isScrolled 
                    ? "text-secondary hover:text-primary" 
                    : (isHome ? "text-ivory hover:text-primary" : "text-secondary hover:text-primary")
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link 
              href="/booking" 
              className="bg-primary text-ivory px-8 py-3 rounded-full text-xs uppercase tracking-luxury font-bold hover:bg-accent transition-all shadow-luxury"
            >
              Book Now
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`z-[130] transition-colors ${isMobileMenuOpen ? "text-secondary" : (isScrolled ? "text-secondary" : (isHome ? "text-ivory" : "text-secondary"))}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 w-full h-full bg-ivory z-[120] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-secondary hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/booking" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-ivory px-10 py-4 rounded-full text-sm uppercase tracking-luxury font-bold mt-4"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
