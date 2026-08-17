"use client";

import Link from "next/link";
import { NewsArticle } from "@/types/news";

interface BreakingNewsProps {
  articles: NewsArticle[];
}

export default function BreakingNews({ articles }: BreakingNewsProps) {
  if (articles.length === 0) return null;

  return (
    <div className="flex items-stretch text-paper overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl items-stretch">
        <div className="bg-red-600 text-white px-4 flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md z-10 shrink-0">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">
            Terkini
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex items-center gap-8 text-sm py-2.5 w-max animate-ticker"
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {[...articles, ...articles].map((article, index) => (
              <Link
                key={`${article.slug}-${index}`}
                href={`/news/${article.slug}`}
                className="whitespace-nowrap text-paper/85 hover:text-merah-light transition-colors"
              >
                <span>● {article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}