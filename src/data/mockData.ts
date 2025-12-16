// Mock data for CMS content - will be replaced with actual CMS integration

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  notes: string;
  publishedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  priceRange?: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewText: string;
  eventType: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  title: string;
  altText: string;
}

export const categories = [
  "All",
  "Family-friendly",
  "Dinner",
  "Desserts",
  "Breakfast",
  "Drinks",
  "Salads",
  "Soups",
] as const;

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Traditional Kenyan Pilau",
    slug: "kenyan-pilau",
    featuredImage: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600",
    category: "Dinner",
    ingredients: [
      "2 cups basmati rice",
      "500g beef, cubed",
      "2 large onions, sliced",
      "4 cloves garlic, minced",
      "1 inch ginger, grated",
      "2 tbsp pilau masala",
      "1 cinnamon stick",
      "4 cardamom pods",
      "Salt to taste",
      "3 cups beef stock",
    ],
    instructions: [
      "Wash and soak rice for 30 minutes, then drain",
      "In a heavy pot, fry onions until deep brown and caramelized",
      "Add meat and brown on all sides",
      "Add garlic, ginger, and all spices. Cook for 2 minutes",
      "Pour in beef stock and bring to a boil",
      "Add rice, reduce heat, cover and cook for 20 minutes",
      "Let rest for 5 minutes before serving",
    ],
    prepTime: "20 mins",
    cookTime: "45 mins",
    totalTime: "1 hr 5 mins",
    servings: 6,
    notes: "For extra flavor, fry the whole spices in ghee before adding other ingredients.",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Kenyan Chapati",
    slug: "kenyan-chapati",
    featuredImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600",
    category: "Family-friendly",
    ingredients: [
      "3 cups all-purpose flour",
      "1 tsp salt",
      "1 cup warm water",
      "3 tbsp vegetable oil",
      "Oil for frying",
    ],
    instructions: [
      "Mix flour and salt in a large bowl",
      "Add water gradually, kneading to form a soft dough",
      "Add oil and knead for 10 minutes until smooth",
      "Cover and rest for 30 minutes",
      "Divide into balls, roll thin, brush with oil, fold and roll again",
      "Cook on hot pan, brushing with oil until golden on both sides",
    ],
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTime: "45 mins",
    servings: 8,
    notes: "The key to soft chapatis is well-kneaded dough and not overworking when rolling.",
    publishedAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Mango Passion Smoothie",
    slug: "mango-passion-smoothie",
    featuredImage: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600",
    category: "Drinks",
    ingredients: [
      "2 ripe mangoes, cubed",
      "4 passion fruits, pulp extracted",
      "1 cup yogurt",
      "1/2 cup milk",
      "2 tbsp honey",
      "Ice cubes",
    ],
    instructions: [
      "Blend mango cubes until smooth",
      "Add passion fruit pulp, yogurt, and milk",
      "Add honey and ice cubes",
      "Blend until creamy and smooth",
      "Serve immediately in chilled glasses",
    ],
    prepTime: "10 mins",
    cookTime: "0 mins",
    totalTime: "10 mins",
    servings: 4,
    notes: "Best served immediately. Add more honey if you prefer a sweeter taste.",
    publishedAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Sukuma Wiki with Ugali",
    slug: "sukuma-wiki-ugali",
    featuredImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    category: "Family-friendly",
    ingredients: [
      "1 large bunch sukuma wiki (collard greens)",
      "2 tomatoes, diced",
      "1 onion, sliced",
      "2 cloves garlic",
      "Salt and pepper to taste",
      "2 cups maize flour for ugali",
      "4 cups water",
    ],
    instructions: [
      "Wash and chop sukuma wiki finely",
      "Sauté onions until translucent, add tomatoes and garlic",
      "Add sukuma wiki, season and cook until tender",
      "For ugali: Boil water, gradually add maize flour while stirring",
      "Stir continuously until thick and pulls away from pot",
      "Serve sukuma wiki alongside ugali",
    ],
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: 4,
    notes: "A staple Kenyan meal - nutritious and affordable.",
    publishedAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Kenyan Mandazi",
    slug: "kenyan-mandazi",
    featuredImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    category: "Breakfast",
    ingredients: [
      "3 cups flour",
      "1/2 cup sugar",
      "1 tsp cardamom powder",
      "1/2 cup coconut milk",
      "1 egg",
      "1 tsp instant yeast",
      "Oil for deep frying",
    ],
    instructions: [
      "Mix flour, sugar, cardamom, and yeast",
      "Add coconut milk and egg, mix to form dough",
      "Knead until smooth, cover and let rise for 1 hour",
      "Roll out dough and cut into triangles",
      "Deep fry until golden brown on both sides",
      "Drain on paper towels and serve warm",
    ],
    prepTime: "20 mins",
    cookTime: "20 mins",
    totalTime: "1 hr 40 mins",
    servings: 12,
    notes: "Perfect with chai tea for breakfast or as a snack.",
    publishedAt: "2024-02-15",
  },
  {
    id: "6",
    title: "African Fruit Salad",
    slug: "african-fruit-salad",
    featuredImage: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600",
    category: "Salads",
    ingredients: [
      "2 mangoes, cubed",
      "1 papaya, cubed",
      "2 bananas, sliced",
      "1 cup pineapple chunks",
      "Seeds of 2 passion fruits",
      "Juice of 2 oranges",
      "2 tbsp honey",
      "Fresh mint for garnish",
    ],
    instructions: [
      "Prepare all fruits and place in a large bowl",
      "Mix orange juice with honey",
      "Pour dressing over fruits and toss gently",
      "Add passion fruit seeds on top",
      "Garnish with fresh mint",
      "Chill before serving",
    ],
    prepTime: "15 mins",
    cookTime: "0 mins",
    totalTime: "15 mins",
    servings: 6,
    notes: "Use seasonal tropical fruits for best flavor.",
    publishedAt: "2024-02-20",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Wedding Catering",
    description: "Make your special day unforgettable with our exquisite wedding menu featuring traditional and modern Kenyan cuisine.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600",
    priceRange: "From KES 50,000",
  },
  {
    id: "2",
    title: "Corporate Events",
    description: "Professional catering for business meetings, conferences, and corporate celebrations with elegant presentation.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    priceRange: "From KES 25,000",
  },
  {
    id: "3",
    title: "Private Parties",
    description: "From birthday celebrations to anniversaries, we bring the party to life with delicious food and impeccable service.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
    priceRange: "From KES 15,000",
  },
  {
    id: "4",
    title: "Traditional Ceremonies",
    description: "Honor your heritage with authentic Kenyan dishes perfect for dowry ceremonies, naming ceremonies, and more.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    priceRange: "Custom Quote",
  },
  {
    id: "5",
    title: "Meal Prep Services",
    description: "Weekly meal preparation delivered to your doorstep - healthy, delicious, and tailored to your preferences.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600",
    priceRange: "From KES 5,000/week",
  },
  {
    id: "6",
    title: "Cooking Classes",
    description: "Learn the secrets of Kenyan cuisine with our hands-on cooking classes. Perfect for groups and team building.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    priceRange: "From KES 3,000/person",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    reviewText: "Sabras Kitchen catered our wedding and exceeded all expectations! The pilau was authentic, the service was professional, and our guests couldn't stop complimenting the food.",
    eventType: "Wedding",
  },
  {
    id: "2",
    name: "James Ochieng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    reviewText: "We've used Sabras Kitchen for multiple corporate events. Their consistency and attention to detail is remarkable. Highly recommend for any business function.",
    eventType: "Corporate Event",
  },
  {
    id: "3",
    name: "Grace Muthoni",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    reviewText: "The meal prep service has been a game-changer for our busy family. Fresh, delicious Kenyan meals delivered every week. The kids love the chapatis!",
    eventType: "Meal Prep",
  },
  {
    id: "4",
    name: "Peter Kamau",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    rating: 5,
    reviewText: "Our traditional ceremony was made even more special with Sabras Kitchen. They understood the cultural significance and delivered an authentic feast.",
    eventType: "Traditional Ceremony",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
    title: "Grilled Nyama Choma",
    altText: "Beautifully grilled Kenyan nyama choma with garnishes",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    title: "Fresh Salad Bowl",
    altText: "Colorful fresh salad with African vegetables",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    title: "Wedding Buffet Setup",
    altText: "Elegant wedding buffet arrangement",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    title: "Traditional Dishes",
    altText: "Traditional Kenyan dishes beautifully plated",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    title: "Corporate Event Setup",
    altText: "Professional corporate catering setup",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    title: "Grilled Specialties",
    altText: "Assorted grilled meats and vegetables",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600",
    title: "Fresh Ingredients",
    altText: "Fresh cooking ingredients and spices",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600",
    title: "Dessert Selection",
    altText: "Beautiful dessert selection",
  },
];
