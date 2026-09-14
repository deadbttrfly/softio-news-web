import {
  getAllArticles,
  getBreakingNews,
  getFeaturedNews,
} from "@/data/news";
import BreakingNews from "@/components/home/BreakingNews";
import SearchFilter from "@/components/home/SearchFilter";
import FeaturedNews from "@/components/home/FeaturedNews";
import NewsGrid from "@/components/home/NewsGrid";
import Sidebar from "@/components/home/Sidebar";

interface HomePageProps {
  searchParams: Promise<{
    kategori?: string;
    q?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // 1. Resolve searchParams (Next.js 15 Async Params)
  const resolvedSearchParams = await searchParams;

  // 2. Ambil data synchronously dari @/data/news
  const allArticles = getAllArticles();
  const breaking = getBreakingNews();
  const featured = getFeaturedNews();

  const kategori = resolvedSearchParams.kategori ?? "";
  const q = (resolvedSearchParams.q ?? "").trim().toLowerCase();
  const isFiltering = Boolean(kategori || q);

  // 3. Filter data berdasarkan pencarian dan kategori
  const filtered = allArticles.filter((article) => {
    const matchesCategory = kategori ? article.category === kategori : true;
    const matchesQuery = q
      ? article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(q)))
      : true;

    return matchesCategory && matchesQuery;
  });

  const gridArticles = isFiltering ? filtered : allArticles.slice(2);
  const gridTitle = isFiltering
    ? `Hasil untuk ${kategori || `“${resolvedSearchParams.q ?? ""}”`}`
    : "Berita Terbaru";

  return (
    <>
      <SearchFilter />
      
      <BreakingNews articles={breaking} />

      {!isFiltering && featured.length >= 3 && (
        <FeaturedNews main={featured[0]} secondary={featured.slice(1, 3)} />
      )}

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <NewsGrid articles={gridArticles} title={gridTitle} />
          <Sidebar trending={allArticles.slice(0, 5)} />
        </div>
      </div>
    </>
  );
}