import { servicesData } from "@/data/services";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceSidebar from "@/components/services/ServiceSidebar";
import ServiceContact from "@/components/services/ServiceContact";
import ServicePageGallery from "@/components/services/ServicePageGallery";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

interface ServicePageProps {
  slug: keyof typeof servicesData;
}

export default function ServicePage({ slug }: ServicePageProps) {
  const service = servicesData[slug];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <NotFound />;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />
      
      <main>
        <ServiceHero 
          title={service.heroHeadline} 
          subtitle={service.heroSubheadline} 
          image={service.heroImage} 
        />

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Main Content */}
            <div className="flex-1">
              
              {/* Description */}
              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                <h2 className="text-3xl font-bold text-brand-charcoal mb-6">
                  Expert {service.title} in Pasco County
                </h2>
                <p className="text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="bg-brand-offwhite border-l-4 border-brand-green p-6 rounded-r-xl mb-10">
                  <h4 className="font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                    <service.icon className="w-5 h-5 text-brand-green" />
                    Common {service.title} Needs:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process Section */}
                {(service as any).process && (
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Our {service.title} Process</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(service as any).process.map((step: any, i: number) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg shadow-md">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-bold text-brand-charcoal text-lg mb-1">{step.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.details.map((detail, i) => (
                  <div key={i} className="mb-8">
                    <h3 className="text-2xl font-bold text-brand-charcoal mb-3">{detail.head}</h3>
                    <p className="leading-relaxed">{detail.body}</p>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-gray-100">
                      <AccordionTrigger className="text-left font-semibold text-brand-charcoal hover:text-brand-green text-lg py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-base pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Service Gallery */}
              <ServicePageGallery />

              {/* Clean Contact Section */}
              <ServiceContact />
              
            </div>

            {/* Sidebar (Desktop Sticky) */}
            <ServiceSidebar />

          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
