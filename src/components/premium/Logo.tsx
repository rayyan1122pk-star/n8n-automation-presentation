import React, { useId } from "react";
import { cn } from "@/lib/utils";

/** Brand mark: one trigger node branching into two actions. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("h-9 w-9", className)}>
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a5c" />
          <stop offset="0.5" stopColor="#ea4b71" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#lg-${id})`} />
      <path
        d="M20 32 C30 32 32 20 43 20 M20 32 C30 32 32 44 43 44"
        fill="none"
        stroke="#fff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="32" r="6" fill="#fff" />
      <circle cx="46" cy="20" r="5.5" fill="#fff" />
      <circle cx="46" cy="44" r="5.5" fill="#fff" />
    </svg>
  );
}
