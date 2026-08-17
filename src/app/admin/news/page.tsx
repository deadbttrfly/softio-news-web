"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

interface News {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // State untuk Modal Konfirmasi Hapus
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchNews() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/news");

      if (!response.ok) {
        throw new Error("Gagal mengambil data berita");
      }

      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logout berhasil");
    setTimeout(() => {
      window.location.href = "/admin/login";
    }, 1000);
  }

  // Buka Modal Hapus
  function openDeleteModal(item: News) {
    setSelectedNews(item);
    setDeleteModalOpen(true);
  }

  // Tutup Modal Hapus
  function closeDeleteModal() {
    if (isDeleting) return;
    setDeleteModalOpen(false);
    setSelectedNews(null);
  }

  // Proses Eksekusi Hapus via API
  async function confirmDelete() {
    if (!selectedNews) return;

    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/api/news/${selectedNews.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus berita");
      }

      toast.success("Berita berhasil dihapus");
      setNews((prev) => prev.filter((item) => item.id !== selectedNews.id));
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus berita");
    } finally {
      setIsDeleting(false);
    }
  }

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        {/* Navbar Topbar */}
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/30">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Admin Panel
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Section Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Kelola Berita
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Daftar artikel dan publikasi berita yang tersimpan di sistem.
              </p>
            </div>

            <Link
              href="/admin/news/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Berita
            </Link>
          </div>

          {/* Filter Bar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan judul, kategori, atau penulis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="hidden sm:block text-xs text-slate-400">
              Total: <span className="font-semibold text-white">{filteredNews.length}</span> Berita
            </div>
          </div>

          {/* Data Table Container */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/40 backdrop-blur-md shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/80 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="p-4">Berita</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400">
                        <div className="flex justify-center items-center gap-2">
                          <svg className="h-5 w-5 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Memuat data berita...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredNews.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400">
                        Belum ada data berita yang tersedia.
                      </td>
                    </tr>
                  ) : (
                    filteredNews.map((item) => (
                      <tr key={item.id} className="transition hover:bg-slate-800/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="h-10 w-10 rounded-lg object-cover border border-slate-700"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-xs">
                                No Img
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white line-clamp-1">{item.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{item.slug}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                            {item.category}
                          </span>
                        </td>

                        <td className="p-4 font-medium text-slate-200">
                          {item.author}
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/admin/news/edit/${item.id}`}
                              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => openDeleteModal(item)}
                              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modal Konfirmasi Hapus UI */}
        {deleteModalOpen && selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Hapus Berita</h3>
                  <p className="text-xs text-slate-400">Tindakan ini tidak dapat dibatalkan.</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-800/40 p-3">
                <p className="text-sm font-semibold text-slate-200 line-clamp-2">
                  "{selectedNews.title}"
                </p>
                <span className="mt-1 inline-block text-xs text-slate-400">
                  Kategori: {selectedNews.category || "-"}
                </span>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Apakah Anda yakin ingin menghapus artikel berita ini dari database?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={isDeleting}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700 active:scale-95 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Menghapus...
                    </>
                  ) : (
                    "Ya, Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}