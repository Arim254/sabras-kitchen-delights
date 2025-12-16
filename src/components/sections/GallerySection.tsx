import { useState, useRef } from "react";
import { X } from "lucide-react";
import { galleryImages } from "@/data/mockData";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0.5);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setHoverPosition(x);
    setHoveredIndex(index);
  };

  const getTransformStyle = (index: number) => {
    if (hoveredIndex === null) return {};
    
    const totalImages = galleryImages.length;
    const normalizedIndex = index / (totalImages - 1);
    const normalizedHover = hoveredIndex / (totalImages - 1);
    const diff = normalizedIndex - normalizedHover;
    const distance = Math.abs(diff);
    
    // Cosine falloff for smooth transitions
    const falloff = Math.max(0, Math.cos(Math.min(distance * 2.5, 1) * Math.PI * 0.5));
    
    // Calculate tilt based on position relative to hovered item
    const tiltDirection = Math.sign(diff);
    const tilt = tiltDirection * falloff * 15;
    
    // Calculate z-translation (depth)
    const zTranslate = falloff * 80;
    
    // Calculate scale
    const scale = 1 + falloff * 0.15;
    
    return {
      transform: `
        perspective(2000px)
        translateZ(${zTranslate}px)
        rotateY(${tilt}deg)
        scale(${scale})
      `,
      filter: `brightness(${0.6 + falloff * 0.6}) saturate(${0.3 + falloff * 0.7})`,
      zIndex: Math.round(falloff * 10),
    };
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Gallery
          </h2>
          <p className="text-muted-foreground">
            A glimpse into our culinary creations and the events we've had the honor to cater.
          </p>
        </div>

        {/* 3D Perspective Gallery */}
        <div 
          ref={navRef}
          className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-end gap-1 md:gap-2"
          style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-1 h-full cursor-pointer group"
              style={{
                transformStyle: "preserve-3d",
                transition: hoveredIndex !== null 
                  ? "transform 70ms ease-out, filter 150ms ease-out, flex 300ms ease-out" 
                  : "transform 250ms ease-out, filter 300ms ease-out, flex 300ms ease-out",
                flex: hoveredIndex === index ? 3 : 1,
                ...getTransformStyle(index),
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => setSelectedImage(item.image)}
            >
              {/* Image Container */}
              <div 
                className="absolute inset-0 rounded-lg overflow-hidden shadow-theme-lg"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-card font-medium text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </span>
                </div>
                
                {/* Shine effect on hover */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.1) 45%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.1) 55%, transparent 60%)",
                    transform: `translateX(${(hoverPosition - 0.5) * 100}%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Hint text */}
        <p className="text-center text-muted-foreground/60 text-sm mt-6">
          Hover to explore • Click to view full size
        </p>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-card hover:text-primary transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </section>
  );
}
