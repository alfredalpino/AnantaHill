import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20">
      <div className="container-custom grid md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif tracking-widest mb-6">ANANTA</h2>
          <p className="text-text-secondary max-w-sm">
            Experience the pinnacle of luxury and serenity at Ananta - By The Hill. A sanctuary designed for the soul.
          </p>
        </div>
        <div>
          <h4 className="text-gold uppercase tracking-widest text-sm mb-6 font-sans">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-text-secondary">
            <li><Link href="/rooms" className="hover:text-gold">Rooms & Suites</Link></li>
            <li><Link href="/dining" className="hover:text-gold">Fine Dining</Link></li>
            <li><Link href="/events" className="hover:text-gold">Wedding & Events</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold uppercase tracking-widest text-sm mb-6 font-sans">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm text-text-secondary">
            <li>Canary Hill Rd, Hirabaug</li>
            <li>Hazaribagh, Jharkhand 825301</li>
            <li>+91 9942631802</li>
            <li>reservations@ananta.com</li>
          </ul>
        </div>
      </div>
      <div className="container-custom mt-20 pt-8 border-t border-charcoal text-xs text-text-secondary flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Ananta - By The Hill. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
