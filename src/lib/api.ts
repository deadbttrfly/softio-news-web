import { NewsArticle } from "@/types/news";

const API_URL = "http://localhost:8000/api";

function mapArticle(article: any): NewsArticle {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? "",
    content: article.content
      ? article.content.split("\n")
      : [],
    category: article.category,
    author: article.author,

    publishedAt:
      article.created_at ?? new Date().toISOString(),

    imageUrl:
      article.image_url ||
      "https://picsum.photos/800/450",

    imageAlt: article.title,

    readTimeMinutes: Math.max(
      1,
      Math.ceil(
        (article.content?.length || 500) / 1000
      )
    ),

    isBreaking: article.is_breaking ?? false,
    isFeatured: article.is_featured ?? false,

    tags: [],
  };
}

export async function getAllArticles() {
  const res = await fetch(`${API_URL}/news`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data.map(mapArticle);
}

export async function getArticleBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/news/${slug}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return mapArticle(data);
}