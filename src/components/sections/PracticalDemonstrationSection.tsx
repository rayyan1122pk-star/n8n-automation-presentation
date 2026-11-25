"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sliders,
  Radio,
  Presentation,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { FinFlowLiveDemo } from "@/components/solutions/FinFlowLiveDemo";
import { SOLUTIONS } from "@/content/solutions";
import { cn } from "@/lib/utils";

export function PracticalDemonstrationSection() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(0);
  const [workflowShotIdx, setWorkflowShotIdx] = useState(0);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const solution = SOLUTIONS[activeProjectIdx] ?? SOLUTIONS[0];
  const isLive = solution.mode === "live";
  const nodes = solution.nodes;
  const activeNode = nodes[selectedNodeIdx] ?? nodes[0];
  const activeWorkflowShot =
    solution.workflowScreenshots[workflowShotIdx] ??
    solution.workflowScreenshots[0];
  const activeDashboardShot = solution.dashboardScreenshots[0];

  const switchProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setSelectedNodeIdx(0);
    setWorkflowShotIdx(0);
    setShowTechnicalDetails(false);
  };

  return (
    <SectionShell
      id="practical-demonstration"
      number="08"
      eyebrow="Main Presentation"
      title="Practical Demonstration"
      subtitle="FinFlow is our primary LIVE DEMONSTRATION connected to local n8n (with real invoice upload, live Vendor Workflow execution, and persistent CRM analytics), followed by OpsFlow and MailFlow as supporting Project Showcases."
      surface="subtle"
      canvasVariant="minimal"
    >
      {/* Three-Project Selector Bar — Sculpted Neumorphic Cards with FinFlow Prominent */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {SOLUTIONS.map((sol, idx) => {
          const active = idx === activeProjectIdx;
          const live = sol.mode === "live";
          return (
            <button
              key={sol.id}
              type="button"
              onClick={() => switchProject(idx)}
              className={cn(
                "flex cursor-pointer flex-col justify-between rounded-[26px] p-6 text-left transition-all duration-200 hover:-translate-y-0.5",
                live ? "md:col-span-5" : "md:col-span-3",
                idx === 1 && "md:col-span-3",
                idx === 2 && "md:col-span-4",
                active
                  ? "glass-strong ring-2 ring-[#5B3DF5]/35"
                  : "glass opacity-95 hover:opacity-100"
              )}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="num-gradient font-display text-3xl font-extrabold leading-none">
                    0{idx + 1}.
                  </span>
                  {live ? (
                    <span className="btn-liquid btn-liquid-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white">
                      <Radio className="h-3 w-3 animate-pulse" />
                      LIVE DEMONSTRATION
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2.5 py-1 text-[11px] font-semibold text-white/65 shadow-sm">
                      <Presentation className="h-3 w-3 text-[#ff8a73]" />
                      PROJECT SHOWCASE
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                  {sol.name.split(" — ")[0]}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-[#ff8a73]">
                  {sol.name.split(" — ")[1] || sol.category}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  {sol.shortDescription}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/80 pt-3 text-xs font-semibold">
                <span className={active ? "text-[#ff8a73]" : "text-white/50"}>
                  {active ? "Currently Viewing" : live ? "Open Live Demo" : "View Showcase"}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#ff8a73]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* ================================================================
          SPACIOUS SINGLE-PROJECT PRESENTATION VIEW
          ================================================================ */}
      <div className="glass-strong ring-glow mt-14 rounded-[40px] p-2.5 sm:p-3">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="rounded-full bg-white/[0.06] px-4 py-1 font-mono text-[11px] text-white/55">
          {solution.name.split(" — ")[0].toLowerCase()}.app · {isLive ? "live" : "showcase"}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          <span className={isLive ? "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" : "h-1.5 w-1.5 rounded-full bg-white/30"} />
          {isLive ? "n8n connected" : "preview"}
        </span>
      </div>
      <div className="space-y-14 rounded-[32px] border border-white/[0.06] bg-[#07080f]/85 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-12">
        {/* 1. Project Header + Mode Badge + Learn More Link */}
        <div className="border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a73]">
                  Project 0{activeProjectIdx + 1}
                </span>
                {isLive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    PRIMARY LIVE DEMONSTRATION · LOCAL n8n CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6d5a]/25 bg-white/[0.035] px-3 py-1 text-xs font-semibold text-[#ffb4a6]">
                    <Presentation className="h-3.5 w-3.5" />
                    PROJECT SHOWCASE · PRESENTATION ONLY (NON-LIVE)
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                {solution.name}
              </h3>
            </div>

            <Link
              href={`/projects/${solution.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#ff6d5a]/25 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-[#ffb4a6] transition-colors hover:border-[#ff6d5a] hover:bg-[#ff6d5a]/10"
            >
              <span>Learn More</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 max-w-4xl text-base leading-[1.8] text-white/65 sm:text-lg">
            {solution.fullDescription}
          </p>

          {/* Problem & Solution */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                The Business Problem It Solves
              </h4>
              <p className="mt-2 text-base leading-[1.75] text-white/65">
                {solution.problem.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {solution.problem.painPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-sm text-white/65"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
              <h4 className="font-display text-lg font-bold text-white">
                How the Automation Works
              </h4>
              <p className="mt-2 text-base leading-[1.75] text-white/75">
                {solution.solution.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {solution.solution.outcomes.map((out) => (
                  <li
                    key={out}
                    className="flex items-start gap-2.5 text-sm text-white"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a73]" />
                    <span className="leading-relaxed">{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. FINFLOW LIVE INTERACTIVE APPLICATION (ONLY FOR FINFLOW!) */}
        {isLive && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a73]">
                  Interactive Live Workspace
                </p>
                <h4 className="mt-1 font-display text-2xl font-bold text-white">
                  Live FinFlow Document Upload, Vendor Workflow &amp; Accounting CRM
                </h4>
              </div>
            </div>
            <FinFlowLiveDemo />
          </div>
        )}

        {/* 3. High-Level Process Flow & Important Automation Steps */}
        <div className={cn(isLive && "border-t border-white/10 pt-12")}>
          <h4 className="font-display text-xl font-bold text-white">
            How the Workflow Operates — Key Automation Steps
          </h4>
          <p className="mt-1.5 text-sm text-white/50">
            Clear stage-by-stage breakdown of how information moves through {solution.name.split(" — ")[0]}.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
            {solution.highLevelDataFlow.map((item, idx) => (
              <div key={item.stage} className="flex items-center gap-2">
                <div className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-4">
                  <span className="font-mono text-xs font-semibold text-[#ff8a73]">
                    Stage {item.stage}
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-white/50">{item.payload}</p>
                </div>
                {idx < solution.highLevelDataFlow.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#ff8a73] md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {solution.functionalSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="font-mono text-xs font-bold text-[#ff8a73]">
                  STEP {s.step}
                </span>
                <h5 className="mt-1 font-display text-base font-bold text-white">
                  {s.title}
                </h5>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Large Unobstructed Actual n8n Workflow Screenshots (Zoomed Part 1 / Part 2 / Full) */}
        <div className="border-t border-white/10 pt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#ff6d5a]/10 px-3 py-1 text-xs font-semibold text-[#ff8a73]">
                Actual Local n8n Capture · Zoomed for Node Readability
              </span>
              <h4 className="mt-2 font-display text-2xl font-bold text-white">
                Actual n8n Workflow Architecture
              </h4>
              <p className="mt-1 text-sm text-white/50">
                Switch between Part 1 and Part 2 close-ups so every node name is clearly visible (click any screenshot to inspect full-screen).
              </p>
            </div>

            {solution.workflowScreenshots.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {solution.workflowScreenshots.map((shot, idx) => (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setWorkflowShotIdx(idx)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                      workflowShotIdx === idx
                        ? "border-[#ff6d5a] bg-[#ff5a6e] text-white"
                        : "border-white/10 bg-white/[0.04] text-white/65 hover:border-[#ff6d5a]/40 hover:text-[#ffb4a6]"
                    )}
                  >
                    {shot.tag ?? `View ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <MediaFrame
            primaryPath={activeWorkflowShot.primaryPath}
            fallbackPath={activeWorkflowShot.fallbackPath}
            title={activeWorkflowShot.title}
            caption={activeWorkflowShot.caption}
            aspectClass="aspect-[16/9]"
          />
        </div>

        {/* 5. Dashboard Concept Preview (For OpsFlow & MailFlow Presentation Showcases) */}
        {!isLive && activeDashboardShot && (
          <div className="border-t border-white/10 pt-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center rounded-full border border-[#ff6d5a]/25 bg-white/[0.035] px-3 py-1 text-xs font-semibold text-[#ffb4a6]">
                  Static Concept Preview · Presentation Only
                </span>
                <h4 className="mt-2 font-display text-2xl font-bold text-white">
                  {solution.name.split(" — ")[0]} Dashboard Concept Visual
                </h4>
                <p className="mt-1 text-sm text-white/50">
                  Static visual concept illustrating the dashboard experience powered by this workflow (not a live application).
                </p>
              </div>
            </div>

            <MediaFrame
              primaryPath={activeDashboardShot.primaryPath}
              fallbackPath={activeDashboardShot.fallbackPath}
              title={activeDashboardShot.title}
              caption={activeDashboardShot.caption}
              aspectClass="aspect-[16/9]"
            />
          </div>
        )}

        {/* 6. Interactive Relevant n8n Nodes Explanation */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h4 className="font-display text-2xl font-bold text-white">
                Key n8n Nodes Explained
              </h4>
              <p className="mt-1.5 max-w-2xl text-base text-white/65">
                Inspect the actual n8n nodes configured inside {solution.name.split(" — ")[0]}—their role, input/output mapping, and parameters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedNodeIdx((i) => Math.max(0, i - 1))}
                disabled={selectedNodeIdx === 0}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/75 transition-colors hover:border-[#ff6d5a]/40 hover:text-[#ff8a73] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedNodeIdx((i) => Math.min(nodes.length - 1, i + 1))
                }
                disabled={selectedNodeIdx === nodes.length - 1}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-[#ff5a6e] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ea4b71] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                Key Workflow Nodes ({nodes.length})
              </p>
              {nodes.map((node, idx) => {
                const selected = idx === selectedNodeIdx;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeIdx(idx)}
                    className={cn(
                      "flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
                      selected
                        ? "border-[#ff6d5a] bg-[#ff6d5a]/10 text-white"
                        : "border-white/10 bg-white/[0.04] text-white/75 hover:border-white/15 hover:bg-white/[0.035]"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 font-mono text-xs font-bold",
                        selected ? "text-[#ff8a73]" : "text-white/35"
                      )}
                    >
                      {String(node.sequence).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">
                        {node.nodeName}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {node.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 sm:p-8 lg:col-span-8">
              <div className="border-b border-white/10 pb-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md bg-[#ff5a6e] px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    Node {String(activeNode.sequence).padStart(2, "0")} of{" "}
                    {String(nodes.length).padStart(2, "0")}
                  </span>
                  <span className="rounded-md bg-[#ff6d5a]/10 px-2.5 py-1 text-xs font-semibold text-[#ff8a73]">
                    {activeNode.category}
                  </span>
                </div>
                <h5 className="mt-3 font-display text-2xl font-bold text-white">
                  {activeNode.nodeName}
                </h5>
                <p className="mt-1 font-mono text-xs text-white/50">
                  Node Type: {activeNode.nodeType}
                </p>
              </div>

              <div className="mt-6 space-y-5 text-sm sm:text-base">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a73]">
                    Role &amp; Function
                  </p>
                  <p className="mt-1.5 leading-relaxed text-white">
                    {activeNode.whatIsIt} {activeNode.whatDoesItDo}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a73]">
                    Why It Is Used
                  </p>
                  <p className="mt-1.5 leading-relaxed text-white/65">
                    {activeNode.whyUsed}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Input Received
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      {activeNode.inputData}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ff6d5a]/25 bg-white/[0.035] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a73]">
                      Output Generated
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white">
                      {activeNode.outputData}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8a73]">
                      Connects Next To
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {activeNode.nextConnection}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff8a73]" />
                </div>

                {activeNode.keyConfig.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                      <Sliders className="h-3.5 w-3.5 text-[#ff8a73]" />
                      <span>Verified Configuration Highlights</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-white/65">
                      {activeNode.keyConfig.map((cfg, i) => (
                        <li key={i}>• {cfg}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 7. Expected Business Benefits */}
        <div className="border-t border-white/10 pt-12">
          <div className="rounded-2xl border border-[#ff6d5a]/25 bg-white/[0.035] p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#ff8a73]">
              <Sparkles className="h-4 w-4" />
              <span>Expected Business Benefits</span>
            </div>
            <h4 className="mt-2 font-display text-xl font-bold text-white">
              Why {solution.name.split(" — ")[0]} Delivers Operational Value
            </h4>
            <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {solution.expectedBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a73]" />
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. Collapsible Technical Deep Dive + Dedicated Learn More CTA */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails((v) => !v)}
              className="flex flex-1 cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-4 text-left transition-colors hover:border-[#ff6d5a]/40"
            >
              <div>
                <p className="font-display text-base font-bold text-white">
                  Technical Deep Dive: Branching, APIs &amp; Error Handling
                </p>
                <p className="mt-0.5 text-sm text-white/50">
                  Expand for architecture Q&amp;A or open the full Learn More page.
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[#ff8a73] transition-transform duration-200",
                  showTechnicalDetails && "rotate-180"
                )}
              />
            </button>

            <Link
              href={`/projects/${solution.id}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#ff5a6e] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#ea4b71]"
            >
              <span>Open Full {solution.name.split(" — ")[0]} Page</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          {showTechnicalDetails && (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h5 className="font-display text-base font-bold text-white">
                  {solution.technicalDeepDive.conditionalBranching.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  {solution.technicalDeepDive.conditionalBranching.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.conditionalBranching.branches.map((b) => (
                    <div key={b.condition} className="rounded-xl bg-white/[0.035] p-3 text-xs">
                      <p className="font-mono font-semibold text-[#ff8a73]">{b.condition}</p>
                      <p className="mt-1 text-white/75">{b.path}</p>
                      <p className="mt-1 text-white/50">{b.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h5 className="font-display text-base font-bold text-white">
                  {solution.technicalDeepDive.apisAndIntegrations.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  {solution.technicalDeepDive.apisAndIntegrations.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.apisAndIntegrations.connections.map((c) => (
                    <div key={c.service} className="rounded-xl bg-white/[0.035] p-3 text-xs">
                      <p className="font-semibold text-white">
                        {c.service}{" "}
                        <span className="font-mono font-normal text-[#ff8a73]">({c.protocol})</span>
                      </p>
                      <p className="mt-1 text-white/50">{c.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h5 className="font-display text-base font-bold text-white">
                  {solution.technicalDeepDive.errorHandling.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  {solution.technicalDeepDive.errorHandling.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.errorHandling.safeguards.map((s) => (
                    <div key={s.failureMode} className="rounded-xl bg-white/[0.035] p-3 text-xs">
                      <p className="font-semibold text-white">{s.failureMode}</p>
                      <p className="mt-1 text-white/50">{s.handling}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </SectionShell>
  );
}
