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
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Content & Trust Badges */}
          <div>
            <h2 className="text-brand-green font-bold tracking-widest uppercase mb-2 text-sm">Why Choose Us</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-brand-charcoal">
              The Grand Oaks Difference
            </h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We understand that hiring a tree service is a big decision. You need a team you can trust to respect your property, work safely, and deliver excellent results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl hover:shadow-md hover:border-brand-green/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-brand-green">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-brand-charcoal">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side: Image */}
          <div className="relative hidden lg:block h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/why-us-team.png" 
              alt="Team at work" 
              className="w-full h-full object-cover"
            />
            {/* Subtle overlay to ensure the image isn't too raw, but not heavy green */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
