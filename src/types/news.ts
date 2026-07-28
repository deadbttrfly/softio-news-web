export type NewsCategory =
  | "Nasional"
  | "Politik"
  | "Ekonomi"
  | "Olahraga"
  | "Teknologi"
  | "Hiburan"
  | "Internasional"
  | "Kesehatan";

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: NewsCategory;
  author: string;
  publishedAt: string; // ISO 8601
  imageUrl: string;
  imageAlt: string;
  readTimeMinutes: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  "Nasional",
  "Politik",
  "Ekonomi",
  "Olahraga",
  "Teknologi",
  "Hiburan",
  "Internasional",
  "Kesehatan",
];
