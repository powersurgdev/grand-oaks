import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import ContactForm from "@/components/landing/ContactForm";

const faqs = [
  {
    q: "Are you licensed and insured?",
    a: "Yes, absolutely. We are fully licensed and insured for your protection and peace of mind. We can provide proof of insurance upon request before any work begins.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! We provide free, no-obligation estimates for all of our services. We'll come out to your property, assess the job, and give you an honest, competitive quote.",
  },
  {
    q: "How quickly can you come out for an estimate?",
    a: "We strive to provide estimates within 24–48 hours of your call, and often can come out same-day for urgent needs.",
  },
  {
    q: "Do you offer emergency tree services?",
    a: "Yes! We offer 24/7 emergency response for storm damage, fallen trees on structures, and hazardous situations. Call us anytime at (813) 860-7086.",
  },
  {
    q: "What areas do you serve?",
    a: "We proudly serve Pasco County and the surrounding areas including Wesley Chapel, Land O' Lakes, Dade City, Zephyrhills, Lutz, San Antonio, Darby, and St. Leo.",
  },
  {
    q: "Do you handle the cleanup after the job?",
    a: "Yes. We pride ourselves on leaving your property cleaner than we found it. We haul away all debris, wood, and leaves unless you request otherwise.",
  },
  {
    q: "Can you remove a tree close to my house or power lines?",
    a: "Absolutely. We specialize in hazardous tree removals near structures and utility lines. Our team uses professional climbing techniques and crane-assisted removal when needed to ensure safety.",
  },
  {
    q: "How much does tree removal cost?",
    a: "The cost depends on the size, location, and complexity of the tree. We provide free on-site estimates so we can give you an accurate and fair price for your specific situation.",
  },
  {
    q: "What is stump grinding and do I need it?",
    a: "Stump grinding removes the remaining stump after a tree is cut down, grinding it below ground level. It prevents pest infestations, reclaims yard space, and eliminates tripping hazards. We recommend it after any tree removal.",
  },
  {
    q: "Do I need a permit to remove a tree in Pasco County?",
    a: "Permit requirements vary depending on the size and species of the tree and your location within Pasco County. We can help you determine if a permit is needed and assist with the process.",
  },
  {
    q: "What is land clearing and who needs it?",
    a: "Land clearing involves removing trees, brush, and vegetation from a property. It's commonly needed for new construction, pasture restoration, fence line clearing, or general property maintenance.",
  },
  {
    q: "How do I know if a tree is dangerous and needs to be removed?",
    a: "Warning signs include large dead branches, trunk cracks or splits, leaning, root damage, fungal growth, and hollow sections. If you're unsure, we offer free assessments to evaluate your trees and recommend the safest course of action.",
  },
  {
    q: "What's the difference between tree trimming and tree removal?",
    a: "Tree trimming involves selectively pruning branches to improve health, appearance, and safety while keeping the tree. Tree removal is the complete takedown of a tree when it's dead, hazardous, or unwanted.",
  },
  {
    q: "Do you work with insurance companies?",
    a: "Yes. If your tree damage is covered by homeowner's insurance, we can work with your insurance company and provide the documentation they need for your claim.",
  },
  {
    q: "What happens if it rains on my scheduled service day?",
    a: "Safety is our top priority. If weather conditions make the job unsafe, we'll reschedule as soon as possible. We'll always communicate with you in advance if a reschedule is needed.",
  },
];

export default function FAQPage() {
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] uppercase leading-tight text-white" data-testid="text-faq-heading">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
              Answers to common questions about our tree services.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100" data-testid={`faq-item-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold text-brand-charcoal hover:text-brand-green text-left py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
