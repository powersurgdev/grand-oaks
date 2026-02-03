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
    <section className="relative w-full min-h-[600px] md:h-[80vh] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center md:items-start text-center md:text-left pt-20 pb-10">
        
        <div className="inline-flex items-center gap-2 bg-brand-green/90 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShieldCheck className="w-4 h-4" />
          <span>Licensed & Fully Insured in Pasco County</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Complete Property <br className="hidden md:block" />
          Maintenance Services <br />
          <span className="text-brand-orange">Built for Florida Properties</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-100 mb-8 max-w-2xl font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed">
          From certified arborist tree work to land clearing, site prep, and ground services — we handle the work your property needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-14 md:h-16 px-8 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            asChild
          >
            <a href="tel:8138607086">Call Now (813) 860-7086</a>
          </Button>
          <Button 
            size="xl" 
            className="w-full sm:w-auto h-14 md:h-16 px-8 text-lg font-bold bg-white text-brand-green hover:bg-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            asChild
          >
            <a href="#contact">Get Free Estimate</a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
          {[
            "Certified Arborist", 
            "Licensed & Insured", 
            "Free Estimates",
            "Local Pasco County Team"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-white font-semibold">
              <CheckCircle2 className="w-5 h-5 text-brand-orange" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
