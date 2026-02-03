import { Shield, HardHat, MapPin, Smile, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Shield,
    title: "Certified Arborist",
    desc: "We don't just cut trees; we understand them. Our certified expertise ensures the health and safety of your property."
  },
  {
    icon: HardHat,
    title: "Safety-First Equipment",
    desc: "From cranes to forestry mulchers, we use state-of-the-art machinery and strict safety protocols on every job."
  },
  {
    icon: MapPin,
    title: "Locally Owned",
    desc: "Proudly serving our Pasco County neighbors with honest pricing and a reputation built on trust."
  },
  {
    icon: Smile,
    title: "Satisfaction Guaranteed",
    desc: "We treat your property like our own. We don't leave until the job is done right and the cleanup is spotless."
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-green rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-brand-orange rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold uppercase tracking-wide mb-6">
              <CheckCircle className="w-4 h-4" />
              <span>The Grand Oaks Difference</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-6 leading-tight">
              Why Pasco County <br/>
              <span className="text-brand-green">Trusts Us</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Hiring a tree service is a big decision. You need a team that respects your property and delivers results without the risk. We combine professional certifications with local care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-brand-green group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-brand-charcoal mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:w-1/2 relative mt-10 lg:mt-0">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/images/hero-bg.jpg" 
                alt="Arborist climbing tree" 
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>
              
              {/* Floating Stats Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-brand-charcoal font-bold text-lg">Fully Licensed</p>
                    <p className="text-gray-500 text-sm">Passco County Approved</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div>
                    <p className="text-brand-charcoal font-bold text-lg">5-Star Rated</p>
                    <p className="text-gray-500 text-sm">Community Trusted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-brand-green/20 rounded-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-dots-pattern opacity-20"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
