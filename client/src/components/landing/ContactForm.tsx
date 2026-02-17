import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function ContactForm() {
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
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/5 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">Get Your Free Estimate</h2>
              <p className="text-lg text-gray-600">
                Tell us about your project and we'll get back to you with a competitive quote. No obligation, no hidden fees.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-xl">1</div>
                <div>
                  <h4 className="font-bold text-brand-charcoal">Request a Quote</h4>
                  <p className="text-sm text-gray-500">Fill out the form or call us.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-xl">2</div>
                <div>
                  <h4 className="font-bold text-brand-charcoal">On-Site Assessment</h4>
                  <p className="text-sm text-gray-500">We'll visit to evaluate the job safely.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-xl">3</div>
                <div>
                  <h4 className="font-bold text-brand-charcoal">Job Completion</h4>
                  <p className="text-sm text-gray-500">Professional service and cleanup.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2">Service Areas</h4>
              <p className="text-gray-600">
                Proudly Serving Pasco County & Nearby Areas: <br/>
                <span className="font-medium text-brand-green">Wesley Chapel, Land O' Lakes, Dade City, Zephyrhills, Lutz, San Antonio, Darby, St. Leo</span>
              </p>
            </div>
          </div>

          <Card id="estimate-form" className="shadow-xl border-none rounded-3xl overflow-hidden scroll-mt-32">
            <CardHeader className="bg-brand-green text-white p-8">
              <CardTitle className="text-2xl text-white">Contact Us Today</CardTitle>
              <CardDescription className="text-brand-offwhite/80">
                Prefer calling? <a href="tel:8138607086" onClick={() => { if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion('tel:8138607086'); }} className="font-bold text-white hover:underline">(813) 860-7086</a>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <Input
                        data-testid="input-fullname"
                        placeholder="John Doe"
                        className="h-12 rounded-xl bg-gray-50 border-gray-200"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <Input
                        data-testid="input-phone"
                        placeholder="(555) 123-4567"
                        className="h-12 rounded-xl bg-gray-50 border-gray-200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Service Needed</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200" data-testid="select-service">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message (Optional)</label>
                  <Textarea
                    data-testid="input-message"
                    placeholder="Tell us a bit about the trees or property..." 
                    className="min-h-[120px] rounded-xl bg-gray-50 border-gray-200 resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="button-submit"
                  disabled={submitMutation.isPending}
                  className="w-full h-14 text-lg font-bold bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg mt-2"
                >
                  {submitMutation.isPending ? "Sending..." : "Get My Free Estimate"}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
