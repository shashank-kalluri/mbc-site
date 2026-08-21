import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export default function BadgeLink({
  children,
  className = "",
  tooltipOffsetClass = "-top-9",
}: {
  children: ReactNode;
  className?: string;
  tooltipOffsetClass?: string;
}) {
  return (
    <a
      href="https://badge.universityblockchain.org"
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group/badge inline-flex items-center ${className}`}
    >
      {children}
      <span
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${tooltipOffsetClass} flex items-center gap-1 whitespace-nowrap rounded-full bg-[#EC8644] text-white text-[11px] font-semibold px-3 py-1 opacity-0 scale-90 translate-y-1 group-hover/badge:opacity-100 group-hover/badge:scale-100 group-hover/badge:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg shadow-[#EC8644]/30`}
      >
        <Sparkles size={12} className="animate-pulse" />
        Make your own
      </span>
    </a>
  );
}
