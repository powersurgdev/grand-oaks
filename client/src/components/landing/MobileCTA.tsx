import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck } from "lucide-react";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50 flex gap-3">
      <Button 
        className="flex-1 bg-brand-charcoal hover:bg-black text-white font-bold h-14 rounded-xl text-lg shadow-md"
        asChild
      >
        <a href="tel:8138607086">
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </a>
      </Button>
      <Button 
        className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-14 rounded-xl text-lg shadow-md"
        asChild
      >
        <a href="#estimate-form">
          <CalendarCheck className="w-5 h-5 mr-2" />
          Estimate
        </a>
      </Button>
    </div>
  );
}
