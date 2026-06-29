import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChefHat, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="organic-blob -top-40 -right-40 w-[500px] h-[500px] bg-primary/5" />
      <div className="organic-blob -bottom-40 -left-40 w-[400px] h-[400px] bg-secondary/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-lg mx-auto">
          {/* Large 404 */}
          <div className="mb-6">
            <span className="font-serif text-[120px] md:text-[180px] font-bold leading-none bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-10 h-10 text-muted-foreground" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            It seems this dish isn't on our menu. The page you're looking for doesn't exist or has been moved.
          </p>

          <Button variant="gold" size="lg" asChild className="shadow-warm-md">
            <Link to="/">
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
