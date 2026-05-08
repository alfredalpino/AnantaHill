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
    <>
      <header 
        className={`fixed w-full z-[140] transition-[background-color,padding,box-shadow,border-color] duration-700 ease-in-out ${
          isMobileMenuOpen 
            ? "bg-white shadow-none py-4" 
            : (isScrolled 
                ? "bg-white/95 backdrop-blur-md py-2.5 shadow-sm border-b border-accent/5" 
                : `bg-transparent ${!isHome ? 'border-b border-accent/10 py-4' : 'py-6'}`)
        }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-[130]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image 
                src="/nav-logo.png" 
                alt="Ananta Logo" 
                width={140} 
                height={40} 
                className={`w-auto transition-all duration-700 ${isScrolled || isMobileMenuOpen ? "h-14 md:h-16" : (isHome ? "h-16 md:h-18" : "h-16 md:h-18")} object-contain`}
                priority
              />
            </motion.div>
          </Link>
  
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link 
                  href={link.href} 
                  className={`text-xs uppercase tracking-[0.3em] font-medium transition-colors link-underline ${
                    isScrolled 
                      ? "text-accent hover:text-primary" 
                      : (isHome ? "text-white hover:text-primary" : "text-accent hover:text-primary")
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link 
                href="/booking" 
                className="luxury-button text-xs !px-8 !py-3"
              >
                Book Now
              </Link>
            </motion.div>
          </nav>
  
          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`z-[150] transition-all duration-300 border rounded-md p-2 ${
                isMobileMenuOpen 
                  ? "text-accent border-transparent bg-transparent" 
                  : (isScrolled 
                      ? "text-accent border-transparent bg-transparent" 
                      : (isHome 
                          ? "text-white border-white/40 bg-white/10 backdrop-blur-sm" 
                          : "text-accent border-transparent bg-transparent"))
              }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>
  
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 right-0 w-full h-full bg-white/90 backdrop-blur-xl z-[120] flex flex-col items-center justify-center gap-12 lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-accent hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
              >
                <Link 
                  href="/booking" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="luxury-button"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
