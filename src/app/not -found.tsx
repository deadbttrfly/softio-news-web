import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="font-display text-7xl font-black text-merah">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Berita Tidak Ditemukan
      </h1>
      <p className="mt-3 font-body text-sm text-slate-soft">
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-6 bg-merah px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-paper hover:bg-merah-dark transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
