import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Users, ChefHat, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/data/mockData";

const RecipeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const module = await import(`../data/recipes/${slug}.json`);
        setRecipe(module.default);
      } catch (error) {
        console.error("Failed to load recipe:", error);
        setRecipe(null);
      }
    };

    if (slug) {
      fetchRecipe();
    }
  }, [slug]);

  if (!recipe) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Recipe Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The recipe you're looking for doesn't exist.
            </p>
            <Button variant="hero" asChild>
              <Link to="/recipes">Browse All Recipes</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Image */}
        <section className="relative h-[40vh] lg:h-[50vh]">
          <img
            src={recipe.featuredImage}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                to="/recipes"
                className="inline-flex items-center gap-2 text-card/80 hover:text-card mb-4 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Recipes
              </Link>
              <span className="block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
                {recipe.category}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-card">
                {recipe.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Recipe Content */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Time & Servings */}
              <div className="flex flex-wrap gap-6 mb-8 p-6 bg-card rounded-lg shadow-theme-sm">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Prep Time</p>
                    <p className="font-medium text-foreground">{recipe.prepTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cook Time</p>
                    <p className="font-medium text-foreground">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Time</p>
                    <p className="font-medium text-foreground">{recipe.totalTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Servings</p>
                    <p className="font-medium text-foreground">{recipe.servings}</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Ingredients */}
                <div className="lg:col-span-1">
                  <div className="bg-muted rounded-lg p-6 sticky top-24">
                    <h2 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                        1
                      </span>
                      Ingredients
                    </h2>
                    <ul className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructions */}
                <div className="lg:col-span-2">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Instructions
                  </h2>
                  <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="w-8 h-8 bg-muted text-foreground font-medium rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-foreground leading-relaxed pt-1">
                          {instruction}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {/* Notes */}
                  {recipe.notes && (
                    <div className="mt-8 p-6 bg-card rounded-lg border border-border">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                        Chef's Notes
                      </h3>
                      <p className="text-muted-foreground">{recipe.notes}</p>
                    </div>
                  )}

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Share2 size={18} />
                      Share this recipe
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <Facebook size={18} />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(recipe.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <Twitter size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
