import Link from "next/link";
import Brand from "./Brand";
import DateTime from "./DateTime";
import { NEWS_CATEGORIES } from "@/types/news";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between border-b border-line py-2">
          <DateTime />
          <nav className="hidden sm:flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest2 text-slate-soft">
            <Link href="#" className="hover:text-merah transition-colors">
              Indeks
            </Link>
            <Link href="#" className="hover:text-merah transition-colors">
              Redaksi
            </Link>
            <Link href="#" className="hover:text-merah transition-colors">
              Berlangganan
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-between py-4">
          <Brand />
        </div>
      </div>
    </header>
  );
}
