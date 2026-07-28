import { NewsArticle } from "@/types/news";
import NewsCard from "@/components/news/NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
  title?: string;
}

export default function NewsGrid({ articles, title = "Berita Terbaru" }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <section>
        <div className="flex items-center gap-3 border-b-2 border-ink pb-2">
          <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        </div>
        <p className="mt-8 font-body text-sm text-slate-soft">
          Tidak ada berita yang sesuai dengan pencarian atau filter Anda.
          Coba kata kunci lain atau pilih rubrik yang berbeda.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-3 border-b-2 border-ink pb-2">
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} layout="vertical" />
        ))}
      </div>
    </section>
  );
}
