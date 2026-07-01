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