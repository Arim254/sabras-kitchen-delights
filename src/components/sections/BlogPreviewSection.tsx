import { useState, useEffect } from "react";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/data/mockData";

export function BlogPreviewSection() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeModules = import.meta.glob('@/data/recipes/*.json');
      const recipesData = await Promise.all(
        Object.entries(recipeModules).map(async ([path, loader]) => {
          const module = await loader();
          return { id: path, ...(module as any) };
        })
      );
      setFeaturedRecipes(recipesData.slice(0, 3));
    };
    fetchRecipes();
  }, []);

  return (
    <section id="recipes" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="organic-blob top-0 right-0 w-72 h-72 bg-secondary/5" />
      <div className="organic-blob bottom-0 left-0 w-64 h-64 bg-primary/5" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 animate-fade-in">
          <span className="section-subtitle">From Our Kitchen</span>
          <h2 className="section-title mt-2 mb-4">
            Featured Recipes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4" />
          <p className="section-description mx-auto">
            Discover the authentic flavors of Kenya with our collection of traditional recipes
            passed down through generations.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRecipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.slug}`}
              className="group block animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="glass-card rounded-xl overflow-hidden hover-lift">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={recipe.featuredImage}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-warm-sm">
                    {recipe.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-secondary" />
                      {recipe.totalTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-secondary" />
                      {recipe.servings} servings
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10 lg:mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            Craving more? Explore our complete collection of authentic Kenyan recipes.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
