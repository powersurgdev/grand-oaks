import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ServiceHero({ title, subtitle, image }: ServiceHeroProps) {
  return (
    <section className="relative h-[550px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center mt-20 md:mt-0">
        <Badge className="bg-brand-orange hover:bg-brand-orange text-white border-none px-4 py-1.5 text-sm font-bold mb-8 uppercase tracking-wider shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          Pasco County Tree Services
        </Badge>
        
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
            <a href="#estimate-form">Get Your Free Estimate</a>
          </Button>
        </div>

        {/* Trust Indicators */}
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
