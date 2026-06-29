import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock, Users, Search, ChefHat, UtensilsCrossed, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Recipe } from "@/data/mockData";

const RecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeModules = import.meta.glob('@/data/recipes/*.json');
      const recipesData = await Promise.all(
        Object.entries(recipeModules).map(async ([path, loader]) => {
          const module = await loader();
          return { id: path, ...(module as any) };
        })
      );
      setRecipes(recipesData);
    };

    const fetchCategories = async () => {
      const categoriesModule = await import('@/data/categories.json');
      setCategories(categoriesModule.default);
    };

    fetchRecipes();
    fetchCategories();
  }, []);

  const activeCategory = searchParams.get("category") || "All";

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === "All" || recipe.category === activeCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Page Header */}
        <section className="relative bg-gradient-to-b from-primary/[0.04] to-background py-16 lg:py-24 overflow-hidden">
          <div className="organic-blob -top-20 -right-20 w-72 h-72 bg-secondary/10" />
          <div className="organic-blob -bottom-20 -left-20 w-56 h-56 bg-primary/10" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <UtensilsCrossed className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs uppercase tracking-[0.15em]">Recipe Collection</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Our Recipes
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-5" />
              <p className="text-muted-foreground text-lg leading-relaxed">
                Explore our collection of authentic Kenyan dishes, from traditional favorites to modern twists.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-warm-sm">
          <div className="container mx-auto px-4 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground/60
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                    transition-all duration-200 hover:border-primary/40"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-warm-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-transparent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredRecipes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map((recipe, index) => (
                  <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.slug}`}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <article className="relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-warm-sm hover:shadow-warm-xl transition-all duration-500 hover:-translate-y-1.5">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={recipe.featuredImage}
                          alt={recipe.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                          {recipe.category}
                        </span>

                        {/* View Recipe - appears on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-primary font-medium text-sm rounded-full shadow-lg hover:bg-white transition-colors">
                            View Recipe
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-secondary" />
                            {recipe.totalTime}
                          </span>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="w-3.5 h-3.5 text-secondary" />
                            {recipe.servings} servings
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 animate-fade-in">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-6 border border-primary/10">
                  <ChefHat className="w-11 h-11 text-primary/60" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  No Recipes Found
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  We couldn't find any recipes matching your search. Try adjusting your filters or explore a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams(new URLSearchParams());
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-warm-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
