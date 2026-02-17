import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function ServiceSidebar() {
  const [location] = useLocation();

  // Helper to check active state
  const isActive = (path: string) => location === path;

  return (
    <div className="hidden lg:block w-80 shrink-0 space-y-8 sticky top-32 h-fit">
      
      {/* Service Menu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-brand-charcoal p-6">
          <h3 className="text-white font-bold text-lg">Our Services</h3>
        </div>
        <div className="p-2">
          {Object.entries(servicesData).map(([slug, service]) => (
            <Link key={slug} href={`/services/${slug}`} className={`
              flex items-center justify-between px-4 py-3 rounded-xl transition-all mb-1
              ${isActive(`/services/${slug}`) 
                ? 'bg-brand-green text-white font-bold shadow-md' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-green font-medium'
              }
            `}>
              <span className="flex items-center gap-3">
                <service.icon className="w-4 h-4" />
                {service.title}
              </span>
              {isActive(`/services/${slug}`) && <ArrowRight className="w-4 h-4" />}
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Widget */}
      <div className="bg-brand-green rounded-2xl shadow-lg p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <h3 className="text-xl font-extrabold mb-2 relative z-10 text-white">Need Help?</h3>
        <p className="text-brand-offwhite/90 mb-6 text-sm relative z-10">
          Speak with a certified arborist today.
        </p>

        <a 
          href="tel:8138607086" 
          onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }}
          className="flex items-center justify-center gap-2 text-2xl font-bold bg-white text-brand-green py-3 rounded-xl shadow-md hover:bg-gray-100 transition-colors w-full mb-4 relative z-10"
        >
          <Phone className="w-5 h-5 fill-brand-green" />
          (813) 860-7086
        </a>

        <Button 
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-xl h-12 relative z-10"
          asChild
        >
          <a href="#estimate-form">Get Free Estimate</a>
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-brand-offwhite/80 relative z-10">
          <CheckCircle2 className="w-3 h-3" />
          <span>Licensed & Insured</span>
        </div>
      </div>

    </div>
  );
}
