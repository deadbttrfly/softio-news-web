import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import Badge from "@/components/ui/Badge";
import { formatRelativeID } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  layout?: "vertical" | "horizontal";
}

export default function NewsCard({ article, layout = "vertical" }: NewsCardProps) {
  if (layout === "horizontal") {
    return (
      <Link href={`/news/${article.slug}`} className="group flex gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-ink/5 sm:h-28 sm:w-40">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <Badge tone="outline" size="sm">
            {article.category}
          </Badge>
          <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink group-hover:text-merah transition-colors sm:text-lg">
            {article.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-slate-soft">
            {article.author} &middot; {formatRelativeID(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/15 shadow-lg rounded-xl">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <Badge tone="outline" size="sm">
          {article.category}
        </Badge>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-merah transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-sm text-slate-soft">
          {article.excerpt}
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-slate-soft">
          {formatRelativeID(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
