import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-cream border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Image 
              src="/logo.png" 
              alt="Ananta Logo" 
              width={180} 
              height={60} 
              className="h-12 w-auto object-contain"
            />
            <p className="text-secondary leading-relaxed max-w-xs">
              Ananta - By The Hill is a sanctuary of peace and luxury, where the beauty of nature meets the elegance of heritage.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:bg-primary hover:text-ivory transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:bg-primary hover:text-ivory transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-secondary hover:bg-primary hover:text-ivory transition-all">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-6">Explore</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/accommodations" className="text-secondary hover:text-primary transition-colors">Accommodations</Link></li>
              <li><Link href="/dining" className="text-secondary hover:text-primary transition-colors">Dining Experience</Link></li>
              <li><Link href="/events" className="text-secondary hover:text-primary transition-colors">Weddings & Events</Link></li>
              <li><Link href="/contact" className="text-secondary hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-xl mb-6">Get in Touch</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-secondary">
                <MapPin size={20} className="text-primary shrink-0" />
                <span>Canary Hill Rd, Hirabaug, Hazaribagh, Jharkhand 825301</span>
              </li>
              <li className="flex gap-3 text-secondary">
                <Phone size={20} className="text-primary shrink-0" />
                <span>+91 9942631802</span>
              </li>
              <li className="flex gap-3 text-secondary">
                <Mail size={20} className="text-primary shrink-0" />
                <span>reservations@ananta.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Ananta - By The Hill. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
