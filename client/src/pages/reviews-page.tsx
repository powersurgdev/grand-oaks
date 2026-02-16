import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileCTA";
import { CheckCircle2 } from "lucide-react";

function loadSociableKitScript() {
  const src = "https://widgets.sociablekit.com/google-reviews/widget.js";
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
}

export default function ReviewsPage() {
  useEffect(() => {
    loadSociableKitScript();
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold tracking-widest uppercase text-sm text-white/80" data-testid="text-reviews-label">Google Reviews</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] uppercase leading-tight text-white" data-testid="text-reviews-heading">
              What Our Customers Say
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
              Real reviews from Pasco County homeowners who trusted Grand Oaks with their trees.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-brand-offwhite">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-4xl mx-auto" data-testid="reviews-page-widget">
              <div className="sk-ww-google-reviews" data-embed-id="25655088"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
