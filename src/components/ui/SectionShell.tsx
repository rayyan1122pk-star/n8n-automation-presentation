"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NeumorphicSlideCanvas,
  PresentationHexMark,
} from "@/components/ui/NeumorphicSlideCanvas";
import { SITE_BRAND } from "@/content/navigation";

interface SectionShellProps {
  id: string;
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  surface?: "white" | "subtle";
  canvasVariant?: "center" | "left-arc" | "right-arc" | "minimal";
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

/**
 * Keynote Slide Section Shell matching the soft alabaster-porcelain neumorphic
 * presentation deck aesthetic: concentric white rings, 3D matte spheres,
 * bold centered presentation titles, and generous breathing room.
 */
export function SectionShell({
  id,
  number,
  eyebrow,
  title,
  subtitle,
  surface = "white",
  canvasVariant = "center",
  children,
  className,
  headerRight,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-section-id={id}
      className={cn(
        "relative w-full scroll-mt-16 overflow-hidden border-b border-white/90 text-[#171924]",
        surface === "subtle" ? "bg-[#DCDFF0]" : "bg-[#E4E7F5]",
        className
      )}
    >
      <NeumorphicSlideCanvas variant={canvasVariant} />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 sm:px-10 lg:py-28">
        {/* Quiet top slide metadata mark matching the reference deck */}
        <div className="mb-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#1A1D26]/80">
            <PresentationHexMark className="h-5 w-5" />
            <span>{SITE_BRAND.name}</span>
          </div>
          {number && (
            <span className="rounded-full bg-white/75 px-3.5 py-1 font-mono text-xs font-bold text-[#5B3DF5] shadow-sm">
              Section {number} / 09
            </span>
          )}
        </div>

        {/* Centered Prominent Section Heading */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5B3DF5]">
              {eyebrow}
            </p>
          )}

          <h2 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-[#1A1D26] sm:text-5xl lg:text-[52px] lg:leading-[1.12]">
            {title}
          </h2>

          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-[#5B3DF5] to-[#9B7DFF]"
          />

          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.75] text-[#4C5264] sm:text-lg">
              {subtitle}
            </p>
          )}

          {headerRight && (
            <div className="mt-6 flex justify-center">{headerRight}</div>
          )}
        </motion.header>

        {children}
      </div>
    </section>
  );
}
