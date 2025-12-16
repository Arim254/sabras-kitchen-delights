import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { recipes } from "@/data/mockData";

export function BlogPreviewSection() {
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <section id="recipes" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            From Our Kitchen
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Featured Recipes
          </h2>
          <p className="text-muted-foreground">
            Discover the authentic flavors of Kenya with our collection of traditional recipes.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRecipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.slug}`}
              className="group block animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-theme-sm hover:shadow-theme-lg transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={recipe.featuredImage}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {recipe.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {recipe.totalTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {recipe.servings} servings
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
