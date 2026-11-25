"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrubWords, SplitTitle } from "@/components/premium/motion";

interface SectionShellProps {
  id: string;
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** kept for API compatibility */
  surface?: "white" | "subtle";
  /** kept for API compatibility */
  canvasVariant?: "center" | "left-arc" | "right-arc" | "minimal";
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
  accent?: "warm" | "cool";
}

/**
 * Cinematic chapter shell: giant parallax numeral, masked word-rise title,
 * scroll-scrubbed lead paragraph, and an ambient light bloom per chapter.
 */
export function SectionShell({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  headerRight,
  accent,
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], ["-10%", "40%"]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 0.9], [0, 1, 1, 0]);
  const bloomScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.6, 1.1, 0.8]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  const tone = accent ?? (Number(number ?? 0) % 2 === 0 ? "cool" : "warm");
  const words = title.split(" ");
  const lastWord = words[words.length - 1]?.replace(/[^\w]/g, "") ?? "";

  return (
    <section
      ref={ref}
      id={id}
      data-section-id={id}
      className={cn("relative w-full scroll-mt-4 overflow-x-clip text-white", className)}
    >
      {/* chapter bloom */}
      <motion.div
        aria-hidden="true"
        style={{ scale: bloomScale }}
        className={cn(
          "pointer-events-none absolute left-1/2 top-24 h-[620px] w-[900px] -translate-x-1/2 rounded-full blur-[130px]",
          tone === "warm" ? "bg-[#ff6d5a]/[0.09]" : "bg-[#7c3aed]/[0.13]"
        )}
      />

      {/* giant parallax numeral */}
      {number && (
        <motion.div
          aria-hidden="true"
          style={{ y: numY, opacity: numOpacity }}
          className="text-outline pointer-events-none absolute -top-6 right-[-2vw] select-none font-display text-[32vw] font-extrabold leading-none tracking-[-0.06em] lg:text-[24vw]"
        >
          {number}
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-28 pt-32 sm:px-10 lg:pb-40 lg:pt-44">
        {/* chapter rail */}
        <div className="mb-10 flex items-center gap-4">
          {number && (
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-[#ff6d5a]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff6d5a]" />
              </span>
              Chapter {number}
              <span className="text-white/35">/ 09</span>
            </span>
          )}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: lineScale }}
            className="h-px flex-1 origin-left bg-gradient-to-r from-white/30 via-white/10 to-transparent"
          />
          {eyebrow && (
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:block">
              {eyebrow}
            </span>
          )}
        </div>

        <header className="mb-16 max-w-5xl sm:mb-24">
          <h2 className="font-display text-[44px] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-[92px]">
            <SplitTitle
              text={title}
              highlight={[lastWord]}
              highlightClassName={tone === "warm" ? "text-gradient-warm" : "text-gradient-cool"}
            />
          </h2>

          {subtitle && (
            <ScrubWords
              text={subtitle}
              className="mt-10 max-w-3xl text-xl font-medium leading-[1.5] tracking-[-0.01em] text-white sm:text-2xl lg:text-[28px]"
            />
          )}

          {headerRight && <div className="mt-8">{headerRight}</div>}
        </header>

        {children}
      </div>
    </section>
  );
}
