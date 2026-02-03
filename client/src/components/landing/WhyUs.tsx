import { Shield, HardHat, MapPin, Smile } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Certified Arborist",
    desc: "Expert knowledge to ensure the health and safety of your trees and property."
  },
  {
    icon: HardHat,
    title: "Safety-First Equipment",
    desc: "State-of-the-art machinery and strict safety protocols on every job site."
  },
  {
    icon: MapPin,
    title: "Locally Owned",
    desc: "Proudly serving Pasco County neighbors with honest, local pricing."
  },
  {
    icon: Smile,
    title: "Satisfaction Guaranteed",
    desc: "We don't leave until the job is done right and the cleanup is spotless."
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-brand-green text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-2">Why Choose Us</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
              The Grand Oaks Difference
            </h3>
            <p className="text-brand-offwhite/90 text-lg mb-8 leading-relaxed">
              We understand that hiring a tree service is a big decision. You need a team you can trust to respect your property, work safely, and deliver excellent results. Here's why Pasco County homeowners choose us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                  <item.icon className="w-10 h-10 text-brand-orange mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-sm text-brand-offwhite/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:block h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Team at work" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-green/20 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
