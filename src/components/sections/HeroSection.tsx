"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";
import { SITE_BRAND } from "@/content/navigation";
import { FloatingGlassOrb, OrbitalRingAccent } from "@/components/ui/TechDecor";

interface HeroSectionProps {
  onStartPresentation: () => void;
}

/**
 * Light White-Dominant Hero Landing Page aligned with the rest of the presentation:
 * Uses our bespoke light 3D planetary dome & crystal backdrop (more white, refined purple accents)
 * with crisp charcoal typography and sculpted buttons.
 */
export function HeroSection({ onStartPresentation }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      data-section-id="home"
      className="relative flex min-h-[94vh] w-full flex-col justify-between overflow-hidden border-b border-white/90 bg-[#E6E8F4] pt-20 text-[#171924]"
    >
      {/* Bespoke Light 3D Planetary Dome & Crystal Shards Backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/hero/hero-backdrop-light.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-95"
        />
        {/* Gentle alabaster-white veil in upper/center area for razor-sharp dark text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ECEEF8]/70 via-[#F4F5FC]/38 to-transparent" />
      </div>

      {/* Subtle Floating 3D Orbital Glass Accent in Upper-Right Negative Space */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[16%] z-10 hidden items-center justify-center lg:flex"
      >
        <OrbitalRingAccent size={165} className="opacity-70" />
        <FloatingGlassOrb size={42} className="absolute" />
      </div>

      {/* Centered Clean Educational Presentation Hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-[960px] flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="neu-card-white mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-[#5B3DF5]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5B3DF5]">
            {SITE_BRAND.presentationLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-extrabold tracking-[-0.03em] text-[#171924] sm:text-5xl md:text-6xl lg:text-[66px] lg:leading-[1.08]"
        >
          {SITE_BRAND.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-[1.75] text-[#43495D] sm:text-lg"
        >
          {SITE_BRAND.heroDescription}
        </motion.p>

        {/* Exactly Two Clear Hero Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onStartPresentation}
            className="quantum-cta-btn inline-flex cursor-pointer items-center gap-3.5 rounded-full py-2.5 pl-6 pr-2.5 text-sm font-semibold text-white"
          >
            <span>Start Presentation</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5B3DF5]">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("practical-demonstration")}
            className="neu-card-white inline-flex cursor-pointer items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-[#171924] transition-transform hover:-translate-y-0.5 hover:text-[#5B3DF5] active:scale-[0.98]"
          >
            <span>Explore Solutions</span>
            <ArrowUpRight className="h-4 w-4 text-[#5B3DF5]" />
          </button>
        </motion.div>
      </div>

      {/* Subtle Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pb-10">
        <button
          type="button"
          onClick={() => scrollTo("table-of-contents")}
          aria-label="Scroll to Table of Contents"
          className="neu-card-white inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#5B3DF5] transition-transform hover:translate-y-0.5"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
