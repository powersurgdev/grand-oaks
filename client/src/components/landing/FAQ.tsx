import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are you licensed and insured?",
    a: "Yes, absolutely. We are fully insured and certified for your protection and peace of mind. We can provide proof of insurance upon request."
  },
  {
    q: "Do you offer emergency tree services?",
    a: "Yes! We offer 24/7 emergency response for storm damage, fallen trees on structures, and hazardous situations."
  },
  {
    q: "Do you handle the cleanup after the job?",
    a: "Yes. We pride ourselves on leaving your property cleaner than we found it. We haul away all debris, wood, and leaves unless you request otherwise."
  },
  {
    q: "How quickly can you come out for an estimate?",
    a: "We strive to provide estimates within 24-48 hours of your call, and often can come out same-day for urgent needs."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-extrabold text-brand-charcoal text-center mb-10">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100">
              <AccordionTrigger className="text-lg font-semibold text-brand-charcoal hover:text-brand-green text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
