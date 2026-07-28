import { NewsArticle } from "@/types/news";
import NewsCard from "./NewsCard";

interface RelatedNewsProps {
  articles: NewsArticle[];
}

export default function RelatedNews({ articles }: RelatedNewsProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-14 border-t border-line pt-8">
      <div className="flex items-center gap-3 border-b-2 border-ink pb-2">
        <h2 className="font-display text-xl font-bold text-ink">
          Berita Terkait
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} layout="vertical" />
        ))}
      </div>
    </section>
  );
}
