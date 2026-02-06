import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import LazyImage from "@/components/ui/lazy-image";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
}

export default function ServiceHero({ title, subtitle, image, imagePosition }: ServiceHeroProps) {
  return (
    <section className="relative h-[550px] md:h-[600px] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full opacity-50"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          priority={true}
          data-testid="img-service-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-32 pb-24 md:pt-40 md:pb-28 h-full flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-lg max-w-5xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {title}
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-100 font-medium max-w-3xl mx-auto drop-shadow-md mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-12 md:h-16 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-xl transition-transform active:scale-95"
            asChild
          >
            <a href="tel:8138607086">Call Now (813) 860-7086</a>
          </Button>
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-12 md:h-16 text-lg font-bold bg-white text-brand-green hover:bg-gray-100 rounded-xl shadow-xl transition-transform active:scale-95"
            asChild
          >
            <a href="#estimate-form">Get Free Estimate</a>
          </Button>
        </div>

        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3 md:gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
           {["Licensed & Insured", "Certified Arborists", "Free Estimates"].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-brand-orange" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
