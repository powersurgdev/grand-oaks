import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const galleryImages = [
  // Row 1
  { src: "/images/gallery-residential-job.png", alt: "Tight Access Work", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/images/gallery-crane-pool.png", alt: "Zero-Impact Removal", span: "col-span-1 md:col-span-1" },
  { src: "/images/gallery-crane-setup.png", alt: "Crane Operations", span: "col-span-1 md:col-span-1" },
  { src: "/images/gallery-team-work.png", alt: "Tree crew", span: "col-span-1 md:col-span-1" },
  
  // Row 2
  { src: "/images/gallery-bucket-truck.png", alt: "Bucket Truck Service", span: "col-span-1 md:col-span-1 row-span-2" },
  { src: "/images/gallery-machinery.jpg", alt: "Land clearing", span: "col-span-1 md:col-span-2" },
  
  // Row 3
  { src: "/images/gallery-crane-lift.png", alt: "Sectional Removal", span: "col-span-1 md:col-span-1" },
  { src: "/images/gallery-climber-action.png", alt: "Expert Climbing", span: "col-span-1 md:col-span-1", className: "object-[50%_25%]" },
  { src: "/images/service-removal.jpg", alt: "Tree removal", span: "col-span-1 md:col-span-1" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-3">Our Work in Pasco County</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-brand-charcoal mb-4">
            Recent Projects Gallery
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See the quality and care we bring to every job. From complex crane removals to complete land clearing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl overflow-hidden shadow-md group ${image.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                  (image as any).className
                )}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg drop-shadow-md">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
