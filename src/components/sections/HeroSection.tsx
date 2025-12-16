import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious Kenyan cuisine by Sabras Kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-card mb-6 animate-fade-in">
            Crafting Delicious Moments,{" "}
            <span className="text-primary-foreground">The Sabras Way.</span>
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl text-card/90 mb-8 lg:mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Authentic Kenyan catering for events, celebrations & everyday moments.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#services">Explore Menu & Services</a>
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              className="border-card text-card hover:bg-card hover:text-foreground"
              asChild
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-card/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-card/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
