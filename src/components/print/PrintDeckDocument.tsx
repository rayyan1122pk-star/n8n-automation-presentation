"use client";

import React, { useState } from "react";
import { SITE_BRAND, MAIN_PRESENTATION_SECTIONS } from "@/content/navigation";
import {
  SECTION_1_INTRO,
  SECTION_2_WORKFLOW,
  SECTION_3_HOW_N8N_WORKS,
  SECTION_4_COMPONENTS,
  SECTION_5_N8N_AND_AI,
  SECTION_6_APPLICATIONS,
  SECTION_7_ADVANTAGES,
  SECTION_9_FUTURE,
} from "@/content/presentation-sections";
import { TECH_STACK_ITEMS } from "@/content/tech-stack";
import { SOLUTIONS, type SolutionConfig, type WorkflowNodeDoc } from "@/content/solutions";
import { LogoMark } from "@/components/premium/Logo";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function EagerImg({
  sources,
  alt,
  className,
}: {
  sources: string[];
  alt: string;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const validSources = sources.filter(Boolean);
  const src = validSources[idx];

  if (failed || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#ECEFF8] p-3 text-center text-[8pt] text-[#555C73]">
        <span>{alt}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="sync"
      onError={() => {
        if (idx + 1 < validSources.length) setIdx(idx + 1);
        else setFailed(true);
      }}
      className={className}
    />
  );
}

function PrintMediaCard({
  primaryPath,
  fallbackPath,
  stockFallbackUrl,
  label,
  heightClass = "h-[240px]",
}: {
  primaryPath: string;
  fallbackPath?: string;
  stockFallbackUrl?: string;
  label: string;
  heightClass?: string;
}) {
  const sources = [
    primaryPath,
    ...(fallbackPath && fallbackPath !== primaryPath ? [fallbackPath] : []),
    ...(stockFallbackUrl ? [stockFallbackUrl] : []),
  ];

  return (
    <div
      className={`neu-card-white flex flex-col overflow-hidden rounded-[18px] ${heightClass}`}
    >
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-white p-2.5">
        <EagerImg
          sources={sources}
          alt={label}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="shrink-0 border-t border-[#E6EAF4] bg-[#F7F8FD] px-3.5 py-2 text-[8.2pt] font-bold text-[#171924]">
        {label}
      </div>
    </div>
  );
}

/**
 * Exact A4 Landscape Artboard (297mm x 210mm = 1122px x 794px on screen).
 * Locked height + clean flex header/body/footer guarantees zero vertical drift.
 */
function SlideFrame({
  slideNum,
  totalSlides,
  sectionNum,
  title,
  appendix = false,
  children,
}: {
  slideNum: number;
  totalSlides: number;
  sectionNum: string;
  title: string;
  appendix?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="print-page relative flex h-[794px] w-[1122px] shrink-0 flex-col justify-between overflow-hidden rounded-[22px] border border-white/90 bg-[#DFE2F0] px-10 py-7 text-[#171924] shadow-[0_22px_60px_rgba(32,37,70,0.16)] print:shadow-none">
      {/* Consistent Soft Purple Shading + Pure White Concentric Rings + Matte 3D Spheres */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -left-16 -top-16 h-60 w-60 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.18) 0%, rgba(124,92,255,0) 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(91,61,245,0.15) 0%, rgba(91,61,245,0) 70%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90" />
        <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/75" />
        <div className="matte-white-sphere absolute right-7 top-5 h-11 w-11" />
        <div className="matte-white-sphere absolute bottom-7 left-7 h-8 w-8" />
      </div>

      {/* Fixed-height Top Bar */}
      <header className="relative z-10 flex h-[44px] shrink-0 items-center justify-between border-b border-white/85 pb-2.5">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-[#171924]">
            <LogoMark className="h-4 w-4" />
            <span>{SITE_BRAND.name}</span>
          </span>
          <span className="h-4 w-px bg-white" />
          <span className="font-mono text-[12px] font-bold text-[#5B3DF5]">
            {sectionNum}
          </span>
          <h2 className="font-display text-[20px] font-extrabold tracking-tight text-[#171924]">
            {title}
          </h2>
        </div>
        <span className="rounded-full bg-white/90 px-3.5 py-1 text-[11px] font-bold text-[#5B3DF5]">
          {appendix ? "Optional Appendix" : `Section ${sectionNum}`}
        </span>
      </header>

      {/* Fixed Center Content Region — mathematically sized to never clip or spill */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center py-4">
        {children}
      </div>

      {/* Fixed-height Footer */}
      <footer className="relative z-10 flex h-[28px] shrink-0 items-center justify-between border-t border-white/85 pt-2 text-[11px] text-[#555C73]">
        <span>{SITE_BRAND.presentationLabel}</span>
        <span className="font-mono font-bold text-[#5B3DF5]">
          Slide {String(slideNum).padStart(2, "0")} /{" "}
          {String(totalSlides).padStart(2, "0")}
        </span>
      </footer>
    </section>
  );
}

function NodeChunkSlide({
  solution,
  chunk,
  chunkIdx,
  totalChunks,
  slideNum,
  totalSlides,
}: {
  solution: SolutionConfig;
  chunk: WorkflowNodeDoc[];
  chunkIdx: number;
  totalChunks: number;
  slideNum: number;
  totalSlides: number;
}) {
  const shortName = solution.name.split(" — ")[0];
  return (
    <SlideFrame
      slideNum={slideNum}
      totalSlides={totalSlides}
      sectionNum="08"
      title={`${shortName} — Node-by-Node Documentation${
        totalChunks > 1 ? ` (Part ${chunkIdx + 1}/${totalChunks})` : ""
      }`}
    >
      <div className="grid grid-cols-2 gap-4">
        {chunk.map((node) => (
          <div
            key={node.id}
            className="neu-card-white flex flex-col justify-between rounded-[20px] p-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-[#ECEFF8] pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="neu-purple-orb flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white">
                    {String(node.sequence).padStart(2, "0")}
                  </span>
                  <h3 className="truncate font-display text-[13px] font-bold text-[#171924]">
                    {node.nodeName}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full bg-[#F1EEFF] px-2.5 py-0.5 text-[10px] font-bold text-[#5B3DF5]">
                  {node.category}
                </span>
              </div>

              <p className="mt-2.5 text-[11.5px] leading-[1.45] text-[#2F3545]">
                <strong className="text-[#171924]">Purpose: </strong>
                {node.whatDoesItDo}
              </p>
              <p className="mt-1.5 text-[11px] leading-[1.45] text-[#4C5264]">
                <strong className="text-[#171924]">Why Used: </strong>
                {node.whyUsed}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#ECEFF8] pt-2.5 text-[10.5px]">
              <div className="rounded-lg bg-[#F5F7FC] p-2">
                <span className="block font-bold uppercase tracking-wider text-[#656C84] text-[9px]">
                  Input
                </span>
                <p className="mt-0.5 line-clamp-2 leading-snug text-[#2F3545]">
                  {node.inputData}
                </p>
              </div>
              <div className="rounded-lg bg-[#F3F0FF] p-2">
                <span className="block font-bold uppercase tracking-wider text-[#5B3DF5] text-[9px]">
                  Output
                </span>
                <p className="mt-0.5 line-clamp-2 leading-snug text-[#171924]">
                  {node.outputData}
                </p>
              </div>
              <div className="col-span-2 truncate font-mono text-[10px] text-[#5B3DF5]">
                Next → {node.nextConnection}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

/**
 * Pixel-Locked, Perfectly Aligned A4 Landscape PDF Deck.
 * Every slide includes real eagerly-loaded images and exact vertical fit (zero drift).
 */
export function PrintDeckDocument({ previewMode = false }: { previewMode?: boolean }) {
  // Dynamically calculate exact slide numbers based on 4-nodes-per-slide pagination
  const solutionSlidesPlan = SOLUTIONS.map((sol, idx) => ({
    solution: sol,
    projectNumber: `Project 0${idx + 1}:`,
    nodeChunks: chunkArray(sol.nodes, 4),
  }));

  // 9 base slides (Cover, TOC, Sec 1..7) + (1 overview + nodeChunks per solution) + Sec 9 + Appendix
  const demoSlideCount = solutionSlidesPlan.reduce(
    (sum, s) => sum + 1 + s.nodeChunks.length,
    0
  );
  const totalSlides = 9 + demoSlideCount + 2;

  let slideCursor = 10;

  return (
    <div
      id="print-deck-root"
      className={
        previewMode
          ? "print-preview-wrapper mx-auto flex flex-col items-center gap-8 px-6 py-8"
          : "print-deck-offscreen"
      }
    >
      {/* SLIDE 01: COVER (Uses our real Light 3D Planetary Dome Hero Backdrop!) */}
      <section className="print-page relative flex h-[794px] w-[1122px] shrink-0 flex-col justify-between overflow-hidden rounded-[22px] border border-white/90 bg-[#E6E8F4] px-12 py-10 text-center text-[#171924] shadow-[0_22px_60px_rgba(32,37,70,0.16)] print:shadow-none">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <EagerImg
            sources={["/media/hero/hero-backdrop-light.jpg"]}
            alt=""
            className="h-full w-full object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#ECEEF8]/72 via-[#F4F5FC]/42 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center justify-center gap-2 text-[12px] font-bold tracking-[0.16em] text-[#171924]">
          <LogoMark className="h-5 w-5" />
          <span>{SITE_BRAND.name}</span>
        </div>

        <div className="relative z-10 my-auto flex flex-col items-center">
          <span className="neu-card-white mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B3DF5]">
            <span className="h-2 w-2 rounded-full bg-[#5B3DF5]" />
            {SITE_BRAND.presentationLabel}
          </span>
          <h1 className="max-w-3xl font-display text-[52px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#171924]">
            {SITE_BRAND.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-[#43495D]">
            {SITE_BRAND.heroDescription}
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/85 pt-3 text-[11px] text-[#555C73]">
          <span>9 Main Presentation Headings + Optional Appendix</span>
          <span className="font-mono font-bold text-[#5B3DF5]">
            Slide 01 / {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </section>

      {/* SLIDE 02: TABLE OF CONTENTS */}
      <SlideFrame slideNum={2} totalSlides={totalSlides} sectionNum="00" title="Table of Contents">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-4 space-y-6">
            <p className="text-[13px] leading-[1.7] text-[#43495D]">
              A structured 9-part educational journey from core automation
              fundamentals and n8n architecture to live AI workflow
              demonstrations.
            </p>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5B3DF5]">
                Presentation Roadmap
              </p>
              <h3 className="mt-2 font-display text-[42px] font-extrabold leading-[1.06] text-[#171924]">
                Table of
                <br />
                Contents<span className="text-[#5B3DF5]">.</span>
              </h3>
            </div>
          </div>

          <div className="col-span-8 grid grid-cols-3 gap-4">
            {MAIN_PRESENTATION_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="neu-card flex items-center gap-3.5 rounded-[20px] px-4 py-5"
              >
                <span className="neu-num-gradient shrink-0 font-display text-[28px] font-extrabold leading-none">
                  {sec.number}.
                </span>
                <p className="font-display text-[13px] font-bold leading-snug text-[#171924]">
                  {sec.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>

      {/* SLIDE 03: 01. INTRODUCTION TO AUTOMATION */}
      <SlideFrame slideNum={3} totalSlides={totalSlides} sectionNum="01" title="Introduction to Automation">
        <div className="space-y-5">
          <div className="neu-card-white grid grid-cols-2 gap-6 rounded-[22px] p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                What Automation Means
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-[#2F3545]">
                {SECTION_1_INTRO.whatIsAutomation}
              </p>
            </div>
            <div className="border-l border-[#E6EAF4] pl-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                Why Businesses Need It
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.6] text-[#2F3545]">
                {SECTION_1_INTRO.whyImportant}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {SECTION_1_INTRO.manualProblems.map((p, idx) => (
              <div
                key={p.title}
                className="neu-card flex items-center gap-4 rounded-[20px] px-5 py-4"
              >
                <span
                  className={
                    idx === 0
                      ? "neu-purple-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold text-white"
                      : "neu-glass-circle flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold text-[#171924]"
                  }
                >
                  0{idx + 1}
                </span>
                <div>
                  <p className="font-display text-[13.5px] font-bold text-[#171924]">
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-[#43495D]">
                    {p.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {SECTION_1_INTRO.basicExamples.map((ex, i) => (
              <div
                key={ex.title}
                className="neu-card-white flex items-start gap-3 rounded-[18px] px-4 py-3.5"
              >
                <span className="neu-num-gradient font-display text-[20px] font-extrabold leading-none">
                  0{i + 1}.
                </span>
                <div>
                  <p className="text-[12px] font-bold text-[#171924]">{ex.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#43495D]">{ex.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>

      {/* SLIDE 04: 02. WORKFLOW AUTOMATION */}
      <SlideFrame slideNum={4} totalSlides={totalSlides} sectionNum="02" title="Workflow Automation">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="neu-card-white rounded-[20px] p-4">
              <p className="font-display text-[13px] font-bold text-[#5B3DF5]">What Is a Workflow?</p>
              <p className="mt-1 text-[11.5px] leading-[1.55] text-[#43495D]">{SECTION_2_WORKFLOW.whatIsWorkflow}</p>
            </div>
            <div className="neu-card-white rounded-[20px] p-4">
              <p className="font-display text-[13px] font-bold text-[#5B3DF5]">How Apps Communicate</p>
              <p className="mt-1 text-[11.5px] leading-[1.55] text-[#43495D]">{SECTION_2_WORKFLOW.howAppsCommunicate}</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3.5">
            {SECTION_2_WORKFLOW.pipelineStages.map((s) => (
              <div
                key={s.name}
                className="neu-card flex flex-col justify-between rounded-[22px] p-4 text-center"
              >
                <div>
                  <span className="neu-num-gradient block font-display text-[30px] font-extrabold leading-none">
                    0{s.step}
                  </span>
                  <p className="mt-2.5 font-display text-[14px] font-bold text-[#171924]">
                    {s.name}
                  </p>
                  <p className="mt-0.5 text-[10.5px] font-semibold text-[#5B3DF5]">
                    {s.role}
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-[#43495D]">
                    {s.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="neu-card-white grid grid-cols-3 divide-x divide-[#E6EAF4] rounded-[20px] p-4">
            {SECTION_2_WORKFLOW.manualToAutomated.map((row) => (
              <div key={row.task} className="px-4 first:pl-1 last:pr-1">
                <p className="text-[11.5px] font-bold text-[#171924]">{row.task}</p>
                <p className="mt-1 text-[10.5px] text-[#656C84]">Manual: {row.before}</p>
                <p className="mt-1 text-[10.5px] font-semibold text-[#5B3DF5]">Automated: {row.after}</p>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>

      {/* SLIDE 05: 03. HOW DOES N8N WORK? (Includes 3D n8n Hub Orb Render!) */}
      <SlideFrame slideNum={5} totalSlides={totalSlides} sectionNum="03" title="How Does n8n Work?">
        <div className="space-y-4">
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-5">
              <div className="neu-card-white overflow-hidden rounded-[24px] p-2.5">
                <div className="h-[290px] w-full overflow-hidden rounded-[18px] bg-white">
                  <EagerImg
                    sources={["/media/visuals/n8n-hub-orb.jpg"]}
                    alt="n8n central orchestration hub"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-7 space-y-3">
              {SECTION_3_HOW_N8N_WORKS.executionSteps.map((s) => (
                <div
                  key={s.step}
                  className="neu-card flex items-start gap-4 rounded-[18px] px-5 py-3.5"
                >
                  <span className="neu-num-gradient shrink-0 font-display text-[26px] font-extrabold leading-none">
                    {s.step}.
                  </span>
                  <div>
                    <h3 className="font-display text-[13.5px] font-bold text-[#171924]">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-[#43495D]">
                      {s.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="neu-card-white rounded-[20px] px-6 py-4">
            <p className="font-display text-[13px] font-bold text-[#5B3DF5]">
              {SECTION_3_HOW_N8N_WORKS.aiBasics.title}
            </p>
            <div className="mt-2.5 grid grid-cols-4 gap-3">
              {SECTION_3_HOW_N8N_WORKS.aiBasics.components.map((c, idx) => (
                <div key={c.name} className="rounded-xl bg-[#F5F7FC] p-3">
                  <span className="font-mono text-[10px] font-bold text-[#5B3DF5]">0{idx + 1}</span>
                  <p className="mt-0.5 text-[11.5px] font-bold text-[#171924]">{c.name}</p>
                  <p className="mt-0.5 text-[10.5px] leading-snug text-[#43495D]">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SlideFrame>

      {/* SLIDE 06: 04. IMPORTANT COMPONENTS OF N8N */}
      <SlideFrame slideNum={6} totalSlides={totalSlides} sectionNum="04" title="Important Components of n8n">
        <div className="grid grid-cols-3 gap-5">
          {SECTION_4_COMPONENTS.map((group, gIdx) => (
            <div
              key={group.id}
              className="neu-card flex flex-col justify-between rounded-[24px] p-5"
            >
              <div>
                <div className="mb-3 flex items-baseline gap-2.5 border-b border-white/90 pb-2.5">
                  <span className="neu-num-gradient font-display text-[26px] font-extrabold leading-none">
                    0{gIdx + 1}.
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-[#171924]">
                      {group.groupTitle}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl bg-white/75 p-3 shadow-sm"
                    >
                      <p className="text-[12px] font-bold text-[#5B3DF5]">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-[10.8px] leading-snug text-[#2F3545]">
                        {item.whatItDoes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* SLIDE 07: 05. N8N AND AI (Includes 3D AI Neural Core Render!) */}
      <SlideFrame slideNum={7} totalSlides={totalSlides} sectionNum="05" title="n8n and AI">
        <div className="space-y-4">
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 grid grid-cols-2 gap-3.5">
              {SECTION_5_N8N_AND_AI.pillars.map((p, idx) => (
                <div key={p.title} className="neu-card rounded-[20px] p-4">
                  <span className="neu-num-gradient font-display text-[22px] font-extrabold leading-none">
                    0{idx + 1}.
                  </span>
                  <h3 className="mt-1.5 font-display text-[13px] font-bold text-[#171924]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-[#43495D]">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="col-span-5">
              <div className="neu-card-white overflow-hidden rounded-[24px] p-2.5">
                <div className="h-[270px] w-full overflow-hidden rounded-[18px] bg-white">
                  <EagerImg
                    sources={["/media/visuals/ai-neural-core.jpg"]}
                    alt="3D AI neural core"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="neu-card-white overflow-hidden rounded-[20px]">
            <table className="w-full border-collapse text-left text-[11.5px]">
              <thead>
                <tr className="border-b border-[#E4E8F5] bg-[#F1EEFF] text-[10px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                  <th className="w-[22%] px-5 py-2.5">Dimension</th>
                  <th className="w-[38%] px-4 py-2.5">Traditional Automation</th>
                  <th className="w-[40%] px-5 py-2.5">AI-Powered Automation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECEFF8]">
                {SECTION_5_N8N_AND_AI.comparison.map((row) => (
                  <tr key={row.aspect}>
                    <td className="px-5 py-2 font-bold text-[#171924]">{row.aspect}</td>
                    <td className="px-4 py-2 text-[#555C73]">{row.traditional}</td>
                    <td className="px-5 py-2 font-semibold text-[#171924]">{row.aiPowered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SlideFrame>

      {/* SLIDE 08: 06. REAL-LIFE APPLICATIONS (All 9 with crisp aligned photos!) */}
      <SlideFrame slideNum={8} totalSlides={totalSlides} sectionNum="06" title="Real-Life Applications">
        <div className="grid grid-cols-3 gap-4">
          {SECTION_6_APPLICATIONS.map((app) => (
            <div
              key={app.number}
              className="neu-card flex items-center gap-3.5 rounded-[18px] p-3"
            >
              <div className="h-[88px] w-[96px] shrink-0 overflow-hidden rounded-[12px] bg-[#E6EAF4]">
                <EagerImg
                  sources={[app.localPath, app.imageUrl]}
                  alt={app.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="neu-num-gradient font-display text-[15px] font-extrabold">
                    {app.number}.
                  </span>
                  <p className="truncate font-display text-[12px] font-bold text-[#171924]">
                    {app.title}
                  </p>
                </div>
                <p className="mt-1 line-clamp-3 text-[10.2px] leading-snug text-[#43495D]">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SlideFrame>

      {/* SLIDE 09: 07. ADVANTAGES OF N8N (Includes 3D Efficiency Clock Render!) */}
      <SlideFrame slideNum={9} totalSlides={totalSlides} sectionNum="07" title="Advantages of n8n">
        <div className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-5 space-y-4">
            <div className="neu-card-white overflow-hidden rounded-[24px] p-2.5">
              <div className="h-[250px] w-full overflow-hidden rounded-[18px] bg-white">
                <EagerImg
                  sources={["/media/visuals/automation-clock.jpg"]}
                  alt="3D automated time savings timepiece"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="neu-card-white rounded-[18px] p-4 text-[11px] leading-relaxed text-[#43495D]">
              <strong className="text-[#5B3DF5]">Key Edge: </strong>
              Combines visual transparency, 400+ integrations, native AI nodes, and self-hostable cost control.
            </div>
          </div>

          <div className="col-span-7 grid grid-cols-2 gap-3">
            {SECTION_7_ADVANTAGES.advantages.map((adv, idx) => (
              <div
                key={adv.title}
                className="neu-card flex items-start gap-3 rounded-[16px] px-4 py-3"
              >
                <span className="neu-num-gradient shrink-0 font-display text-[18px] font-extrabold leading-none">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                <div>
                  <p className="font-display text-[12px] font-bold text-[#171924]">
                    {adv.title}
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-snug text-[#43495D]">
                    {adv.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>

      {/* SLIDES 10+: 08. PRACTICAL DEMONSTRATION (FinFlow, OpsFlow, MailFlow — Clean Paginated) */}
      {solutionSlidesPlan.map((plan) => {
        const overviewSlideNum = slideCursor++;
        const sol = plan.solution;
        const shortName = sol.name.split(" — ")[0];
        const workflowShot = sol.workflowScreenshots[0];
        const dashboardShot = sol.dashboardScreenshots[0];

        return (
          <React.Fragment key={sol.id}>
            {/* Project Overview + Actual Workflow & Dashboard Screenshots */}
            <SlideFrame
              slideNum={overviewSlideNum}
              totalSlides={totalSlides}
              sectionNum="08"
              title={`Practical Demonstration · ${plan.projectNumber} ${shortName}`}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="neu-card rounded-[20px] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#656C84]">
                      Problem Solved
                    </p>
                    <p className="mt-1 text-[11.5px] leading-[1.5] text-[#2F3545]">
                      {sol.problem.summary}
                    </p>
                  </div>
                  <div className="neu-card-white rounded-[20px] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                      How {shortName} Works ({sol.category})
                    </p>
                    <p className="mt-1 text-[11.5px] leading-[1.5] text-[#171924]">
                      {sol.solution.summary}
                    </p>
                  </div>
                </div>

                {/* Large, Perfectly Aligned Side-by-Side Actual Screenshots */}
                <div className="grid grid-cols-2 gap-5">
                  <PrintMediaCard
                    primaryPath={workflowShot.primaryPath}
                    fallbackPath={workflowShot.fallbackPath}
                    stockFallbackUrl={workflowShot.stockFallbackUrl}
                    label={`${shortName} — Actual n8n Workflow`}
                    heightClass="h-[345px]"
                  />
                  <PrintMediaCard
                    primaryPath={dashboardShot.primaryPath}
                    fallbackPath={dashboardShot.fallbackPath}
                    stockFallbackUrl={dashboardShot.stockFallbackUrl}
                    label={dashboardShot.title}
                    heightClass="h-[345px]"
                  />
                </div>
              </div>
            </SlideFrame>

            {/* Clean 4-Nodes-Per-Slide Documentation Pages (Zero Overflow!) */}
            {plan.nodeChunks.map((chunk, chunkIdx) => {
              const nodeSlideNum = slideCursor++;
              return (
                <NodeChunkSlide
                  key={`${sol.id}-chunk-${chunkIdx}`}
                  solution={sol}
                  chunk={chunk}
                  chunkIdx={chunkIdx}
                  totalChunks={plan.nodeChunks.length}
                  slideNum={nodeSlideNum}
                  totalSlides={totalSlides}
                />
              );
            })}
          </React.Fragment>
        );
      })}

      {/* SECOND-TO-LAST SLIDE: 09. FUTURE OF WORKFLOW AUTOMATION (Includes 3D Prism Render!) */}
      <SlideFrame
        slideNum={totalSlides - 1}
        totalSlides={totalSlides}
        sectionNum="09"
        title="Future of Workflow Automation"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 grid grid-cols-2 gap-3.5">
              {SECTION_9_FUTURE.pillars.map((p, idx) => (
                <div key={p.title} className="neu-card rounded-[20px] p-4">
                  <span className="neu-num-gradient font-display text-[22px] font-extrabold leading-none">
                    0{idx + 1}.
                  </span>
                  <h3 className="mt-1.5 font-display text-[13px] font-bold text-[#171924]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-[#43495D]">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="col-span-5">
              <div className="neu-card-white overflow-hidden rounded-[24px] p-2.5">
                <div className="h-[255px] w-full overflow-hidden rounded-[18px] bg-white">
                  <EagerImg
                    sources={["/media/visuals/future-agent-prism.jpg"]}
                    alt="3D glass cube enclosing glowing purple sphere"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reference Slide 4 Closing Statement Card */}
          <div className="neu-statement-card mx-auto max-w-4xl rounded-[28px] px-10 py-7 text-center">
            <p className="font-display text-[18px] font-bold leading-[1.4] text-[#171924]">
              {SECTION_9_FUTURE.closingStatement}
            </p>
          </div>
        </div>
      </SlideFrame>

      {/* FINAL SLIDE: OPTIONAL APPENDIX */}
      <SlideFrame
        slideNum={totalSlides}
        totalSlides={totalSlides}
        sectionNum="APP"
        title="Optional Appendix — Technology Stack Reference"
        appendix
      >
        <div className="space-y-4">
          <p className="text-[12.5px] text-[#43495D]">
            Supporting technical reference separate from the 9 main presentation headings. Editable in{" "}
            <code className="font-mono text-[#5B3DF5]">src/content/tech-stack.ts</code>.
          </p>
          <div className="neu-card-white divide-y divide-[#ECEFF8] overflow-hidden rounded-[22px]">
            {TECH_STACK_ITEMS.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center gap-4 px-6 py-4 text-[12px]"
              >
                <div className="col-span-3 font-bold text-[#171924]">
                  {item.name}
                  <span className="block text-[10px] font-normal text-[#656C84]">
                    {item.category}
                  </span>
                </div>
                <div className="col-span-6 text-[#43495D]">{item.role}</div>
                <div className="col-span-3 text-right font-mono text-[10.5px] font-bold text-[#5B3DF5]">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideFrame>
    </div>
  );
}
