import { Star, CheckCircle2, Shield, Users } from "lucide-react";

const trustIndicators = [
  {
    icon: Star,
    text: "4.9 ON GOOGLE",
  },
  {
    icon: CheckCircle2,
    text: "CERTIFIED ARBORIST",
  },
  {
    icon: CheckCircle2,
    text: "LICENSED & INSURED",
  },
  {
    icon: CheckCircle2,
    text: "FREE ESTIMATES",
  },
  {
    icon: Users,
    text: "LOCAL PASCO TEAM",
  },
];

export default function StatusBanner() {
  return (
    <section className="bg-white border-y border-gray-200 overflow-hidden">
      <div className="py-3">
        {/* Desktop: Static centered layout */}
        <div className="hidden md:flex container mx-auto px-4 flex-wrap items-center justify-center gap-8 lg:gap-12">
          {trustIndicators.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-600"
              data-testid={`status-indicator-${index}`}
            >
              <item.icon className="w-4 h-4 text-brand-green shrink-0" />
              <span className="text-sm font-medium whitespace-nowrap uppercase tracking-wide">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: Infinite scrolling carousel */}
        <div className="md:hidden relative">
          <div className="flex animate-scroll-left">
            {/* First set of indicators */}
            {trustIndicators.map((item, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center gap-2 text-gray-600 px-6 shrink-0"
              >
                <item.icon className="w-4 h-4 text-brand-green shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap uppercase tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {trustIndicators.map((item, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center gap-2 text-gray-600 px-6 shrink-0"
              >
                <item.icon className="w-4 h-4 text-brand-green shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap uppercase tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
