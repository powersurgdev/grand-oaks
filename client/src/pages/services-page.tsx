import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import StatusBanner from "@/components/landing/StatusBanner";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import LazyImage from "@/components/ui/lazy-image";

const services = [
  {
    title: "Tree Removal",
    desc: "Safe removal of hazardous, dead, or unwanted trees of any size using professional climbing or crane techniques.",
    image: "/images/optimized/service-tree-removal.webp",
    link: "/services/tree-removal",
  },
  {
    title: "Tree Trimming",
    desc: "Expert pruning to promote tree health, safety, and aesthetics, performed by certified arborists.",
    image: "/images/optimized/service-tree-trimming.webp",
    link: "/services/tree-trimming",
    imageStyle: { objectPosition: "center 15%" },
  },
  {
    title: "Stump Grinding",
    desc: "Complete stump removal to reclaim your yard and prevent pests, leaving your property clean and level.",
    image: "/images/optimized/service-stump-grinding.webp",
    link: "/services/stump-grinding",
  },
  {
    title: "Land Clearing",
    desc: "Efficient lot clearing and forestry mulching for new construction, pasture restoration, or property usage.",
    image: "/images/optimized/service-land-clearing.webp",
    link: "/services/land-clearing",
    imageStyle: { objectPosition: "50% 25%" },
  },
  {
    title: "Emergency Tree Services",
    desc: "24/7 rapid response for storm damage and dangerous fallen trees threatening your home or business.",
    image: "/images/optimized/service-emergency.webp",
    link: "/services/emergency-tree-service",
    imageStyle: { objectPosition: "50% 25%" },
  },
];

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />

      <main>
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-brand-green to-[#1a3d18] text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)" }}></div>
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] uppercase leading-tight text-white" data-testid="text-services-heading">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
              Professional tree care and land solutions for homeowners and businesses in Pasco County.
            </p>
          </div>
        </section>

        <StatusBanner />

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Link key={index} href={service.link} className="block no-underline" data-testid={`link-service-${service.link.split("/").pop()}`}>
                  <div className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-gray-50 flex flex-col h-full cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <LazyImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        style={(service as any).imageStyle}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h2 className="text-xl md:text-2xl font-bold text-brand-green mb-2">{service.title}</h2>
                      <p className="text-gray-600 mb-4 flex-grow">{service.desc}</p>
                      <span className="text-brand-orange font-bold flex items-center text-sm group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
