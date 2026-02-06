import { motion } from "framer-motion";
import LazyImage from "@/components/ui/lazy-image";

const galleryImages = [
  { src: "/images/optimized/gallery-climbing.webp", alt: "Arborist climbing", span: "col-span-1 row-span-1" },
  { src: "/images/optimized/gallery-crane.webp", alt: "Crane removal", span: "col-span-1 row-span-1" },
  { src: "/images/optimized/gallery-stump.webp", alt: "Stump grinding", span: "col-span-1 row-span-1" },
  { src: "/images/optimized/gallery-crew.webp", alt: "Tree crew", span: "col-span-1 row-span-1" },
  { src: "/images/optimized/gallery-pruning.webp", alt: "Precision pruning", span: "col-span-1 row-span-1" },
  { src: "/images/optimized/gallery-machinery.webp", alt: "Land clearing", span: "col-span-1 row-span-1" },
];

export default function ServicePageGallery() {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-brand-charcoal mb-6">Recent Projects</h3>
      <div className="grid grid-cols-2 gap-3 auto-rows-[150px] md:auto-rows-[180px]">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className={`relative rounded-xl overflow-hidden shadow-sm group ${image.span}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <LazyImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full transition-transform duration-700 group-hover:scale-110"
              data-testid={`img-service-gallery-${index}`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-bold text-sm drop-shadow-md px-2 text-center">{image.alt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
