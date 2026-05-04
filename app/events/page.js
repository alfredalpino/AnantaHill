import Button from "@/components/ui/Button";

export default function Events() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Celebrations</span>
          <h1>Events & Weddings</h1>
          <p className="text-text-secondary mt-6 max-w-2xl mx-auto">
            Create unforgettable memories in the most picturesque setting in the hills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <img src="https://images.unsplash.com/photo-1519225495045-395671568e28?auto=format&fit=crop&q=80&w=1200" alt="Wedding" className="w-full h-[600px]" />
          </div>
          <div>
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Weddings</span>
            <h2 className="mb-8">A Fairytale Beginning</h2>
            <p className="text-text-secondary mb-10 leading-relaxed">
              From intimate ceremonies to grand celebrations, our dedicated wedding planners 
              ensure every detail is perfect, allowing you to focus on the joy of your special day.
            </p>
            <Button variant="primary">Wedding Packages</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="md:order-2">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200" alt="Corporate" className="w-full h-[600px]" />
          </div>
          <div className="md:order-1">
            <span className="text-gold uppercase tracking-widest text-sm mb-4 block">Corporate</span>
            <h2 className="mb-8">Retreats & Meetings</h2>
            <p className="text-text-secondary mb-10 leading-relaxed">
              Inspire your team with a change of scenery. Our state-of-the-art meeting spaces 
              and tranquil environment are perfect for productive retreats.
            </p>
            <Button variant="primary">Enquire Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
