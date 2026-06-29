import { Button } from "@/components/ui/button";
import { Award, Users, UtensilsCrossed } from "lucide-react";
import aboutImage from "@/assets/about-chef.jpg";

const stats = [
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Events Catered" },
  { icon: UtensilsCrossed, value: "50+", label: "Signature Recipes" },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-xl">
              <img
                src={aboutImage}
                alt="Chef preparing traditional Kenyan dishes"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            </div>
            {/* Decorative frame elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-secondary/30 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-xl -z-10" />

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-card shadow-warm-lg rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-foreground">Family Recipes</p>
                <p className="text-xs text-muted-foreground">Since 2015</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-in-right">
            <div className="flex items-center gap-3 mb-3">
              <span className="section-subtitle">Our Story</span>
              <div className="h-px flex-1 bg-gradient-to-r from-secondary/50 to-transparent max-w-20" />
            </div>
            <h2 className="section-title mt-2 mb-6">
              About <span className="text-gradient">Sabra's Kitchen</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Founded with a passion for authentic Kenyan cuisine, Sabra's Kitchen has been
                bringing families and communities together through the power of food for over
                a decade.
              </p>
              <p>
                Our journey began in a small home kitchen, where recipes passed down through
                generations came to life. Today, we serve hundreds of events each year, but our
                commitment to quality, tradition, and the warmth of Kenyan hospitality remains unchanged.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-muted/50 border border-border/50">
                  <stat.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <p className="font-serif text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button variant="gold" size="lg" asChild>
              <a href="#contact">Discover Our Story</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
