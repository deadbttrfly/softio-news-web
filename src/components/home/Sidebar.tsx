import Link from "next/link";
import { NewsArticle } from "@/types/news";
import { formatRelativeID } from "@/lib/utils";

interface SidebarProps {
  trending: NewsArticle[];
}

export default function Sidebar({ trending }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <div>
        <div className="flex items-center gap-3 border-b-2 border-ink pb-2">
          <h2 className="font-display text-lg font-bold text-ink">
            Terpopuler
          </h2>
        </div>
        <ol className="mt-4 space-y-4">
          {trending.map((article, index) => (
            <li key={article.slug}>
              <Link href={`/news/${article.slug}`} className="group flex gap-3">
                <span className="font-display text-3xl font-black leading-none text-line group-hover:text-merah transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-body text-sm font-semibold leading-snug text-ink group-hover:text-merah transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest2 text-slate-soft">
                    {formatRelativeID(article.publishedAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="border border-line bg-paper p-6 rounded-xl">
        <h2 className="font-display text-lg font-bold">Newsletter Pagi</h2>
        <p className="mt-2 font-body text-sm text-paper/70">
          Ringkasan berita paling penting, dikirim ke surel Anda setiap pukul
          06.00 WIB.
        </p>
        <form className="mt-4 flex flex-col gap-2">
          <input
            type="email"
            placeholder="Alamat surel Anda"
            className="border border-paper/20 rounded-xl bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-merah-light"
          />
          <button
            type="submit"
            className="bg-merah px-3 py-2 font-body text-sm font-semibold uppercase tracking-wide text-paper hover:bg-merah-light transition-colors"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </aside>
  );
}
