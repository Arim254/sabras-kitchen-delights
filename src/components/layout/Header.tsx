import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "/sabras-logo.png";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/recipes", label: "Recipes" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-lg border-b border-border/50 shadow-warm-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12">
              <img src={logo} alt="Sabra's Kitchen" className="w-full h-full object-contain" />
            </div>
            <span className={`font-serif text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-primary"
            }`}>
              Sabra's Kitchen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${
                  scrolled ? "text-foreground/80" : "text-primary"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <div className="flex items-center gap-3 pl-4 border-l border-border/30">
              <ThemeToggle />
              <Button variant="hero" size="sm" asChild>
                <a href="/#contact">Book Now</a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-foreground hover:bg-muted" : "text-primary"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 bg-card/95 backdrop-blur-lg rounded-xl border border-border/50 p-3 shadow-warm-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border/50">
              <Button variant="hero" className="w-full" asChild>
                <a href="/#contact">Book Now</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
