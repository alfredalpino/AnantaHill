import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-secondary/70 px-6 pb-10 pt-20">
            <div className="container-shell px-0">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo & Tagline */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/logo.png" alt="Ananta Logo" width={180} height={80} className="h-16 w-auto" />
                        </Link>
                        <div className="max-w-xs space-y-1 text-sm leading-relaxed text-text-body">
                            <p>
                                Experience ultimate luxury and serenity at Ananta - By The Hill. A premium resort inspired by heritage and nature.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit Ananta on Instagram" className="rounded-full border border-secondary-dark bg-white p-2 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="mailto:info@anantaresort.com" aria-label="Email Ananta" className="rounded-full border border-secondary-dark bg-white p-2 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold font-display text-text-primary">Plan Stay</h4>
                        <ul className="space-y-4">
                            <li><Link href="/booking" className="text-sm text-text-body transition-colors hover:text-primary-dark">Book a stay</Link></li>
                            <li><Link href="/rooms" className="text-sm text-text-body transition-colors hover:text-primary-dark">Rooms and villas</Link></li>
                            <li><Link href="/events" className="text-sm text-text-body transition-colors hover:text-primary-dark">Event venues</Link></li>
                            <li><Link href="/dining" className="text-sm text-text-body transition-colors hover:text-primary-dark">Dining</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold font-display text-text-primary">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-sm text-text-body">
                                <MapPin className="w-5 h-5 text-primary-dark shrink-0" />
                                <span>Canary Hill Rd, Hirabaug, Hazaribagh, Jharkhand 825301</span>
                            </li>
                            <li className="flex gap-3 text-sm text-text-body">
                                <Phone className="w-5 h-5 text-primary-dark shrink-0" />
                                <span>
                                    <a href="tel:+919942631802" className="hover:text-primary-dark transition-colors">+91 99426 31802</a>
                                </span>
                            </li>
                            <li className="flex gap-3 text-sm text-text-body">
                                <Mail className="w-5 h-5 text-primary-dark shrink-0" />
                                <a href="mailto:info@anantaresort.com" className="hover:text-primary-dark transition-colors">info@anantaresort.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Timings */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold font-display text-text-primary">Explore</h4>
                        <ul className="space-y-4 text-sm text-text-body">
                            <li><Link href="/our-story" className="transition-colors hover:text-primary-dark">Our Story</Link></li>
                            <li><Link href="/contact" className="transition-colors hover:text-primary-dark">Contact us</Link></li>
                            <li>Check-in: 12:00 PM</li>
                            <li>Check-out: 11:00 AM</li>
                            <li>Reception: 24/7</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary-dark pt-10 text-xs text-text-muted md:flex-row">
                    <p className='text-center md:text-left'>© 2026 Ananta - By The Hill. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-primary-dark transition-colors">Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-primary-dark transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}