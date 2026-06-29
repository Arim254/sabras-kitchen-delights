import { Button } from "@/components/ui/button";
import { services } from "@/data/mockData";

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="organic-blob w-96 h-96 bg-secondary/10 -top-48 -right-48" />
      <div className="organic-blob w-72 h-72 bg-primary/5 -bottom-36 -left-36" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-[0.2em] font-sans">
            What We Offer
          </span>
          <h2 className="section-title mt-3 mb-4 gold-accent inline-block pb-3">
            Our Services
          </h2>
          <p className="text-muted-foreground">
            From intimate gatherings to grand celebrations, we offer a range of catering
            services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group glass-card rounded-xl overflow-hidden animate-fade-in-up image-shine"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                {service.priceRange && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-medium text-xs rounded-full border border-secondary/20">
                      {service.priceRange}
                    </span>
                  </div>
                )}
                <Button variant="goldOutline" size="sm" className="w-full" asChild>
                  <a href="#contact">Book Now</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
