"use client";

import React from "react";
import {
  FileDown,
  Presentation,
  ArrowUp,
  Bot,
  BrainCircuit,
  Users,
  Globe,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SECTION_9_FUTURE } from "@/content/presentation-sections";
import { SITE_BRAND } from "@/content/navigation";

interface FutureSectionProps {
  onStartPresentation: () => void;
  onExportPdf: () => void;
}

const FUTURE_ICONS = [Bot, BrainCircuit, Users, Globe];

export function SectionNineFuture({
  onStartPresentation,
  onExportPdf,
}: FutureSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SectionShell
      id="future-of-automation"
      number="09"
      eyebrow="Main Presentation · Conclusion"
      title="Future of Workflow Automation"
      subtitle={SECTION_9_FUTURE.lead}
      surface="white"
      canvasVariant="center"
    >
      {/* Top: 4 Sculpted Slide 5 Pillar Cards + 3D Autonomous Glass Prism */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {SECTION_9_FUTURE.pillars.map((item, idx) => {
            const Icon = FUTURE_ICONS[idx] ?? Bot;
            return (
              <div
                key={item.title}
                className="neu-card flex flex-col justify-between rounded-[26px] p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="neu-num-gradient font-display text-4xl font-extrabold leading-none">
                    0{idx + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/85 text-[#1A1D26] shadow-sm">
                    <Icon className="h-5 w-5 stroke-[1.6]" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-base font-bold text-[#1A1D26]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4C5264]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5">
          <div className="neu-card-white overflow-hidden rounded-[30px] p-3">
            <div className="overflow-hidden rounded-[22px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/visuals/future-agent-prism.jpg"
                alt="Minimalist 3D transparent glass cube enclosing a glowing purple sphere symbolizing autonomous AI workflows"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-[#70778C]">
            Autonomous AI agents collaborating safely inside human-guided workflows
          </p>
        </div>
      </div>

      {/* Reference Slide 4 Centerpiece: Iconic Giant Sculpted Neumorphic Statement Card */}
      <div className="relative mx-auto mt-20 max-w-4xl">
        {/* Matte white 3D spheres resting behind the statement card corners */}
        <div
          aria-hidden="true"
          className="matte-white-sphere tech-float pointer-events-none absolute -right-6 -top-8 hidden h-16 w-16 sm:block"
        />
        <div
          aria-hidden="true"
          className="matte-white-sphere tech-float-slow pointer-events-none absolute -bottom-10 left-10 hidden h-20 w-20 sm:block"
        />

        <div className="neu-statement-card relative z-10 rounded-[36px] px-8 py-14 text-center sm:px-16 sm:py-16">
          <p className="font-display text-2xl font-bold leading-[1.35] tracking-[-0.02em] text-[#1A1D26] sm:text-3xl lg:text-[34px]">
            {SECTION_9_FUTURE.closingStatement}
          </p>
        </div>

        {/* Signature Royal Purple Quotation Mark Below Card (Exact Reference Slide 4 Detail) */}
        <div className="mt-6 flex flex-col items-center">
          <span
            aria-hidden="true"
            className="font-display text-5xl font-black leading-none text-[#7C5CFF]"
          >
            &rdquo;
          </span>
        </div>

        {/* Right-aligned thin purple line & caption matching Reference Slide 4 */}
        <div className="mt-2 flex items-center justify-end gap-4">
          <span className="h-[2px] w-12 rounded-full bg-[#5B3DF5]" />
          <span className="text-sm font-bold text-[#1A1D26]">
            {SITE_BRAND.name} · 2026
          </span>
        </div>

        {/* Clean Action Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExportPdf}
            className="quantum-cta-btn inline-flex cursor-pointer items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
          >
            <FileDown className="h-4 w-4" />
            <span>Download Presentation PDF</span>
          </button>

          <button
            type="button"
            onClick={onStartPresentation}
            className="neu-card inline-flex cursor-pointer items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-[#1A1D26] transition-colors hover:text-[#5B3DF5]"
          >
            <Presentation className="h-4 w-4 text-[#5B3DF5]" />
            <span>Restart Presentation Mode</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#4C5264] transition-colors hover:text-[#5B3DF5]"
          >
            <span>Back to Cover</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Minimal Presentation Footer */}
      <footer className="mt-16 flex flex-col justify-between gap-2 border-t border-white/80 pt-6 text-sm text-[#70778C] sm:flex-row sm:items-center">
        <span>{SITE_BRAND.heroTitle} — Educational Presentation</span>
        <span className="font-mono text-xs">{SITE_BRAND.presentationLabel}</span>
      </footer>
    </SectionShell>
  );
}
