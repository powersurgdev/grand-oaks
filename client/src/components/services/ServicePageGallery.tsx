import { motion } from "framer-motion";

// Using the same pool of images, but we could filter this by service slug in the future
const galleryImages = [
  { src: "/images/gallery-climbing.jpg", alt: "Arborist climbing", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-crane.jpg", alt: "Crane removal", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-stump.jpg", alt: "Stump grinding", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-crew.jpg", alt: "Tree crew", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-pruning.jpg", alt: "Precision pruning", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-machinery.jpg", alt: "Land clearing", span: "col-span-1 row-span-1" },
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
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
