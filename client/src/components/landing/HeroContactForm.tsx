import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Phone } from "lucide-react";

export default function HeroContactForm() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const submitMutation = useMutation({
    mutationFn: async (data: { fullName: string; phone: string; service: string; message?: string }) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: (data) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "lead_form_submit_success" });
      toast({
        title: "Request Submitted!",
        description: data.message || "We'll get back to you shortly.",
      });
      setFullName("");
      setPhone("");
      setService("");
      setMessage("");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (813) 860-7086.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !service) {
      toast({
        title: "Missing information",
        description: "Please fill in your name, phone number, and select a service.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate({
      fullName: fullName.trim(),
      phone: phone.trim(),
      service,
      message: message.trim() || undefined,
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
      <div className="bg-brand-green px-6 py-4">
        <h3 className="text-xl font-bold text-white">Get Your Free Estimate</h3>
        <p className="text-white/80 text-sm flex items-center gap-1.5 mt-1">
          <Phone className="w-3.5 h-3.5" />
          Or call <a href="tel:8138607086" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }} className="font-bold text-white hover:underline">(813) 860-7086</a>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</label>
            <Input
              data-testid="hero-input-fullname"
              placeholder="John Doe"
              className="h-10 rounded-lg bg-gray-50 border-gray-200 text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</label>
            <Input
              data-testid="hero-input-phone"
              placeholder="(555) 123-4567"
              className="h-10 rounded-lg bg-gray-50 border-gray-200 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Service Needed</label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger className="h-10 rounded-lg bg-gray-50 border-gray-200 text-sm" data-testid="hero-select-service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="removal">Tree Removal</SelectItem>
              <SelectItem value="trimming">Tree Trimming</SelectItem>
              <SelectItem value="stump">Stump Grinding</SelectItem>
              <SelectItem value="clearing">Land Clearing</SelectItem>
              <SelectItem value="emergency">Emergency Tree Services</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Message <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
          <Textarea
            data-testid="hero-input-message"
            placeholder="Tell us about your project..."
            className="min-h-[80px] rounded-lg bg-gray-50 border-gray-200 resize-none text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          data-testid="hero-button-submit"
          disabled={submitMutation.isPending}
          className="w-full h-12 text-base font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg"
        >
          {submitMutation.isPending ? "Sending..." : "Get My Free Estimate"}
        </Button>

        <p className="text-xs text-center text-gray-400">No obligation. We typically respond within 1 hour.</p>
      </form>
    </div>
  );
}
