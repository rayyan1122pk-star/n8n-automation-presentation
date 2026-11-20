"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NeumorphicSlideCanvasProps {
  variant?: "center" | "left-arc" | "right-arc" | "minimal";
  className?: string;
}

/**
 * High-contrast Slide Backdrop:
 * Soft lavender-purple ambient shaded regions behind blocks & corners so pure-white
 * concentric orbital rings and 3D matte white spheres pop cleanly with clear depth.
 */
export function NeumorphicSlideCanvas({
  variant = "center",
  className,
}: NeumorphicSlideCanvasProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      {/* Subtle shaded lavender-purple atmospheric zones behind component blocks */}
      <div className="slide-purple-shade absolute inset-x-[8%] top-[18%] h-[68%] rounded-full" />
      <div
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(124, 92, 255, 0.14)" }}
      />
      <div
        className="absolute -bottom-28 -right-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(91, 61, 245, 0.13)" }}
      />

      {variant === "center" && (
        <>
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/95 shadow-[0_0_18px_rgba(91,61,245,0.08)]" />
          <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/85" />
          <div className="absolute left-1/2 top-1/2 h-[1060px] w-[1060px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70" />

          {/* Localized soft purple shade behind side spheres so white balls pop */}
          <div
            className="absolute right-[10%] top-4 hidden h-36 w-36 rounded-full blur-2xl lg:block"
            style={{ background: "rgba(91, 61, 245, 0.18)" }}
          />
          <div className="matte-white-sphere tech-float absolute right-[12%] top-8 hidden h-20 w-20 lg:block" />

          <div
            className="absolute bottom-10 left-[7%] hidden h-28 w-28 rounded-full blur-2xl lg:block"
            style={{ background: "rgba(124, 92, 255, 0.18)" }}
          />
          <div
            className="matte-white-sphere tech-float-slow absolute bottom-14 left-[9%] hidden h-12 w-12 lg:block"
            style={{ animationDelay: "1.6s" }}
          />
          <div
            className="matte-white-sphere tech-float absolute bottom-10 right-[22%] hidden h-10 w-10 lg:block"
            style={{ animationDelay: "0.8s" }}
          />
        </>
      )}

      {variant === "left-arc" && (
        <>
          <div className="absolute -left-[220px] -top-[180px] h-[680px] w-[680px] rounded-full border-2 border-white/95 shadow-[0_0_18px_rgba(91,61,245,0.08)]" />
          <div className="absolute -left-[320px] -top-[280px] h-[940px] w-[940px] rounded-full border-[1.5px] border-white/80" />

          <div
            className="absolute bottom-[18%] left-[5%] hidden h-32 w-32 rounded-full blur-2xl lg:block"
            style={{ background: "rgba(91, 61, 245, 0.2)" }}
          />
          <div className="matte-white-sphere tech-float absolute bottom-[22%] left-[8%] hidden h-16 w-16 lg:block" />
          <div
            className="matte-white-sphere tech-float-slow absolute bottom-[24%] left-[15%] hidden h-7 w-7 lg:block"
            style={{ animationDelay: "1.1s" }}
          />
        </>
      )}

      {variant === "right-arc" && (
        <>
          <div className="absolute -right-[180px] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full border-2 border-white/95 shadow-[0_0_18px_rgba(91,61,245,0.08)]" />
          <div className="absolute -right-[300px] top-1/2 h-[980px] w-[980px] -translate-y-1/2 rounded-full border-[1.5px] border-white/80" />

          <div
            className="absolute right-[26%] top-8 hidden h-32 w-32 rounded-full blur-2xl lg:block"
            style={{ background: "rgba(91, 61, 245, 0.18)" }}
          />
          <div className="matte-white-sphere tech-float absolute right-[28%] top-12 hidden h-16 w-16 lg:block" />
          <div
            className="matte-white-sphere tech-float-slow absolute bottom-12 right-[12%] hidden h-11 w-11 lg:block"
            style={{ animationDelay: "1.4s" }}
          />
        </>
      )}

      {variant === "minimal" && (
        <>
          <div className="absolute left-1/2 top-1/2 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/85" />
          <div
            className="absolute right-[6%] top-6 hidden h-28 w-28 rounded-full blur-2xl xl:block"
            style={{ background: "rgba(91, 61, 245, 0.18)" }}
          />
          <div className="matte-white-sphere tech-float-slow absolute right-[8%] top-10 hidden h-14 w-14 xl:block" />
          <div
            className="matte-white-sphere tech-float absolute bottom-12 left-[7%] hidden h-11 w-11 xl:block"
            style={{ animationDelay: "1.2s" }}
          />
        </>
      )}
    </div>
  );
}

/** Small geometric hexagon presentation mark */
export function PresentationHexMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
        stroke="#5B3DF5"
        strokeWidth="2"
        fill="rgba(91, 61, 245, 0.12)"
      />
      <path
        d="M8.5 9.5L15.5 12L8.5 14.5"
        stroke="#5B3DF5"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
