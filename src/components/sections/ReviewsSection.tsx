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
    <section id="reviews" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Decorative large quote mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] lg:text-[300px] font-serif text-primary/5 select-none pointer-events-none leading-none">
        &ldquo;
      </div>

      {/* Decorative blobs */}
      <div className="organic-blob w-80 h-80 bg-secondary/10 top-20 -left-40" />
      <div className="organic-blob w-64 h-64 bg-primary/5 -bottom-32 right-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-[0.2em] font-sans">
            Testimonials
          </span>
          <h2 className="section-title mt-3 mb-4 gold-accent inline-block pb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">
            Don&apos;t just take our word for it &mdash; hear from our satisfied clients.
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-11 h-11 lg:w-13 lg:h-13 rounded-full border-2 border-secondary/30 bg-card/80 backdrop-blur-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300 z-10 shadow-warm-sm hover:shadow-warm-md"
              aria-label="Previous review"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-11 h-11 lg:w-13 lg:h-13 rounded-full border-2 border-secondary/30 bg-card/80 backdrop-blur-sm flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300 z-10 shadow-warm-sm hover:shadow-warm-md"
              aria-label="Next review"
            >
              <ChevronRight size={22} />
            </button>

            {/* Review Card */}
            <div key={currentIndex} className="glass-card rounded-2xl p-8 lg:p-12 animate-fade-in">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with gold ring */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full ring-2 ring-secondary/40 ring-offset-4 ring-offset-card" />
                  <img
                    src={reviews[currentIndex].avatar}
                    alt={reviews[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover relative z-10"
                  />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < reviews[currentIndex].rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/20"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-6 font-serif italic">
                  &ldquo;{reviews[currentIndex].reviewText}&rdquo;
                </blockquote>

                {/* Name & Event */}
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    {reviews[currentIndex].name}
                  </p>
                  <p className="text-sm text-secondary font-medium">
                    {reviews[currentIndex].eventType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2.5 bg-secondary"
                    : "w-2.5 h-2.5 bg-muted-foreground/20 hover:bg-secondary/50"
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
