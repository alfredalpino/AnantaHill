import Link from 'next/link';
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden p-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="container-custom relative z-20 text-center flex flex-col items-center">
          <span className="uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in">Welcome to Ananta</span>
          <h1 className="text-5xl md:text-7xl mb-10 max-w-4xl">Luxury Living in the Heart of the Hills</h1>
          <div className="flex gap-6">
            <Button variant="primary">Explore Rooms</Button>
            <Button variant="secondary">Book Your Stay</Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-beige">
        <div className="container-custom grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="mb-8">A Sanctuary Designed for the Soul</h2>
            <p className="text-text-secondary mb-10 leading-relaxed">
              Ananta - By The Hill is more than just a resort. It is a testament to timeless elegance and modern comfort, 
              perfectly integrated into the majestic landscape. Inspired by the heritage of Taj and the luxury of Oberoi, 
              we offer an experience that transcends the ordinary.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="pt-10">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" alt="Resort View 1" className="w-full h-[400px]" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=800" alt="Resort View 2" className="w-full h-[400px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Experience</span>
            <h2>Curated Moments</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card>
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800" alt="Spa" className="w-full h-64 mb-6" />
              <h3 className="text-xl mb-4">The Wellness Spa</h3>
              <p className="text-text-secondary text-sm mb-6">Rejuvenate your senses with our signature Himalayan treatments.</p>
              <Link href="/spa" className="text-gold text-sm uppercase tracking-widest hover:underline">Explore</Link>
            </Card>
            <Card>
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" alt="Dining" className="w-full h-64 mb-6" />
              <h3 className="text-xl mb-4">Fine Dining</h3>
              <p className="text-text-secondary text-sm mb-6">A culinary journey through the flavors of the region and beyond.</p>
              <Link href="/dining" className="text-gold text-sm uppercase tracking-widest hover:underline">Explore</Link>
            </Card>
            <Card>
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" alt="Events" className="w-full h-64 mb-6" />
              <h3 className="text-xl mb-4">Weddings</h3>
              <p className="text-text-secondary text-sm mb-6">Celebrate your special moments in a setting as beautiful as your love.</p>
              <Link href="/events" className="text-gold text-sm uppercase tracking-widest hover:underline">Explore</Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
