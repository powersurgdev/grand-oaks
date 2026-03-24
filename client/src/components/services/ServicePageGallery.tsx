import LazyImage from "@/components/ui/lazy-image";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const allGalleryImages = [
  { src: "/images/optimized/gallery-crane-setup.webp", alt: "Crane Operations", position: "center 30%" },
  { src: "/images/optimized/gallery-climber-action.webp", alt: "Expert Climbing", position: "center 15%" },
  { src: "/images/optimized/gallery-team-work.webp", alt: "Crew at Work", position: "center center" },
  { src: "/images/optimized/gallery-bucket-truck.webp", alt: "Bucket Truck Service", position: "center 35%" },
  { src: "/images/optimized/gallery-crane-lift.webp", alt: "Sectional Removal", position: "center 40%" },
  { src: "/images/optimized/gallery-crane-pool.webp", alt: "Precision Crane Work", position: "center 55%" },
  { src: "/images/optimized/gallery-residential-job.webp", alt: "Residential Job", position: "center 40%" },
  { src: "/images/optimized/gallery-stump-removal.webp", alt: "Stump Grinding", position: "center 45%" },
  { src: "/images/optimized/gallery-machinery.webp", alt: "Land Clearing", position: "center center" },
  { src: "/images/optimized/gallery-crane.webp", alt: "Tree Climbing", position: "center 35%" },
  { src: "/images/optimized/gallery-climbing.webp", alt: "Arborist Climbing", position: "center 30%" },
];

function seededShuffle(array: typeof allGalleryImages, seed: number) {
  const shuffled = [...array];
  let m = shuffled.length;
  while (m) {
    const i = Math.abs(Math.floor(Math.sin(seed++) * 10000)) % m--;
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }
  return shuffled;
}

interface ServicePageGalleryProps {
  slug?: string;
}

export default function ServicePageGallery({ slug = "default" }: ServicePageGalleryProps) {
  const images = useMemo(() => {
    let seed = 0;
    for (let i = 0; i < slug.length; i++) {
      seed += slug.charCodeAt(i);
    }
    return seededShuffle(allGalleryImages, seed).slice(0, 6);
  }, [slug]);

  // Masonry-style span pattern for better visual variety (repeats for 6 images)
  const spanPatterns = [
    "col-span-1 md:col-span-1 row-span-2", // Tall portrait
    "col-span-1 md:col-span-1",            // Regular
    "col-span-1 md:col-span-1",            // Regular
    "col-span-1 md:col-span-1",            // Regular
    "col-span-1 md:col-span-1 row-span-2", // Tall portrait
    "col-span-1 md:col-span-2",            // Wide landscape
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Recent Projects</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
        {images.map((image, index) => {
          const delayClasses = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];
          const delayClass = delayClasses[index % 6] || '';
          const spanClass = spanPatterns[index % 6] || 'col-span-1';

          return (
            <div
              key={index}
              className={cn(
                "relative rounded-xl overflow-hidden shadow-md group animate-fade-in-up",
                spanClass,
                delayClass
              )}
            >
              <LazyImage
                src={image.src}
                alt={image.alt}
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                style={{ objectPosition: image.position }}
                data-testid={`img-service-gallery-${index}`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base drop-shadow-md px-2 text-center">{image.alt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
