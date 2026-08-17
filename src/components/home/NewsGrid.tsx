"use client";

import { useState } from "react";
import { NewsArticle } from "@/types/news";
import NewsCard from "@/components/news/NewsCard";

interface NewsGridProps {
  articles: NewsArticle[];
  title?: string;
  initialLimit?: number;
}

export default function NewsGrid({
  articles,
  title = "Berita Terbaru",
  initialLimit = 6,
}: NewsGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  if (!articles || articles.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="h-5 w-1.5 rounded-full bg-indigo-500" />
          <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 py-16 text-center backdrop-blur-sm">
          <p className="text-sm text-slate-400">
            Tidak ada berita yang sesuai dengan pencarian Anda.
          </p>
        </div>
      </section>
    );
  }

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-2">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
          <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {title}
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-400">
          Menampilkan {visibleArticles.length} dari {articles.length} Artikel
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <div
            key={article.slug}
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <NewsCard article={article} layout="vertical" />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800 hover:text-white active:scale-95"
          >
            <span>Tampilkan Lebih Banyak</span>
            <svg
              className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-y-0.5 group-hover:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}