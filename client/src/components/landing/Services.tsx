import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Tree Services",
    desc: "Complete tree care including removal, trimming, stump grinding, and emergency storm response.",
    image: "/images/service-removal.jpg"
  },
  {
    title: "Land Clearing & Forestry",
    desc: "Professional forestry mulching and large-scale land clearing for lots of any size.",
    image: "/images/service-forestry.jpg"
  },
  {
    title: "Site Prep & Property Development",
    desc: "Excavation, grading, and site preparation to get your property ready for construction.",
    image: "/images/service-siteprep.jpg"
  },
  {
    title: "Property Cleanup & Maintenance",
    desc: "Overgrown lot cleanup, debris removal, and restoring neglected properties to pristine condition.",
    image: "/images/service-cleanup.jpg"
  },
  {
    title: "Grounds & Lawn Services",
    desc: "Routine lawn care, mowing, and landscape maintenance for residential and commercial properties.",
    image: "/images/service-grounds.jpg"
  },
  {
    title: "Driveways & Ground Surfaces",
    desc: "Installation and repair of gravel driveways, culverts, and ground surface grading.",
    image: "/images/service-driveways.jpg"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Complete Property Solutions
          </h3>
          <p className="text-gray-600 text-lg">
            Grand Oaks offers more than just tree care. We provide comprehensive property maintenance and development services for homeowners and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl bg-gray-50 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                <Button variant="link" className="text-brand-orange p-0 h-auto font-bold self-start group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
