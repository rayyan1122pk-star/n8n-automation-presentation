"use client";

import React from "react";
import { motion } from "framer-motion";
import { MAIN_PRESENTATION_SECTIONS, SITE_BRAND } from "@/content/navigation";
import {
  NeumorphicSlideCanvas,
  PresentationHexMark,
} from "@/components/ui/NeumorphicSlideCanvas";

/**
 * Keynote Agenda / Table of Contents Slide directly inspired by Reference Slide 2:
 * Left side: subtle presentation mark, concise overview, and bold "Table of Contents."
 * Right side: sculpted 3D neumorphic cards with signature purple-gradient 01.–09. numbers.
 */
export function TableOfContentsSlide() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="table-of-contents"
      className="relative w-full overflow-hidden border-b border-white/90 bg-[#DCDFF0] text-[#171924]"
    >
      <NeumorphicSlideCanvas variant="left-arc" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 sm:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Left Column: Brand mark, brief intro, bold "Table of Contents." */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:min-h-[420px]">
            <div>
              <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.14em] text-[#1A1D26]">
                <PresentationHexMark />
                <span>{SITE_BRAND.name}</span>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-[1.8] text-[#4C5264]">
                A structured 9-part educational journey—from core automation
                fundamentals and n8n architecture to live AI workflow
                demonstrations.
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5B3DF5]">
                Presentation Roadmap
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1A1D26] sm:text-5xl">
                Table of
                <br />
                Contents<span className="text-[#5B3DF5]">.</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Sculpted 3D Neumorphic Numbered Cards (01. – 09.) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {MAIN_PRESENTATION_SECTIONS.map((sec, idx) => (
              <motion.button
                key={sec.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => scrollTo(sec.id)}
                className="neu-card group flex cursor-pointer items-center gap-5 rounded-[24px] px-6 py-5 text-left transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span className="neu-num-gradient shrink-0 font-display text-4xl font-extrabold tracking-tight sm:text-[42px]">
                  {sec.number}.
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-bold leading-snug text-[#1A1D26] transition-colors group-hover:text-[#5B3DF5] sm:text-[17px]">
                    {sec.label}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[#6B7280]">
                    {sec.shortLabel}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
