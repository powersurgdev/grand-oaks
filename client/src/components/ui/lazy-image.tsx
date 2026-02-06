import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  "data-testid"?: string;
}

export default function LazyImage({ src, alt, className, width, height, priority = false, "data-testid": testId }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const jpgFallback = src.replace(".webp", ".jpg");

  return (
    <div ref={imgRef} className={cn("overflow-hidden", className)}>
      {inView && (
        <picture>
          <source srcSet={src} type="image/webp" />
          <source srcSet={jpgFallback} type="image/jpeg" />
          <img
            src={jpgFallback}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            data-testid={testId}
            onLoad={() => setLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0"
            )}
          />
        </picture>
      )}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
