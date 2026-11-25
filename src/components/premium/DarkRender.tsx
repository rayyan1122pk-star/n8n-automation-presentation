"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Turns the existing white-studio 3D renders into luminous dark-mode objects:
 * inverted luminance (hue preserved), screen-blended into the canvas and
 * feathered with a radial mask. Includes scroll parallax + slow zoom.
 */
export function DarkRender({
  src,
  alt,
  className,
  caption,
  glow = "warm",
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  glow?: "warm" | "cool";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.06]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <figure ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-[12%] rounded-full blur-[80px]",
          glow === "warm" ? "bg-[#ff6d5a]/25" : "bg-[#8b5cf6]/30"
        )}
      />
      <motion.div style={{ y, scale, rotate }} className="relative mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto w-full select-none object-cover"
          style={{
            filter: "invert(1) hue-rotate(180deg) saturate(1.6) brightness(1.15) contrast(1.15)",
            WebkitMaskImage: "radial-gradient(ellipse 62% 62% at 50% 50%, #000 45%, transparent 75%)",
            maskImage: "radial-gradient(ellipse 62% 62% at 50% 50%, #000 45%, transparent 75%)",
          }}
        />
      </motion.div>
      {caption && (
        <figcaption className="relative mt-2 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
