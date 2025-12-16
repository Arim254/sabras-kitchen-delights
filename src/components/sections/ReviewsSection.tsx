import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/data/mockData";

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it - hear from our satisfied clients.
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card shadow-theme-md flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-card shadow-theme-md flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>

            {/* Review Card */}
            <div className="bg-card rounded-lg shadow-theme-lg p-8 lg:p-12">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <img
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-muted"
                />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < reviews[currentIndex].rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-6 italic">
                  "{reviews[currentIndex].reviewText}"
                </blockquote>

                {/* Name & Event */}
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    {reviews[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reviews[currentIndex].eventType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted hover:bg-secondary"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
