import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Users, ChefHat, Share2, Facebook, Twitter, Check, Printer } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/data/mockData";

const RecipeDetailPage = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const recipeModules = import.meta.glob('@/data/recipes/*.json');
        let found = false;
        for (const [path, loader] of Object.entries(recipeModules)) {
          const module = await loader();
          const data = { id: path, ...(module as any) } as Recipe;
          if (data.slug === slug) {
            setRecipe(data);
            found = true;
            break;
          }
        }
        if (!found) {
          setRecipe(null);
        }
      } catch (error) {
        console.error("Error loading recipe:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [slug]);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const shareUrl = window.location.href;
  const shareText = recipe ? `Check out this recipe: ${recipe.title}` : "";

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 lg:pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-8 animate-pulse">
            <div className="h-[450px] bg-muted/60 rounded-2xl mb-10" />
            <div className="max-w-4xl mx-auto">
              <div className="h-10 bg-muted/60 rounded w-1/2 mb-4" />
              <div className="h-5 bg-muted/60 rounded w-2/3 mb-10" />
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-5">
                  <div className="h-64 bg-muted/60 rounded-xl" />
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <div className="h-40 bg-muted/60 rounded-xl" />
                  <div className="h-40 bg-muted/60 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not Found State
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 lg:pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-20">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6 border border-primary/10">
                <ChefHat className="w-12 h-12 text-primary/60" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
                Recipe Not Found
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Sorry, we couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect.
              </p>
              <Button variant="hero" asChild>
                <Link to="/recipes">
                  <ArrowLeft className="w-4 h-4" />
                  Browse All Recipes
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[55vh] min-h-[400px] lg:min-h-[500px]">
            <img
              src={recipe.featuredImage}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary/60" />

            {/* Back Button */}
            <div className="absolute top-6 left-4 lg:left-10 z-10">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-foreground shadow-sm rounded-xl border border-white/20"
                asChild
              >
                <Link to="/recipes">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Recipes
                </Link>
              </Button>
            </div>
          </div>

          {/* Title Overlay - clean below the image */}
          <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-warm-xl border border-border/50">
                <span className="inline-flex items-center bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg mb-4">
                  {recipe.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {recipe.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-warm-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Prep</p>
                    <p className="font-serif text-sm font-semibold text-foreground">{recipe.prepTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-warm-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Cook</p>
                    <p className="font-serif text-sm font-semibold text-foreground">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-warm-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Total</p>
                    <p className="font-serif text-sm font-semibold text-foreground">{recipe.totalTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-warm-sm">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Serves</p>
                    <p className="font-serif text-sm font-semibold text-foreground">{recipe.servings}</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
                {/* Left Column - Ingredients */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24 lg:top-28 space-y-6">
                    {/* Ingredients */}
                    <div className="rounded-xl bg-gradient-to-b from-card to-card/80 border border-border/50 p-6 lg:p-7 shadow-warm-md">
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-5 rounded-full bg-secondary" />
                          Ingredients
                        </h2>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          {recipe.ingredients.length} items
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {recipe.ingredients.map((ingredient, index) => {
                          const checked = checkedIngredients.includes(index);
                          return (
                            <li key={index}>
                              <button
                                onClick={() => toggleIngredient(index)}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-left transition-all duration-200 ${
                                  checked
                                    ? "bg-primary/5 text-muted-foreground line-through"
                                    : "text-foreground/80 hover:bg-muted/50"
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                                    checked
                                      ? "bg-secondary border-secondary"
                                      : "border-muted-foreground/30 group-hover:border-secondary/50"
                                  }`}
                                >
                                  {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                </span>
                                {ingredient}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Share */}
                    <div className="rounded-xl bg-card border border-border/50 p-6 shadow-warm-sm">
                      <h3 className="font-serif text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-secondary" />
                        Share This Recipe
                      </h3>
                      <div className="flex gap-2">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs font-medium"
                        >
                          <Facebook className="w-3.5 h-3.5" />
                          Facebook
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all duration-200 text-xs font-medium"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                          Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Instructions */}
                <div className="lg:col-span-3 space-y-8">
                  {/* Instructions */}
                  <div>
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-5 rounded-full bg-primary" />
                      Instructions
                    </h2>
                    <ol className="space-y-6">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="relative flex gap-5">
                          {/* Step Number with connecting line */}
                          <div className="flex flex-col items-center">
                            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold shadow-warm-sm shrink-0">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {index < recipe.instructions.length - 1 && (
                              <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pt-1.5 pb-2">
                            <p className="text-foreground/85 leading-relaxed">{step}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Chef's Notes */}
                  {recipe.notes && (
                    <div className="relative rounded-xl p-6 lg:p-7 bg-gradient-to-br from-secondary/[0.07] to-primary/[0.04] border border-secondary/20 shadow-warm-sm overflow-hidden">
                      <div className="organic-blob -top-10 -right-10 w-32 h-32 bg-secondary/10" />
                      <div className="relative z-10">
                        <h2 className="font-serif text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center">
                            <ChefHat className="w-4 h-4 text-secondary" />
                          </div>
                          Chef's Notes
                        </h2>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-secondary to-secondary/40 rounded-full mb-4" />
                        <p className="text-foreground/80 leading-relaxed text-sm">
                          {recipe.notes}
                        </p>
                      </div>
                    </div>
                  )}
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
