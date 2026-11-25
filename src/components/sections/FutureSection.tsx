"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileDown, Presentation, ArrowUp, Bot, BrainCircuit, Users, Globe } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SECTION_9_FUTURE } from "@/content/presentation-sections";
import { SITE_BRAND } from "@/content/navigation";
import { GlassCard, Magnetic, Reveal, ScrubWords, Stagger, StaggerItem, scrollToId } from "@/components/premium/motion";
import { DarkRender } from "@/components/premium/DarkRender";

interface FutureSectionProps {
  onStartPresentation: () => void;
  onExportPdf: () => void;
}

const FUTURE_ICONS = [Bot, BrainCircuit, Users, Globe];

export function SectionNineFuture({ onStartPresentation, onExportPdf }: FutureSectionProps) {
  const finaleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: finaleRef, offset: ["start end", "end end"] });
  const orbScale = useTransform(scrollYProgress, [0, 1], [0.4, 1.4]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.55, 0.8]);

  return (
    <SectionShell
      id="future-of-automation"
      number="09"
      eyebrow="Main Presentation · Conclusion"
      title="Future of Workflow Automation"
      subtitle={SECTION_9_FUTURE.lead}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {SECTION_9_FUTURE.pillars.map((item, idx) => {
            const Icon = FUTURE_ICONS[idx] ?? Bot;
            return (
              <StaggerItem key={item.title}>
                <GlassCard tilt className="group h-full rounded-[30px] p-7">
                  <div className="flex items-start justify-between">
                    <span className="squircle squircle-hot h-14 w-14 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-bold tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.detail}</p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
        <div className="lg:col-span-5">
          <DarkRender
            src="/media/visuals/future-agent-prism.jpg"
            alt="Glass cube enclosing a glowing sphere symbolising autonomous AI workflows"
            glow="cool"
            caption="Autonomous agents inside human-guided workflows"
          />
        </div>
      </div>

      {/* Cinematic finale */}
      <div ref={finaleRef} className="relative mt-40 min-h-[90vh] py-24">
        <motion.div
          aria-hidden="true"
          style={{ scale: orbScale, opacity: orbOpacity }}
          className="orb pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 blur-[60px]"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="font-serif text-[120px] leading-none text-gradient-warm">&ldquo;</span>
          </Reveal>
          <ScrubWords
            text={SECTION_9_FUTURE.closingStatement}
            highlight={["people", "clarity,", "speed,", "purpose."]}
            offset={["start 0.85", "end 0.55"]}
            className="justify-center font-display text-3xl font-bold leading-[1.2] tracking-[-0.035em] text-white sm:text-5xl lg:text-[60px]"
          />
          <Reveal delay={0.1}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#ff6d5a]" />
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/50">{SITE_BRAND.name} · 2026</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#ff6d5a]" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <button type="button" onClick={onExportPdf} className="btn-liquid btn-liquid-primary px-7 py-4 text-[15px]">
                  <FileDown className="h-4 w-4" />
                  Download Presentation PDF
                </button>
              </Magnetic>
              <Magnetic>
                <button type="button" onClick={onStartPresentation} className="btn-liquid px-7 py-4 text-[15px]">
                  <Presentation className="h-4 w-4" />
                  Restart Presentation Mode
                </button>
              </Magnetic>
              <button
                type="button"
                onClick={() => scrollToId("home")}
                className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-3 text-sm font-semibold text-white/50 transition-colors hover:text-white"
              >
                Back to Cover
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-white/[0.08] pt-8 text-sm text-white/40 sm:flex-row sm:items-center">
        <span>{SITE_BRAND.heroTitle} — Educational Presentation</span>
        <span className="font-mono text-xs">{SITE_BRAND.presentationLabel}</span>
      </footer>
    </SectionShell>
  );
}
