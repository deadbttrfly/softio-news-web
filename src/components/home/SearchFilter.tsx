"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { NEWS_CATEGORIES } from "@/types/news";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("kategori") ?? "";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function updateParams(next: { kategori?: string; q?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const kategori = next.kategori !== undefined ? next.kategori : activeCategory;
    const q = next.q !== undefined ? next.q : query;

    if (kategori) params.set("kategori", kategori);
    else params.delete("kategori");

    if (q) params.set("q", q);
    else params.delete("q");

    router.push(`/?${params.toString()}`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateParams({ q: query });
  }

  return (
    <div className="border-y border-line bg-paper py-5">
      <div className="mx-auto max-w-6xl px-4">
        <form onSubmit={handleSubmit} className="flex gap-2 sm:max-w-md">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, topik, atau tokoh..."
            aria-label="Cari berita"
          />
          <Button type="submit" size="md">
            Cari
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => updateParams({ kategori: "" })}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest2 border transition-colors ${
              activeCategory === ""
                ? "bg-ink text-paper border-ink"
                : "border-line text-slate-soft hover:border-ink"
            }`}
          >
            Semua
          </button>
          {NEWS_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => updateParams({ kategori: category })}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest2 border transition-colors ${
                activeCategory === category
                  ? "bg-merah text-paper border-merah"
                  : "border-line text-slate-soft hover:border-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
