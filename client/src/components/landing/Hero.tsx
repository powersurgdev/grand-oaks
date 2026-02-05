import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const backgroundImages = [
  "/images/hero-bg.jpg",
  "/images/service-forestry.jpg", 
  "/images/service-siteprep.jpg"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[550px] md:min-h-[80vh] flex flex-col justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={backgroundImages[currentImage]}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        {/* Mobile Gradient: darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 md:via-black/20 md:to-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center md:items-start text-center md:text-left pt-32 pb-12 md:pt-40 md:pb-10 h-full justify-center">
        
        {/* Mobile: Top Badge - More compact */}
        <div className="inline-flex items-center gap-1.5 bg-brand-green/90 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-6 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>Licensed & Fully Insured in Pasco County</span>
        </div>

        {/* Headline - Responsive sizing */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-3 md:mb-6 drop-shadow-lg max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 uppercase">
          Expert Tree Removal & <br />
          <span className="text-brand-orange">Arborist Care</span>
        </h1>

        {/* Subheadline - Concise on mobile */}
        <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-6 md:mb-8 max-w-xl md:max-w-3xl font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed px-2 md:px-0">
          Safe, professional tree work in Pasco County — removals, trimming, stump grinding, and storm response.
        </p>

        {/* CTAs - Full width on mobile, side-by-side on desktop */}
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-12 md:h-16 text-base md:text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-95"
            asChild
          >
            <a href="tel:8138607086">Call Now (813) 860-7086</a>
          </Button>
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-12 md:h-16 text-base md:text-lg font-bold bg-white text-brand-green hover:bg-gray-100 rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-95"
            asChild
          >
            <a href="#contact">Get Free Estimate</a>
          </Button>
        </div>

        {/* Trust Indicators - Grid on mobile for better space usage */}
        <div className="mt-6 md:mt-12 grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-6 w-full md:w-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500 text-left md:text-left">
          {[
            "Certified Arborist", 
            "Licensed & Insured", 
            "Free Estimates",
            "Local Pasco Team"
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center md:justify-start gap-1.5 bg-white/10 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20 text-white text-xs md:text-base font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-brand-orange shrink-0" />
              <span className="whitespace-nowrap">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
