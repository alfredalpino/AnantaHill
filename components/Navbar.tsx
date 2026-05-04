import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-cream/80 backdrop-blur-md border-b border-[rgba(200,169,106,0.1)]">
      <div className="container-custom py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif tracking-widest text-black">
          ANANTA
        </Link>
        <div className="hidden md:flex gap-10 items-center">
          <Link href="/rooms" className="text-sm uppercase tracking-widest hover:text-gold">Rooms</Link>
          <Link href="/dining" className="text-sm uppercase tracking-widest hover:text-gold">Dining</Link>
          <Link href="/events" className="text-sm uppercase tracking-widest hover:text-gold">Events</Link>
          <Link href="/booking" className="text-sm uppercase tracking-widest bg-black text-white px-6 py-2 rounded-[4px] hover:bg-charcoal transition-all">Book Now</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
