"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, X, Radio, Presentation } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { FinFlowLiveDemo } from "@/components/solutions/FinFlowLiveDemo";
import { SOLUTIONS } from "@/content/solutions";
import { cn } from "@/lib/utils";
import { EASE, GlassCard, Reveal } from "@/components/premium/motion";

/** Short, presentation-friendly copy for each project (full docs live on /projects/[slug]). */
const STORY: Record<
  string,
  {
    title: string;
    subtitle: string;
    summary: string;
    facts: string[];
    problems: string[];
    solutions: string[];
    steps: { label: string; line: string }[];
  }
> = {
  finflow: {
    title: "FinFlow",
    subtitle: "Smart Document & Accounting Automation",
    summary:
      "Drop in an invoice — n8n and Gemini AI read it, check the maths, block duplicates and update a live finance dashboard.",
    facts: ["50 n8n nodes", "Gemini AI extraction", "Duplicate guard"],
    problems: ["Invoices re-typed by hand", "Duplicate invoices slip through", "No live view of spending"],
    solutions: ["AI extracts vendor, date and total", "Maths checked, duplicates blocked", "Dashboard updates instantly"],
    steps: [
      { label: "Intake", line: "Upload or webhook" },
      { label: "Extract", line: "Gemini reads the file" },
      { label: "Validate", line: "Maths + duplicate check" },
      { label: "Store", line: "Saved to data tables" },
      { label: "Report", line: "Dashboard refreshes" },
    ],
  },
  opsflow: {
    title: "OpsFlow",
    subtitle: "Order & Inventory Automation",
    summary:
      "Every new order is validated, checked against live stock, invoiced and reported — without overselling.",
    facts: ["32 n8n nodes", "Live stock checks", "Automatic invoicing"],
    problems: ["Orders copied between sheets", "Out-of-stock items get sold", "Invoice maths done manually"],
    solutions: ["Orders validated on arrival", "Stock reserved only when available", "Invoices and reports generated"],
    steps: [
      { label: "Order", line: "Webhook receives it" },
      { label: "Validate", line: "Details + duplicates" },
      { label: "Stock", line: "Live inventory lookup" },
      { label: "Fulfil", line: "Reserve or hold" },
      { label: "Report", line: "Invoice + summary" },
    ],
  },
  mailflow: {
    title: "MailFlow",
    subtitle: "AI Email Triage & Human Approval",
    summary:
      "n8n and Gemini read every email, sort it, score its urgency and draft a reply — a person approves before anything is sent.",
    facts: ["28 n8n nodes", "7 email categories", "Human approval gate"],
    problems: ["Inbox read one email at a time", "Urgent emails get buried", "Replies written from scratch"],
    solutions: ["AI sorts and scores every email", "Urgent issues flagged first", "Drafts ready for approval"],
    steps: [
      { label: "Receive", line: "New email arrives" },
      { label: "Clean", line: "Strip noise, dedupe" },
      { label: "Classify", line: "Gemini sorts intent" },
      { label: "Prioritise", line: "Urgency + routing" },
      { label: "Approve", line: "Human signs off" },
    ],
  },
};

const shotLabel = (i: number, total: number) =>
  i < 2 ? `Part ${i + 1}` : i === total - 1 && total > 3 ? "Full map" : "Overview";

