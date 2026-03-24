import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import LazyImage from "@/components/ui/lazy-image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span: string;
  className?: string | null;
  sortOrder: number;
}

const fallbackImages = [
  { id: 1, src: "/images/optimized/gallery-residential-job.webp", alt: "Tight Access Work", span: "col-span-1 md:col-span-1 row-span-2", sortOrder: 1 },
  { id: 2, src: "/images/optimized/gallery-crane-pool.webp", alt: "Zero-Impact Removal", span: "col-span-1 md:col-span-1", sortOrder: 2 },
  { id: 3, src: "/images/optimized/gallery-crane-setup.webp", alt: "Crane Operations", span: "col-span-1 md:col-span-1", sortOrder: 3 },
  { id: 4, src: "/images/optimized/gallery-team-work.webp", alt: "Tree Crew", span: "col-span-1 md:col-span-1", sortOrder: 4 },
  { id: 5, src: "/images/optimized/gallery-bucket-truck.webp", alt: "Bucket Truck Service", span: "col-span-1 md:col-span-1 row-span-2", sortOrder: 5 },
  { id: 6, src: "/images/optimized/gallery-machinery.webp", alt: "Land Clearing", span: "col-span-1 md:col-span-2", sortOrder: 6 },
  { id: 7, src: "/images/optimized/gallery-crane-lift.webp", alt: "Sectional Removal", span: "col-span-1 md:col-span-1", sortOrder: 7 },
  { id: 8, src: "/images/optimized/gallery-climber-action.webp", alt: "Expert Climbing", span: "col-span-1 md:col-span-1", className: "object-[50%_25%]", sortOrder: 8 },
  { id: 9, src: "/images/optimized/gallery-stump-removal.webp", alt: "Stump Removal", span: "col-span-1 md:col-span-1", sortOrder: 9 },
];

export default function Gallery() {
  const { data: images } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
    staleTime: 5 * 60 * 1000,
  });

  const galleryImages = images && images.length > 0 ? images : fallbackImages;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-3">Our Work in Pasco County</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4" data-testid="text-gallery-title">
            Recent Projects Gallery
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See the quality and care we bring to every job. From complex crane removals to complete land clearing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]" data-testid="gallery-grid">
          {galleryImages.map((image, index) => {
            const delayClasses = [
              '',
              'delay-100',
              'delay-200',
              'delay-300',
              'delay-400',
              'delay-500',
              'delay-600',
              'delay-700',
              'delay-800',
              'delay-900',
            ];
            const delayClass = delayClasses[index % 10] || '';

            return (
              <div
                key={image.id || index}
                className={cn(
                  "relative rounded-xl overflow-hidden shadow-md group animate-fade-in-up",
                  image.span,
                  delayClass
                )}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full h-full transition-transform duration-700 group-hover:scale-110",
                    image.className
                  )}
                  data-testid={`img-gallery-${image.id || index}`}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-md">{image.alt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
