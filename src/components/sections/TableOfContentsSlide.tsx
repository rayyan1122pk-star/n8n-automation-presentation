"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MAIN_PRESENTATION_SECTIONS, SITE_BRAND } from "@/content/navigation";
import { CountUp, EASE, Reveal, SplitTitle, scrollToId } from "@/components/premium/motion";

const STATS = [
  { value: 9, label: "Chapters" },
  { value: 12, label: "Core components" },
  { value: 9, label: "Real-life applications" },
  { value: 3, label: "Live projects" },
];

export function TableOfContentsSlide() {
  return (
    <section id="table-of-contents" className="relative w-full overflow-x-clip text-white">
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pb-24 pt-32 sm:px-10 lg:pt-40">
        {/* Stats band */}
        <Reveal>
          <div className="glass-strong grid grid-cols-2 overflow-hidden rounded-[32px] lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`relative px-8 py-9 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${
                  i > 1 ? "border-t lg:border-t-0" : ""
                } border-white/[0.08]`}
              >
                <CountUp to={s.value} className="num-gradient font-display text-6xl font-extrabold tracking-[-0.04em] sm:text-7xl" />
                <p className="mt-2 text-sm font-medium text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-32 grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Sticky title column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="chip">{SITE_BRAND.name}</span>
              <h2 className="mt-8 font-display text-6xl font-extrabold leading-[0.95] tracking-[-0.05em] sm:text-7xl">
                <SplitTitle text="Table of" />
                <br />
                <SplitTitle text="Contents." delay={0.15} highlight={["Contents."]} highlightClassName="font-serif font-normal italic text-gradient-warm" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xs text-base leading-[1.8] text-white/55">
                  A structured nine-part journey — from the fundamentals of automation and the
                  architecture of n8n to live AI-powered workflow demonstrations.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Chapter rows */}
          <div className="lg:col-span-8">
            <ul className="border-t border-white/[0.08]">
              {MAIN_PRESENTATION_SECTIONS.map((sec, idx) => (
                <motion.li
                  key={sec.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: (idx % 3) * 0.06, ease: EASE }}
                  className="border-b border-white/[0.08]"
                >
                  <button
                    type="button"
                    onClick={() => scrollToId(sec.id)}
                    className="group relative flex w-full cursor-pointer items-center gap-6 overflow-hidden px-2 py-7 text-left sm:gap-10 sm:px-6"
                  >
                    {/* hover sweep */}
                    <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#ff6d5a]/[0.12] via-[#8b5cf6]/[0.07] to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                    <span className="relative font-mono text-sm text-white/35 transition-colors group-hover:text-[#ff8a73]">
                      {sec.number}
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-display text-2xl font-bold tracking-[-0.03em] text-white/90 transition-transform duration-500 group-hover:translate-x-2 sm:text-[34px]">
                        {sec.label}
                      </span>
                      <span className="mt-1.5 block text-sm text-white/40 transition-colors group-hover:text-white/60">
                        {sec.description}
                      </span>
                    </span>
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-[#ea4b71]">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
