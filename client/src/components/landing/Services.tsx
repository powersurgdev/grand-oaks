import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

import { cn } from "@/lib/utils";
import LazyImage from "@/components/ui/lazy-image";

const services = [
  {
    title: "Tree Removal",
    desc: "Safe removal of hazardous, dead, or unwanted trees of any size using professional climbing or crane techniques.",
    image: "/images/optimized/service-tree-removal.webp",
    link: "/services/tree-removal"
  },
  {
    title: "Tree Trimming",
    desc: "Expert pruning to promote tree health, safety, and aesthetics, performed by certified arborists.",
    image: "/images/optimized/service-tree-trimming.webp",
    link: "/services/tree-trimming",
    className: "object-[50%_25%]"
  },
  {
    title: "Stump Grinding",
    desc: "Complete stump removal to reclaim your yard and prevent pests, leaving your property clean and level.",
    image: "/images/optimized/service-stump-grinding.webp",
    link: "/services/stump-grinding"
  },
  {
    title: "Land Clearing",
    desc: "Efficient lot clearing and forestry mulching for new construction, pasture restoration, or property usage.",
    image: "/images/optimized/service-land-clearing.webp",
    link: "/services/land-clearing",
    className: "object-[50%_25%]"
  },
  {
    title: "Emergency Tree Services",
    desc: "24/7 rapid response for storm damage and dangerous fallen trees threatening your home or business.",
    image: "/images/optimized/service-emergency.webp",
    link: "/services/emergency-tree-service",
    className: "object-[50%_25%]"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Expert Tree Care & Land Solutions
          </h3>
          <p className="text-gray-600 text-lg">
            Grand Oaks specializes in professional tree services and land clearing for homeowners and businesses in Pasco County.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="block h-full no-underline">
              <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-gray-50 flex flex-col h-full cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    className={cn(
                      "w-full h-full transition-transform duration-500 group-hover:scale-105",
                      (service as any).className
                    )}
                    data-testid={`img-service-${service.link.split('/').pop()}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl font-bold text-brand-green leading-tight">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <CardDescription className="text-base text-gray-600 mb-6">
                    {service.desc}
                  </CardDescription>
                  <span className="text-brand-orange p-0 h-auto font-bold self-start group-hover:gap-2 transition-all flex items-center text-sm">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
