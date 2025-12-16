import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock, Users, Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { recipes, categories } from "@/data/mockData";

const RecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
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
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="bg-muted/30 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Recipes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover authentic Kenyan recipes passed down through generations. 
              From hearty dinners to refreshing drinks.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipes Grid */}
        <section className="py-12 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No recipes found. Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredRecipes.map((recipe, index) => (
                  <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.slug}`}
                    className="group block animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <article className="bg-card rounded-lg overflow-hidden shadow-theme-sm hover:shadow-theme-lg transition-all duration-300">
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
                        <h2 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {recipe.title}
                        </h2>
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
                    </article>
                  </Link>
                ))}
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
