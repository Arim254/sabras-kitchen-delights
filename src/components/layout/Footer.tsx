import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

const quickLinks = ["Home", "About", "Services", "Gallery", "Reviews"];
const recipeCategories = ["Family-friendly", "Dinner", "Breakfast", "Desserts", "Drinks"];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-border overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary/50 via-amber-400/50 to-transparent" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="organic-blob w-96 h-96 bg-primary/5 -top-48 -left-48" />
        <div className="organic-blob w-72 h-72 bg-secondary/5 -bottom-36 -right-36" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-gradient">
                Sabra's Kitchen
              </span>
              <span className="text-secondary text-lg">✦</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Crafting delicious moments with authentic Kenyan cuisine for events,
              celebrations, and everyday moments.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-muted/70 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-white hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-5 relative inline-block">
              Quick Links
              <span className="block mt-1.5 w-8 h-0.5 bg-gradient-to-r from-secondary to-amber-400 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors duration-200" />
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/recipes"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors duration-200" />
                  Recipes
                </Link>
              </li>
            </ul>
          </div>

          {/* Recipes */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-5 relative inline-block">
              Recipes
              <span className="block mt-1.5 w-8 h-0.5 bg-gradient-to-r from-secondary to-amber-400 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {recipeCategories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/recipes?category=${encodeURIComponent(category)}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors duration-200" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-5 relative inline-block">
              Contact Us
              <span className="block mt-1.5 w-8 h-0.5 bg-gradient-to-r from-secondary to-amber-400 rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                  <Mail size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Email</p>
                  <a
                    href="mailto:sabraskitchen1@gmail.com"
                    className="text-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    sabraskitchen1@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                  <Phone size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Phone</p>
                  <a
                    href="tel:+254722899195"
                    className="text-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    +254 722 899 195
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                  <MapPin size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Location</p>
                  <span className="text-foreground/80 text-sm">Nairobi, Kenya</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            &copy; {currentYear} Sabra's Kitchen Delights. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs flex items-center gap-1">
            Crafted with <Heart size={12} className="text-primary fill-primary" /> in Nairobi
          </p>
        </div>
      </div>
    </footer>
  );
}
