import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious Kenyan cuisine by Sabra's Kitchen"
          className="w-full h-full object-cover scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/85" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <span className="inline-block text-secondary/90 font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-6">
              Authentic Kenyan Cuisine
            </span>
          </div>

          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Crafting Delicious Moments,{" "}
            <span className="text-gradient-gold">The Sabra's Way.</span>
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed"
            style={{ animationDelay: "0.4s" }}
          >
            Authentic Kenyan catering for events, celebrations & everyday moments — bringing the rich flavors of East Africa to your table.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <Button variant="hero" size="xl" className="shadow-warm-lg" asChild>
              <a href="#services">Explore Our Services</a>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="border-white/80 text-white hover:bg-white hover:text-foreground"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-widest font-sans">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
