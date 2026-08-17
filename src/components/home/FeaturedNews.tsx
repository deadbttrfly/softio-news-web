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
  if (!main) return null;

  // Fallback URL gambar jika properti dari API berbeda (imageUrl / image_url)
  const mainImgSrc = main.imageUrl || (main as any).image_url || "/placeholder.jpg";

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Berita Utama (Main Article) - 8 Kolom */}
        <div className="lg:col-span-8">
          <Link
            href={`/news/${main.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
              <Image
                src={mainImgSrc}
                alt={main.imageAlt || main.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Konten Teks Berita Utama */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 sm:p-8">
                <div className="flex items-center gap-2">
                  <Badge tone="merah">{main.category}</Badge>
                </div>

                <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white transition-colors duration-200 group-hover:text-indigo-200 sm:text-3xl lg:text-4xl">
                  {main.title}
                </h1>

                {main.excerpt && (
                  <p className="mt-2.5 hidden line-clamp-2 max-w-2xl font-body text-sm text-slate-300 sm:block">
                    {main.excerpt}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">{main.author || "Redaksi"}</span>
                  <span>&middot;</span>
                  <time dateTime={main.publishedAt}>
                    {formatRelativeID(main.publishedAt)}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Berita Samping (Secondary Articles) - 4 Kolom */}
        <div className="flex flex-col gap-4 lg:col-span-4 lg:border-l lg:border-slate-800/80 lg:pl-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Berita Terpopuler
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            {secondary.slice(0, 3).map((article) => {
              const secImgSrc = article.imageUrl || (article as any).image_url || "/placeholder.jpg";

              return (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group flex items-center gap-3.5 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/60 hover:shadow-lg"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800 sm:w-28">
                    <Image
                      src={secImgSrc}
                      alt={article.imageAlt || article.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div>
                      <Badge tone="outline" size="sm">
                        {article.category}
                      </Badge>
                    </div>

                    <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-slate-100 transition-colors group-hover:text-indigo-400">
                      {article.title}
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {formatRelativeID(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}