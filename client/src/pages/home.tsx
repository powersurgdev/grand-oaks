import { lazy, Suspense } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import StatusBanner from "@/components/landing/StatusBanner";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import Reviews from "@/components/landing/Reviews"; // Not lazy loaded due to third-party widget
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";

// Lazy load below-the-fold components (except Reviews which has third-party widget)
const Gallery = lazy(() => import("@/components/landing/Gallery"));
const ContactForm = lazy(() => import("@/components/landing/ContactForm"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-green selection:text-white">
      <Header />
      <main>
        <Hero />
        <StatusBanner />
        <Services />
        <WhyUs />
        <Suspense fallback={<div className="py-20 md:py-28 bg-gray-50" />}>
          <Gallery />
        </Suspense>
        <Reviews />
        <Suspense fallback={<div className="py-20 md:py-28 bg-gray-50" />}>
          <ContactForm formSource="homepage-bottom" />
        </Suspense>
        <Suspense fallback={<div className="py-16 md:py-24 bg-white" />}>
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
