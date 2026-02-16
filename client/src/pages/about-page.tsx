import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import Services from "@/components/landing/Services";
import ContactForm from "@/components/landing/ContactForm";

export default function AboutPage() {
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] uppercase leading-tight text-white" data-testid="text-about-heading">
              About Grand Oaks
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
              Professional tree care rooted in experience, safety, and local expertise.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Grand Oaks Property Maintenance is a locally owned and operated tree service company serving Pasco County and the surrounding areas. With over 15 years of hands-on experience, we specialize in tree removal, trimming, stump grinding, land clearing, and emergency storm response.
              </p>
              <p>
                We're Florida natives who understand the unique challenges that come with caring for trees in our state — from hurricane seasons and fast-growing species to sandy soils and local regulations. Every job we take on is approached with professionalism, safety, and respect for your property.
              </p>
              <p>
                Our team is fully licensed and insured, and we hold ourselves to certified arborist standards. Whether it's a routine trim or a complex hazardous removal, we treat every project with the same level of care and attention.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "15+ Years of Experience",
                "Licensed & Fully Insured",
                "Certified Arborist Standards",
                "Florida Natives",
                "Complete Cleanup Included",
                "Free Estimates",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`text-about-feature-${i}`}>
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span className="font-semibold text-brand-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />

        <ContactForm />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
