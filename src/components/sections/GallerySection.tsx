import { useState } from "react";
import { X } from "lucide-react";
import { galleryImages } from "@/data/mockData";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-background">
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

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="relative rounded-lg overflow-hidden shadow-theme-sm hover:shadow-theme-lg transition-shadow">
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                  <span className="text-card font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-card hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