export function PracticalDemonstrationSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [shotIdx, setShotIdx] = useState(0);

  const solution = SOLUTIONS[activeIdx] ?? SOLUTIONS[0];
  const story = STORY[solution.id];
  const isLive = solution.mode === "live";
  const shots = solution.workflowScreenshots;
  const shot = shots[shotIdx] ?? shots[0];
  const dashboardShot = solution.dashboardScreenshots[0];

  const switchProject = (idx: number) => {
    setActiveIdx(idx);
    setShotIdx(0);
  };

  return (
    <SectionShell
      id="practical-demonstration"
      number="08"
      eyebrow="Main Presentation"
      title="Practical Demonstration"
      subtitle="Three real n8n projects — one running live, two as guided showcases."
    >
      {/* Project switcher */}
      <Reveal>
        <div className="flex justify-center">
          <div className="glass-strong inline-flex gap-1 rounded-full p-1.5">
            {SOLUTIONS.map((sol, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={sol.id}
                  type="button"
                  onClick={() => switchProject(idx)}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-7",
                    active ? "text-white" : "text-white/50 hover:text-white/80"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="project-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="btn-liquid btn-liquid-primary absolute inset-0 rounded-full"
                    />
                  )}
                  <span className="relative">{STORY[sol.id].title}</span>
                  {sol.mode === "live" && (
                    <span className="relative flex h-2 w-2">
                      <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={solution.id}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 space-y-6"
        >
          {/* Project hero */}
          <GlassCard strong className="rounded-[36px] p-8 sm:p-12">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-2xl">
                <span className={cn("chip", isLive && "!border-emerald-400/30 !text-emerald-300")}>
                  {isLive ? <Radio className="h-3.5 w-3.5" /> : <Presentation className="h-3.5 w-3.5" />}
                  {isLive ? "Live demo" : "Showcase"}
                </span>
                <h3 className="mt-6 font-display text-5xl font-extrabold tracking-[-0.045em] text-white sm:text-6xl">
                  {story.title}
                </h3>
                <p className="mt-2 font-serif text-2xl italic text-white/55">{story.subtitle}</p>
                <p className="mt-6 text-lg leading-relaxed text-white/70">{story.summary}</p>
              </div>
              <Link href={`/projects/${solution.id}`} className="btn-liquid shrink-0 px-6 py-3.5 text-sm">
                Full project page
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {story.facts.map((f) => (
                <div key={f} className="rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                  <p className="font-display text-lg font-bold text-white">{f}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Problem vs solution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <GlassCard className="rounded-[32px] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Before</p>
              <ul className="mt-5 space-y-4">
                {story.problems.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-base text-white/55">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                      <X className="h-3.5 w-3.5 text-[#ff8a73]" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="ring-glow rounded-[32px] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff8a73]">With {story.title}</p>
              <ul className="mt-5 space-y-4">
                {story.solutions.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-base font-medium text-white">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* How it works */}
          <GlassCard className="rounded-[32px] p-8 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">How it works</p>
            <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-3">
              <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-gradient-to-r from-[#ff6d5a]/60 via-[#ea4b71]/40 to-[#8b5cf6]/60 sm:block" />
              {story.steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
                  className="relative flex items-center gap-4 sm:flex-col sm:text-center"
                >
                  <span className="squircle squircle-hot relative h-12 w-12 shrink-0 font-mono text-sm font-bold text-white">
                    0{i + 1}
                  </span>
                  <div className="sm:mt-3">
                    <p className="font-display text-base font-bold text-white">{s.label}</p>
                    <p className="text-sm text-white/50">{s.line}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Workflow screenshot */}
          <GlassCard className="rounded-[32px] p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <p className="font-display text-lg font-bold text-white">The real n8n workflow</p>
              <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                {shots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setShotIdx(i)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                      i === shotIdx ? "bg-white text-[#ea4b71]" : "text-white/55 hover:text-white"
                    )}
                  >
                    {shotLabel(i, shots.length)}
                  </button>
                ))}
              </div>
            </div>
            {shot && (
              <MediaFrame
                primaryPath={shot.primaryPath}
                fallbackPath={shot.fallbackPath}
                title={`${story.title} · ${shotLabel(shotIdx, shots.length)}`}
                aspectClass="aspect-[16/9]"
              />
            )}
          </GlassCard>

          {/* Live demo or concept dashboard */}
          <div className="glass-strong ring-glow rounded-[36px] p-2.5 sm:p-3">
            <div className="flex items-center justify-between px-4 pb-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="rounded-full bg-white/[0.06] px-4 py-1 font-mono text-[11px] text-white/55">
                {story.title.toLowerCase()}.app
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {isLive ? "interactive" : "concept"}
              </span>
            </div>
            <div className="rounded-[28px] border border-white/[0.06] bg-[#07080f]/90 p-5 sm:p-8">
              {isLive ? (
                <FinFlowLiveDemo />
              ) : (
                dashboardShot && (
                  <MediaFrame
                    primaryPath={dashboardShot.primaryPath}
                    fallbackPath={dashboardShot.fallbackPath}
                    title={`${story.title} dashboard · concept preview`}
                    aspectClass="aspect-[16/9]"
                  />
                )
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}
