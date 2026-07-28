import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "merah" | "ink" | "gold" | "outline";
  size?: "sm" | "md";
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  merah: "bg-merah text-paper",
  ink: "bg-ink text-paper",
  gold: "bg-gold text-ink",
  outline: "bg-transparent text-ink border border-ink/40",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export default function Badge({
  children,
  tone = "merah",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={`inline-block font-mono font-semibold uppercase tracking-widest2 ${toneStyles[tone]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}
