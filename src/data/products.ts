export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  sizes: number[];
  colors: string[];
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviews: { user: string; rating: number; comment: string; date: string }[];
  featured?: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  productIds: string[];
  discountPrice: number;
  image: string;
}

const SHOE_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
  "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
  "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&q=80",
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
  "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
  "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80",
];

export const defaultProducts: Product[] = [
  {
    id: "1", name: "Air Royal Gold Edition", brand: "Nike", price: 899,
    category: "Sneakers", sizes: [38,39,40,41,42,43,44,45], colors: ["Black","Gold","White"],
    description: "The pinnacle of luxury streetwear. Hand-crafted with premium Italian leather and 24k gold-plated accents. Every step radiates opulence.",
    image: SHOE_IMAGES[0], images: [SHOE_IMAGES[0], SHOE_IMAGES[1], SHOE_IMAGES[2]],
    rating: 4.9, featured: true,
    reviews: [
      { user: "James K.", rating: 5, comment: "Absolutely stunning. Worth every penny.", date: "2024-03-15" },
      { user: "Sarah M.", rating: 5, comment: "The gold accents are incredible in person.", date: "2024-03-10" },
    ],
  },
  {
    id: "2", name: "Velvet Noir Runner", brand: "Gucci", price: 1250,
    category: "Running", sizes: [39,40,41,42,43,44], colors: ["Black","Burgundy"],
    description: "Where performance meets haute couture. Engineered with aerospace-grade carbon fiber sole and velvet upper.",
    image: SHOE_IMAGES[1], images: [SHOE_IMAGES[1], SHOE_IMAGES[3], SHOE_IMAGES[4]],
    rating: 4.8, featured: true,
    reviews: [
      { user: "Alex R.", rating: 5, comment: "Runs like a dream, looks like art.", date: "2024-02-20" },
    ],
  },
  {
    id: "3", name: "Obsidian High-Top", brand: "Balenciaga", price: 1450,
    category: "High-Tops", sizes: [40,41,42,43,44,45], colors: ["Black","Grey"],
    description: "Architectural mastery in footwear. Bold silhouette with premium materials and avant-garde design language.",
    image: SHOE_IMAGES[2], images: [SHOE_IMAGES[2], SHOE_IMAGES[5], SHOE_IMAGES[6]],
    rating: 4.7, featured: true,
    reviews: [
      { user: "Marcus T.", rating: 5, comment: "A statement piece.", date: "2024-01-15" },
    ],
  },
  {
    id: "4", name: "Cloud Supreme", brand: "Nike", price: 650,
    category: "Sneakers", sizes: [38,39,40,41,42,43,44], colors: ["White","Cream","Gold"],
    description: "Floating on air has never looked this refined. Ultra-lightweight construction with premium cushioning.",
    image: SHOE_IMAGES[3], images: [SHOE_IMAGES[3], SHOE_IMAGES[7]],
    rating: 4.6,
    reviews: [{ user: "Lisa P.", rating: 4, comment: "Super comfortable and stylish.", date: "2024-03-01" }],
  },
  {
    id: "5", name: "Midnight Loafer", brand: "Louis Vuitton", price: 1800,
    category: "Formal", sizes: [39,40,41,42,43,44,45], colors: ["Black","Navy"],
    description: "The epitome of formal luxury. Hand-stitched by master artisans in Milan using the finest calfskin leather.",
    image: SHOE_IMAGES[4], images: [SHOE_IMAGES[4], SHOE_IMAGES[8]],
    rating: 4.9, featured: true,
    reviews: [{ user: "David W.", rating: 5, comment: "Perfect for any black-tie event.", date: "2024-02-28" }],
  },
  {
    id: "6", name: "Street Phantom", brand: "Adidas", price: 550,
    category: "Sneakers", sizes: [38,39,40,41,42,43,44,45], colors: ["Black","Red","White"],
    description: "Urban stealth meets premium comfort. Triple-density foam sole with reflective details.",
    image: SHOE_IMAGES[5], images: [SHOE_IMAGES[5], SHOE_IMAGES[9]],
    rating: 4.5,
    reviews: [{ user: "Chris B.", rating: 4, comment: "Great everyday luxury shoe.", date: "2024-03-05" }],
  },
  {
    id: "7", name: "Monaco Slip-On", brand: "Gucci", price: 980,
    category: "Casual", sizes: [39,40,41,42,43,44], colors: ["Black","Tan","White"],
    description: "Effortless elegance for the discerning gentleman. Premium suede with signature Gucci hardware.",
    image: SHOE_IMAGES[6], images: [SHOE_IMAGES[6], SHOE_IMAGES[10]],
    rating: 4.7,
    reviews: [{ user: "Emma S.", rating: 5, comment: "Luxury made simple.", date: "2024-02-14" }],
  },
  {
    id: "8", name: "Titanium Boot", brand: "Balenciaga", price: 1650,
    category: "Boots", sizes: [40,41,42,43,44,45], colors: ["Black","Silver"],
    description: "Industrial luxury redefined. Reinforced titanium hardware with full-grain leather construction.",
    image: SHOE_IMAGES[7], images: [SHOE_IMAGES[7], SHOE_IMAGES[11]],
    rating: 4.8,
    reviews: [{ user: "Ryan G.", rating: 5, comment: "Built like a tank, looks like a million bucks.", date: "2024-01-20" }],
  },
  {
    id: "9", name: "Aura Knit Racer", brand: "Nike", price: 720,
    category: "Running", sizes: [38,39,40,41,42,43,44], colors: ["Black","Blue","Grey"],
    description: "Engineered flyknit upper with responsive ZoomX foam. Performance luxury at its finest.",
    image: SHOE_IMAGES[8], images: [SHOE_IMAGES[8], SHOE_IMAGES[0]],
    rating: 4.6,
    reviews: [{ user: "Tom H.", rating: 5, comment: "Best running shoe I've owned.", date: "2024-03-12" }],
  },
  {
    id: "10", name: "Prism Colorway", brand: "Adidas", price: 480,
    category: "Sneakers", sizes: [38,39,40,41,42,43,44,45], colors: ["Multi","Black","White"],
    description: "Bold prismatic design meets Boost technology. Stand out from every angle.",
    image: SHOE_IMAGES[9], images: [SHOE_IMAGES[9], SHOE_IMAGES[1]],
    rating: 4.4,
    reviews: [{ user: "Nina K.", rating: 4, comment: "Colors are even better in person.", date: "2024-02-25" }],
  },
  {
    id: "11", name: "Ivory Chelsea", brand: "Louis Vuitton", price: 2100,
    category: "Boots", sizes: [39,40,41,42,43,44,45], colors: ["Ivory","Black"],
    description: "The Chelsea boot reimagined for modern royalty. Handcrafted with exotic leather and silk lining.",
    image: SHOE_IMAGES[10], images: [SHOE_IMAGES[10], SHOE_IMAGES[2]],
    rating: 4.9,
    reviews: [{ user: "Victoria L.", rating: 5, comment: "Exquisite craftsmanship.", date: "2024-03-08" }],
  },
  {
    id: "12", name: "Quantum Slide", brand: "Nike", price: 390,
    category: "Casual", sizes: [38,39,40,41,42,43,44], colors: ["Black","Gold","White"],
    description: "Premium comfort slides with memory foam footbed and gold-tone hardware.",
    image: SHOE_IMAGES[11], images: [SHOE_IMAGES[11], SHOE_IMAGES[3]],
    rating: 4.3,
    reviews: [{ user: "Mike D.", rating: 4, comment: "Luxury lounging at its best.", date: "2024-03-18" }],
  },
];

export const categories = ["All", "Sneakers", "Running", "High-Tops", "Formal", "Casual", "Boots"];
export const brands = ["All", "Nike", "Gucci", "Balenciaga", "Adidas", "Louis Vuitton"];
