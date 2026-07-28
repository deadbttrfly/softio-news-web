import Link from "next/link";
import { NEWS_CATEGORIES } from "@/types/news";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line text-paper">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-black tracking-tight">
              SoftIO<span className="text-merah-light">.</span>NEWS
            </span>
            <p className="mt-3 max-w-xs font-body text-sm text-paper/60">
              Menyajikan berita nasional dan internasional secara akurat,
              berimbang, dan tepercaya sejak edisi pertama diterbitkan.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-paper/50">
              Rubrik
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NEWS_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/?kategori=${encodeURIComponent(category)}`}
                    className="text-paper/80 hover:text-merah-light transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest2 text-paper/50">
              Redaksi
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-paper/80">
              <li>Tentang Kami</li>
              <li>Pedoman Media Siber</li>
              <li>Kontak Redaksi</li>
              <li>Kebijakan Privasi</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-paper/40">
          &copy; {new Date().getFullYear()} SoftIO<span className="text-merah-light">.</span>NEWS. Seluruh hak
          cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
