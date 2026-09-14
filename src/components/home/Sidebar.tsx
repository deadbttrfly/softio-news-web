"use client";

import { useState } from "react";
import Link from "next/link";
import { NewsArticle } from "@/types/news";
import { formatRelativeID } from "@/lib/utils";

interface SidebarProps {
  trending: NewsArticle[];
}

export default function Sidebar({ trending }: SidebarProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({});

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({});

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          success: true,
          message: "Terima kasih! Alamat surel Anda berhasil terdaftar.",
        });
        setEmail("");
      } else {
        setStatus({
          success: false,
          message: data.message || "Gagal mendaftar. Silakan coba lagi.",
        });
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Laiya ntaran bae dah, belon kita anuin Newsletternya coy",
      });
    } finally {
      setLoading(false);
    }
  };

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

        <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat surel Anda"
            disabled={loading}
            className="border border-paper/20 rounded-xl bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-merah-light disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-merah rounded-xl px-3 py-2 font-body text-sm font-semibold uppercase tracking-wide text-paper hover:bg-merah-light disabled:opacity-50 transition-colors"
          >
            {loading ? "Memproses..." : "Berlangganan"}
          </button>
        </form>

        {status.message && (
          <p
            className={`mt-3 text-xs font-semibold ${
              status.success ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </aside>
  );
}