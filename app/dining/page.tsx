import Button from "@/components/ui/Button";

export default function Dining() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Culinary Journey</span>
          <h1>Fine Dining</h1>
          <p className="text-text-secondary mt-6 max-w-2xl mx-auto">
            Experience world-class cuisine inspired by local traditions and global trends.
          </p>
        </div>

        <section className="p-0 mb-20">
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000" alt="Restaurant" className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-center">
              <div className="max-w-xl px-5">
                <h2 className="text-white mb-6">The Grand Pavilion</h2>
                <p className="mb-10 text-white/80">Our signature restaurant offering a fusion of Himalayan flavors and international fine dining.</p>
                <Button variant="primary">Reserve a Table</Button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-10 border-luxury">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Cafe & Bar</span>
            <h3 className="mb-6">The Hillside Bar</h3>
            <p className="text-text-secondary mb-8">Enjoy curated cocktails and premium spirits with a view of the sunset over the valley.</p>
            <Button variant="outline">Menu</Button>
          </div>
          <div className="bg-white p-10 border-luxury">
            <span className="text-gold uppercase tracking-widest text-xs mb-4 block">Private Dining</span>
            <h3 className="mb-6">Celestial Terrace</h3>
            <p className="text-text-secondary mb-8">An intimate dining experience under the stars, perfect for special occasions.</p>
            <Button variant="outline">Enquire</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
