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
  id:string;
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

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Kenyan Beef Pilau",
    slug: "kenyan-beef-pilau",
    featuredImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Main Course",
    ingredients: ["2 cups basmati rice", "500g beef cubes", "2 tbsp pilau masala", "1 cinnamon stick", "4 cardamom pods", "2 cloves garlic, minced", "1 onion, sliced", "3 cups beef broth", "Salt to taste", "2 tbsp cooking oil"],
    instructions: ["Heat oil in a large pot and fry onions until golden brown.", "Add garlic, cinnamon stick, cardamom pods, and pilau masala. Stir for 1 minute.", "Add beef cubes and brown on all sides.", "Pour in beef broth and bring to a boil. Reduce heat and simmer until beef is tender.", "Add rice, stir gently, cover and cook on low heat until rice is fully cooked and liquid is absorbed.", "Fluff with a fork and serve hot with kachumbari (fresh tomato and onion salad)."],
    prepTime: "20 mins",
    cookTime: "45 mins",
    totalTime: "1 hr 5 mins",
    servings: 4,
    notes: "For best results, use high-quality pilau masala. You can also add potatoes for a heartier meal.",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Mango Passion Smoothie",
    slug: "mango-passion-smoothie",
    featuredImage: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beverages",
    ingredients: ["2 ripe mangoes, peeled and cubed", "1 passion fruit, pulp scooped out", "1 cup plain yogurt", "1/2 cup milk", "2 tbsp honey", "Ice cubes", "Fresh mint for garnish"],
    instructions: ["Add mango cubes, passion fruit pulp, yogurt, milk, and honey to a blender.", "Add a handful of ice cubes.", "Blend until smooth and creamy.", "Taste and adjust sweetness with more honey if needed.", "Pour into glasses and garnish with fresh mint."],
    prepTime: "10 mins",
    cookTime: "0 mins",
    totalTime: "10 mins",
    servings: 2,
    notes: "Use chilled mangoes for a colder smoothie without diluting it with too much ice.",
    publishedAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Nyama Choma with Ugali",
    slug: "nyama-choma-ugali",
    featuredImage: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Main Course",
    ingredients: ["1kg beef ribs or goat meat", "3 tbsp vegetable oil", "Juice of 2 lemons", "4 cloves garlic, minced", "1 tbsp ginger, grated", "Salt and pepper to taste", "2 cups maize flour", "4 cups water", "Kachumbari (tomato, onion, cilantro salad)"],
    instructions: ["Marinate meat with lemon juice, garlic, ginger, salt, and pepper for at least 2 hours.", "Grill over medium-hot charcoal, turning occasionally, until cooked through and slightly charred.", "For ugali: Bring water to a boil in a heavy-bottomed pot.", "Gradually add maize flour while stirring continuously with a wooden spoon.", "Cook until thick and smooth, about 5-7 minutes. Mold into a dome shape.", "Serve nyama choma hot with ugali and kachumbari."],
    prepTime: "2 hrs 30 mins",
    cookTime: "45 mins",
    totalTime: "3 hrs 15 mins",
    servings: 6,
    notes: "Traditional Kenyan nyama choma is best enjoyed outdoors with friends and family. Serve with extra chili sauce on the side.",
    publishedAt: "2024-03-10",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Jane Doe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    reviewText: "Sabra's Kitchen Delights catered our wedding and the food was absolutely incredible! Our guests are still talking about the Kenyan Pilau.",
    eventType: "Wedding Catering",
  },
  {
    id: "2",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
    reviewText: "We hired them for a corporate event. The variety of dishes was great and everything was fresh and delicious. Highly recommend!",
    eventType: "Corporate Event",
  },
  {
    id: "3",
    name: "Emily White",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    reviewText: "Their mango passion smoothie is to die for! Sabra's never disappoints with their authentic flavors and friendly service.",
    eventType: "Cafe Visit",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Wedding Catering",
    description: "Exquisite culinary experiences for your special day. From intimate ceremonies to grand receptions, we craft menus that delight.",
    image: "https://images.unsplash.com/photo-1600299868779-7f938d227c49?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceRange: "Starting from $50/person",
  },
  {
    id: "2",
    title: "Corporate Events",
    description: "Professional catering services for business meetings, conferences, and corporate parties. Impress your clients and colleagues.",
    image: "https://images.unsplash.com/photo-1546419794-6b22c7f466b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceRange: "Starting from $35/person",
  },
  {
    id: "3",
    title: "Private Parties",
    description: "Celebrate life's moments with custom menus for birthdays, anniversaries, and family gatherings. Let us handle the cooking!",
    image: "https://images.unsplash.com/photo-1555939226-d249219e48b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceRange: "Starting from $40/person",
  },
  {
    id: "4",
    title: "Cooking Classes",
    description: "Learn to cook authentic Kenyan dishes with our experienced chefs. Fun and interactive classes for all skill levels.",
    image: "https://images.unsplash.com/photo-1587840177894-318e474efdb7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    priceRange: "Starting from $75/person",
  },
];