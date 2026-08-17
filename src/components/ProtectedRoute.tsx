"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isChecking, setIsChecking] =
    useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}