import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CheckCircle2 } from "lucide-react";

export default function ServiceContact() {
  return (
    <div id="estimate-form" className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 scroll-mt-32">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-extrabold text-brand-charcoal mb-2">Get Your Free Estimate</h3>
        <p className="text-gray-600">Fast response. Honest pricing. Professional service.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Full Name" className="h-12 bg-white rounded-xl border-gray-200" />
          <Input placeholder="Phone Number" className="h-12 bg-white rounded-xl border-gray-200" />
        </div>
        <Textarea 
          placeholder="How can we help? (e.g., Tree removal, stump grinding...)" 
          className="min-h-[120px] bg-white rounded-xl border-gray-200 resize-none" 
        />
        <Button className="w-full h-14 bg-brand-green hover:bg-brand-green/90 text-white font-bold text-lg rounded-xl shadow-lg">
          Request Free Quote
        </Button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-green" />
          <span>No Obligation</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-green" />
          <span>Licensed & Insured</span>
        </div>
      </div>
    </div>
  );
}
