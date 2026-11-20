"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight, restrained futuristic technological decorative accents.
 * Designed for white-dominant, purple-accented layouts with zero text interference.
 */

export function FloatingGlassOrb({
  size = 56,
  className,
  delay = "0s",
  darkMode = false,
}: {
  size?: number;
  className?: string;
  delay?: string;
  darkMode?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none rounded-full tech-float",
        className
      )}
      style={{
        width: size,
        height: size,
        animationDelay: delay,
        background: darkMode
          ? "radial-gradient(circle at 30% 28%, rgba(233, 213, 255, 0.85) 0%, rgba(168, 85, 247, 0.45) 36%, rgba(109, 40, 217, 0.16) 72%, rgba(20, 12, 42, 0.08) 100%)"
          : "radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.96) 0%, rgba(233, 213, 255, 0.72) 38%, rgba(139, 92, 246, 0.28) 74%, rgba(124, 58, 237, 0.08) 100%)",
        boxShadow: darkMode
          ? "inset -6px -8px 16px rgba(109, 40, 217, 0.35), 0 12px 32px rgba(139, 92, 246, 0.25)"
          : "inset -6px -8px 14px rgba(124, 58, 237, 0.16), 0 14px 30px -10px rgba(109, 40, 217, 0.22)",
        border: darkMode
          ? "1px solid rgba(216, 180, 254, 0.28)"
          : "1px solid rgba(196, 181, 253, 0.55)",
      }}
    />
  );
}

export function WireframeCube({
  size = 64,
  className,
  delay = "0s",
}: {
  size?: number;
  className?: string;
  delay?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={cn("pointer-events-none select-none tech-float-slow", className)}
      style={{ animationDelay: delay }}
    >
      {/* Subtle translucent faces */}
      <polygon
        points="40,10 68,25 40,40 12,25"
        fill="rgba(124, 58, 237, 0.05)"
      />
      <polygon
        points="12,25 40,40 40,70 12,55"
        fill="rgba(124, 58, 237, 0.03)"
      />
      {/* Crisp isometric edges */}
      <path
        d="M40 10L68 25V55L40 70L12 55V25L40 10Z"
        stroke="rgba(124, 58, 237, 0.34)"
        strokeWidth="1.2"
      />
      <path
        d="M12 25L40 40L68 25M40 40V70"
        stroke="rgba(124, 58, 237, 0.28)"
        strokeWidth="1.1"
      />
      {/* Back dashed wireframe depth */}
      <path
        d="M40 10V40M12 55L40 40L68 55"
        stroke="rgba(124, 58, 237, 0.14)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {/* Tiny corner node highlights */}
      <circle cx="40" cy="10" r="2" fill="#7C3AED" opacity="0.65" />
      <circle cx="40" cy="40" r="2" fill="#A855F7" opacity="0.55" />
    </svg>
  );
}

export function OrbitalRingAccent({
  size = 180,
  className,
  darkMode = false,
}: {
  size?: number;
  className?: string;
  darkMode?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className={cn("pointer-events-none select-none tech-orbit-slow", className)}
    >
      <circle
        cx="100"
        cy="100"
        r="86"
        stroke={darkMode ? "rgba(192, 132, 252, 0.2)" : "rgba(124, 58, 237, 0.16)"}
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="92"
        ry="34"
        transform="rotate(-24 100 100)"
        stroke={darkMode ? "rgba(192, 132, 252, 0.28)" : "rgba(124, 58, 237, 0.2)"}
        strokeWidth="1"
      />
      <circle
        cx="186"
        cy="100"
        r="3.2"
        fill={darkMode ? "#C084FC" : "#7C3AED"}
        opacity="0.7"
      />
    </svg>
  );
}

export function SubtleDotMatrix({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none bg-tech-dots-masked",
        className
      )}
    />
  );
}

export function TechCircuitDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none mx-auto flex max-w-[1160px] items-center justify-center px-6 py-1",
        className
      )}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DDD6FE] to-[#DDD6FE]" />
      <div className="mx-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
        <span className="h-2 w-2 rounded-full border border-[#7C3AED] bg-white" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#DDD6FE] to-[#DDD6FE]" />
    </div>
  );
}
