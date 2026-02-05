import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, CheckCircle2, ShieldCheck, CalendarClock } from "lucide-react";

export default function ServiceContact() {
  return (
    <div id="estimate-form" className="relative overflow-hidden rounded-3xl shadow-xl scroll-mt-32 border border-gray-100 bg-white">
      {/* Header Section */}
      <div className="bg-brand-green p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 text-white">
            <ShieldCheck className="w-3 h-3" />
            Licensed & Insured
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Get Your Free Quote</h3>
          <p className="text-brand-offwhite/90 text-lg">
            Fast response times & honest pricing.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-8 md:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
            <Input placeholder="John Doe" className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-green focus:border-brand-green" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
            <Input placeholder="(813) 555-0123" className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-green focus:border-brand-green" />
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Service Needed</label>
            <Select>
              <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:ring-brand-green focus:border-brand-green">
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="removal">Tree Removal</SelectItem>
                <SelectItem value="trimming">Tree Trimming</SelectItem>
                <SelectItem value="stump">Stump Grinding</SelectItem>
                <SelectItem value="clearing">Land Clearing</SelectItem>
                <SelectItem value="emergency">Emergency Service</SelectItem>
              </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Details (Optional)</label>
          <Textarea 
            placeholder="Tell us a bit about the project..." 
            className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl resize-none focus:ring-brand-green focus:border-brand-green" 
          />
        </div>

        <Button className="w-full h-14 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-lg rounded-xl shadow-lg transition-transform active:scale-[0.99]">
          Get My Free Estimate
        </Button>

        <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-brand-green" />
            <span>Fast Turnaround</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-gray-400 hidden md:inline">|</span>
             <span>Prefer to call?</span>
             <a href="tel:8138607086" className="font-bold text-brand-charcoal hover:text-brand-green transition-colors">(813) 860-7086</a>
          </div>
        </div>
      </div>
    </div>
  );
}
