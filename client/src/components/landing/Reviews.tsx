import { useEffect, useRef } from "react";

function loadSociableKitScript() {
  const src = "https://widgets.sociablekit.com/google-reviews/widget.js";
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
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
          <h2 className="text-brand-green font-bold tracking-widest uppercase mb-2 text-sm">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Trusted by Your Neighbors
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what homeowners across Pasco County are saying about our work.
          </p>
        </div>

        <div
          className="max-w-5xl mx-auto"
          ref={widgetRef}
          data-testid="reviews-widget-container"
        >
          <div className="sk-ww-google-reviews" data-embed-id="25653642"></div>
        </div>
      </div>
    </section>
  );
}
