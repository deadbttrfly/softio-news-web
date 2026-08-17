"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Login gagal, silakan periksa akun Anda.";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      // Simpan token & tampilkan toast sukses
      localStorage.setItem("token", data.token);
      toast.success("Login berhasil! Mengalihkan...");

      // Beri sedikit delay agar pengguna sempat melihat pemberitahuan toast
      setTimeout(() => {
        router.push("/admin/news");
      }, 800);
    } catch (err) {
      const connectionError = "Terjadi kesalahan koneksi ke server.";
      setError(connectionError);
      toast.error(connectionError);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-12 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Selamat Datang
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Masukkan akun admin Anda untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-300 backdrop-blur-sm">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}