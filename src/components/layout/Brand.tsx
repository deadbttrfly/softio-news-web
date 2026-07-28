import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink">
        SoftIO<span className="text-merah">.</span>NEWS
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-slate-soft">
        Kabar Hari Ini, Kapan Saja.
      </span>
    </Link>
  );
}
