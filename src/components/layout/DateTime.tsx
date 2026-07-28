"use client";

import { useEffect, useState } from "react";

export default function DateTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return <span className="font-mono text-xs text-slate-soft">&nbsp;</span>;
  }

  const dateLabel = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const timeLabel = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return (
    <span className="font-mono text-xs text-slate-soft">
      {dateLabel} &middot; {timeLabel} WIB
    </span>
  );
}
