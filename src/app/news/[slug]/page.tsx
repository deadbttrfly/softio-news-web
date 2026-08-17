import { getArticleBySlug, getRelatedArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
    notFound();
  }

  let relatedArticles = [];
  try {
    relatedArticles = await getRelatedArticles(article.category, slug);
  } catch (error) {
    console.error("Gagal mengambil berita terkait:", error);
    relatedArticles = [];
  }

  const mainImage = article.imageUrl || "/placeholder.jpg";

  const paragraphs = Array.isArray(article.content)
    ? article.content
    : typeof article.content === "string"
    ? article.content.split("\n\n")
    : [];

  return (
    <div className="min-h-screen text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <article className="lg:col-span-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 rounded-md border border-indigo-500/20 mb-3">
              {article.category}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            {article.author && (
              <p className="text-xs sm:text-sm text-slate-400 mt-3">
                Oleh{" "}
                <span className="text-slate-200 font-medium">
                  {article.author}
                </span>
              </p>
            )}

            {article.excerpt && (
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            <div className="relative w-full h-[260px] sm:h-[400px] mt-6 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
              <Image
                src={mainImage}
                alt={article.imageAlt || article.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>

            <hr className="my-8 border-slate-800" />

            <div className="space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>Belum ada isi artikel.</p>
              )}
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-md">
              <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Berita Terkait
              </h2>

              <div className="space-y-4">
                {relatedArticles.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    Belum ada berita terkait.
                  </p>
                ) : (
                  relatedArticles.map((item) => {
                    const itemImage = item.imageUrl || "/placeholder.jpg";

                    return (
                      <Link
                        key={item.slug}
                        href={`/news/${item.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-800">
                          <Image
                            src={itemImage}
                            alt={item.imageAlt || item.title}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 line-clamp-3 leading-snug mt-1 transition">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-16 pt-10 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Berita Lainnya
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.length === 0 ? (
              <p className="text-xs text-slate-400 col-span-full">
                Tidak ada berita terkait lainnya.
              </p>
            ) : (
              relatedArticles.map((item) => {
                const itemImage = item.imageUrl || "/placeholder.jpg";

                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden hover:border-slate-700 transition duration-300 flex flex-col"
                  >
                    <div className="relative h-44 w-full bg-slate-800">
                      <Image
                        src={itemImage}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 line-clamp-2 mt-1 transition">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}