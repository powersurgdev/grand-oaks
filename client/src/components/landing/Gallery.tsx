import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Re-using the service images as "gallery" images for this mockup since we don't have separate gallery stock
const galleryImages = [
  "/images/service-removal.jpg",
  "/images/service-trimming.jpg",
  "/images/service-stump.jpg",
  "/images/service-clearing.jpg",
  "/images/hero-bg.jpg"
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">Our Recent Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the quality and care we bring to every project. From massive removals to precision trimming.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {galleryImages.map((src, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="p-1">
                  <Card className="border-none shadow-md overflow-hidden rounded-2xl">
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img 
                        src={src} 
                        alt={`Project ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white text-brand-green border-brand-green hover:bg-brand-green hover:text-white" />
          <CarouselNext className="hidden md:flex -right-12 bg-white text-brand-green border-brand-green hover:bg-brand-green hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}
