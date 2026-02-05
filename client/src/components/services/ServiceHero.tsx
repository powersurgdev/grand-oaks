import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ServiceHero({ title, subtitle, image }: ServiceHeroProps) {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center mt-16">
        <Badge className="bg-brand-orange hover:bg-brand-orange text-white border-none px-4 py-1.5 text-sm font-bold mb-6 uppercase tracking-wider">
          Pasco County Tree Services
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
