import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import ContactForm from "@/components/landing/ContactForm";
import Services from "@/components/landing/Services";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-green selection:text-white">
      <Header />

      <main>
        <section className="pt-32 md:pt-40">
          <ContactForm />
        </section>

        <Services />
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
