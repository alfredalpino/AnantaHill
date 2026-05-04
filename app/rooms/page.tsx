import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Rooms() {
  const rooms = [
    {
      title: "Hill View Suite",
      description: "Elegant suites featuring floor-to-ceiling windows with panoramic views of the hills.",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
      price: "INR 25,000"
    },
    {
      title: "Heritage Villa",
      description: "Private villas inspired by local architecture, offering ultimate privacy and luxury.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
      price: "INR 45,000"
    },
    {
      title: "Royal Penthouse",
      description: "Our most exclusive accommodation with a private terrace and personal butler service.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
      price: "INR 85,000"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <span className="text-gold uppercase tracking-[0.3em] text-sm mb-4 block">Accommodations</span>
          <h1>Rooms & Suites</h1>
          <p className="text-text-secondary mt-6 max-w-2xl mx-auto">
            Each room at Ananta is a blend of comfort and style, designed to provide a serene escape from the world.
          </p>
        </div>

        <div className="grid gap-20">
          {rooms.map((room, index) => (
            <div key={index} className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={index % 2 !== 0 ? 'md:order-2' : ''}>
                <img src={room.image} alt={room.title} className="w-full h-[500px]" />
              </div>
              <div className={index % 2 !== 0 ? 'md:order-1' : ''}>
                <h2 className="mb-6">{room.title}</h2>
                <p className="text-text-secondary mb-8 leading-relaxed">{room.description}</p>
                <div className="mb-10">
                  <span className="text-sm uppercase tracking-widest text-gold block mb-2">Starting from</span>
                  <span className="text-2xl font-serif">{room.price} / Night</span>
                </div>
                <Button variant="primary">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
