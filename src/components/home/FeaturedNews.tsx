import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import Badge from "@/components/ui/Badge";
import { formatRelativeID } from "@/lib/utils";

interface FeaturedNewsProps {
  main: NewsArticle;
  secondary: NewsArticle[];
}

export default function FeaturedNews({ main, secondary }: FeaturedNewsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Link
          href={`/news/${main.slug}`}
          className="group relative col-span-1 block overflow-hidden lg:col-span-2"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
            <Image
              src={main.imageUrl}
              alt={main.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <Badge tone="merah">{main.category}</Badge>
              <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-paper sm:text-4xl">
                {main.title}
              </h1>
              <p className="mt-2 hidden max-w-2xl font-body text-sm text-paper/80 sm:block">
                {main.excerpt}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-paper/60">
                {main.author} &middot; {formatRelativeID(main.publishedAt)}
              </p>
            </div>
          </div>
        </Link>

        <div className="flex flex-col divide-y divide-line border-t border-line lg:border-t-0 lg:border-l lg:pl-6">
          {secondary.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group flex gap-4 py-4 first:pt-0"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-ink/5">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <Badge tone="outline" size="sm">
                  {article.category}
                </Badge>
                <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink group-hover:text-merah transition-colors">
                  {article.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-slate-soft">
                  {formatRelativeID(article.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
