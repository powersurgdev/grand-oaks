import { useEffect, useRef } from "react";

function loadSociableKitScript() {
  const existing = document.querySelector('script[src^="https://widgets.sociablekit.com/google-reviews/widget.js"]');
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.src = `https://widgets.sociablekit.com/google-reviews/widget.js?v=${Date.now()}`;
  script.defer = true;
  document.body.appendChild(script);
}

export default function Reviews() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSociableKitScript();
  }, []);

  return (
    <section id="reviews" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <h2 className="text-brand-green font-bold tracking-widest uppercase text-sm">Google Reviews</h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Trusted by Your Neighbors
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what Pasco County homeowners are saying about us on Google.
          </p>
        </div>

        <div
          className="w-full"
          ref={widgetRef}
          data-testid="reviews-widget-container"
        >
          <div className="sk-ww-google-reviews" data-embed-id="25653642"></div>
        </div>
      </div>
    </section>
  );
}
