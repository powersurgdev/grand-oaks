import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50">
      {/* Available Now indicator */}
      <div className="flex items-center justify-center py-2 border-b border-gray-100">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Available Now • Same-Day Service
        </span>
      </div>

      {/* Call button */}
      <div className="p-3">
        <Button
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-14 rounded-xl text-lg shadow-md"
          asChild
        >
          <a href="tel:8135443721" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8135443721'); }}>
            <Phone className="w-5 h-5 mr-2" />
            Call Now for Free Estimate
          </a>
        </Button>
      </div>
    </div>
  );
}
