import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import LazyImage from "@/components/ui/lazy-image";
import HeroContactForm from "@/components/landing/HeroContactForm";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  image: string;
  imagePosition?: string;
}

export default function ServiceHero({ title, subtitle, image, imagePosition }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[550px] md:min-h-[80vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full opacity-60"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          priority={true}
          data-testid="img-service-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 md:via-black/20 md:to-black/60 z-10"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 flex flex-col xl:flex-row xl:items-center xl:gap-12 pt-32 pb-12 md:pt-40 md:pb-10 h-full justify-center">

        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-brand-green/90 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-6 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Licensed & Fully Insured in Pasco County</span>
          </div>

          <h1 className="text-[28px] sm:text-5xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold text-white mb-3 md:mb-6 drop-shadow-lg max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 uppercase leading-tight md:leading-none">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-6 md:mb-8 max-w-xl md:max-w-2xl font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed px-2 md:px-0">
            {subtitle}
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button 
              size="xl" 
              className="w-full sm:w-auto h-11 md:h-16 text-sm md:text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-95"
              asChild
            >
              <a href="tel:8138607086">Call Now (813) 860-7086</a>
            </Button>
            <Button 
              size="xl" 
              className="w-full sm:w-auto h-11 md:h-16 text-sm md:text-lg font-bold bg-white text-brand-green hover:bg-gray-100 rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-95 xl:hidden"
              asChild
            >
              <a href="#estimate-form">Get Free Estimate</a>
            </Button>
          </div>

          <div className="mt-6 md:mt-12 grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-6 w-full md:w-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 text-left md:text-left xl:max-h-[44px] xl:overflow-hidden">
            {["Certified Arborist", "Licensed & Insured", "Free Estimates", "Local Pasco Team"].map((item, i) => (
              <div key={i} className="flex items-center justify-center md:justify-start gap-1.5 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 text-white text-xs md:text-base font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-brand-orange shrink-0" />
                <span className="whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:block w-full max-w-md shrink-0 animate-in fade-in slide-in-from-right-10 duration-700 delay-300">
          <HeroContactForm />
        </div>
      </div>
    </section>
  );
}
