import { NewsArticle } from "@/types/news";

const API_URL = "http://localhost:8000/api";

function mapArticle(
  article: any
): NewsArticle {
  return {
    slug: article.slug,

    title: article.title,

    excerpt:
      article.excerpt ?? "",

    content:
      typeof article.content === "string"
        ? article.content.split("\n")
        : [],

    category:
      article.category ?? "",

    author:
      article.author ?? "",

    publishedAt:
      article.created_at ??
      new Date().toISOString(),

    imageUrl:
      article.image_url ||
      "https://picsum.photos/800/450",

    imageAlt:
      article.title,

    readTimeMinutes:
      Math.max(
        1,
        Math.ceil(
          (article.content?.length ||
            500) / 1000
        )
      ),

    isBreaking:
      article.is_breaking ??
      false,

    isFeatured:
      article.is_featured ??
      false,

    tags: [],
  };
}

export async function getAllArticles(): Promise<
  NewsArticle[]
> {
  const res = await fetch(
    `${API_URL}/news`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Gagal mengambil semua berita"
    );
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapArticle);
}

export async function getArticleBySlug(
  slug: string
): Promise<NewsArticle> {
  const res = await fetch(
    `${API_URL}/news/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Artikel tidak ditemukan"
    );
  }

  const data = await res.json();

  return mapArticle(data);
}

export async function getRelatedArticles(
  category: string,
  currentSlug: string
): Promise<NewsArticle[]> {
  const res = await fetch(
    `${API_URL}/news?category=${encodeURIComponent(
      category
    )}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Gagal mengambil berita terkait"
    );
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .filter(
      (item: any) =>
        item.slug !== currentSlug
    )

    .slice(0, 3)

    .map(mapArticle);
}