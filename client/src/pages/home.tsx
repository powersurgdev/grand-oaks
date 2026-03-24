import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import StatusBanner from "@/components/landing/StatusBanner";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import Gallery from "@/components/landing/Gallery";
import Reviews from "@/components/landing/Reviews";
import ContactForm from "@/components/landing/ContactForm";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-green selection:text-white">
      <Header />
      <main>
        <Hero />
        <StatusBanner />
        <Services />
        <WhyUs />
        <Gallery />
        <Reviews />
        <ContactForm formSource="homepage-bottom" />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
