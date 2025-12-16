import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-chef.jpg";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-theme-lg">
              <img
                src={aboutImage}
                alt="Chef preparing traditional Kenyan dishes"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div className="animate-slide-in-right">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-6">
              About Sabras Kitchen
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a passion for authentic Kenyan cuisine, Sabras Kitchen has been 
                bringing families and communities together through the power of food for over 
                a decade.
              </p>
              <p>
                Our journey began in a small home kitchen, where recipes passed down through 
                generations came to life. Today, we serve hundreds of events each year, but our 
                commitment to quality, authenticity, and love in every dish remains unchanged.
              </p>
              <p>
                From intimate family gatherings to grand celebrations, we believe that great 
                food creates lasting memories. Let us be part of your next special moment.
              </p>
            </div>
            <Button variant="hero" size="lg" className="mt-8" asChild>
              <a href="#services">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
