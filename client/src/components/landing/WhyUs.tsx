import { Shield, HardHat, MapPin, Smile } from "lucide-react";

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
    <section id="why-us" className="py-20 md:py-24 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            The Grand Oaks Difference
          </h3>
          <p className="text-gray-600 text-lg">
            Hiring a tree service is a big decision. You need a team you can trust to respect your property, work safely, and deliver excellent results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                <item.icon className="w-7 h-7 text-brand-green group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-brand-charcoal mb-3">{item.title}</h4>
              <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
