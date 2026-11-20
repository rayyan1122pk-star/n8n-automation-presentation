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
                  ? "neu-card-white ring-2 ring-[#5B3DF5]/35"
                  : "neu-card opacity-95 hover:opacity-100"
              )}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="neu-num-gradient font-display text-3xl font-extrabold leading-none">
                    0{idx + 1}.
                  </span>
                  {live ? (
                    <span className="neu-purple-orb inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white">
                      <Radio className="h-3 w-3 animate-pulse" />
                      LIVE DEMONSTRATION
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[#4C5264] shadow-sm">
                      <Presentation className="h-3 w-3 text-[#5B3DF5]" />
                      PROJECT SHOWCASE
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-[#1A1D26] sm:text-xl">
                  {sol.name.split(" — ")[0]}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-[#5B3DF5]">
                  {sol.name.split(" — ")[1] || sol.category}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4C5264]">
                  {sol.shortDescription}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/80 pt-3 text-xs font-semibold">
                <span className={active ? "text-[#5B3DF5]" : "text-[#70778C]"}>
                  {active ? "Currently Viewing" : live ? "Open Live Demo" : "View Showcase"}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#5B3DF5]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* ================================================================
          SPACIOUS SINGLE-PROJECT PRESENTATION VIEW
          ================================================================ */}
      <div className="neu-card-white mt-12 space-y-14 rounded-[34px] p-7 sm:p-12">
        {/* 1. Project Header + Mode Badge + Learn More Link */}
        <div className="border-b border-[#ECEBF2] pb-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                  Project 0{activeProjectIdx + 1}
                </span>
                {isLive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    PRIMARY LIVE DEMONSTRATION · LOCAL n8n CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#FAF9FE] px-3 py-1 text-xs font-semibold text-[#5B21B6]">
                    <Presentation className="h-3.5 w-3.5" />
                    PROJECT SHOWCASE · PRESENTATION ONLY (NON-LIVE)
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-3xl font-bold text-[#4C1D95] sm:text-4xl">
                {solution.name}
              </h3>
            </div>

            <Link
              href={`/projects/${solution.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#FAF9FE] px-4 py-2.5 text-sm font-semibold text-[#5B21B6] transition-colors hover:border-[#7C3AED] hover:bg-[#F5F3FF]"
            >
              <span>Learn More</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 max-w-4xl text-base leading-[1.8] text-[#4B5563] sm:text-lg">
            {solution.fullDescription}
          </p>

          {/* Problem & Solution */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h4 className="font-display text-lg font-bold text-[#18181B]">
                The Business Problem It Solves
              </h4>
              <p className="mt-2 text-base leading-[1.75] text-[#4B5563]">
                {solution.problem.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {solution.problem.painPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-sm text-[#4B5563]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9CA3AF]" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#ECEBF2] bg-[#FAF9FE] p-7">
              <h4 className="font-display text-lg font-bold text-[#4C1D95]">
                How the Automation Works
              </h4>
              <p className="mt-2 text-base leading-[1.75] text-[#374151]">
                {solution.solution.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {solution.solution.outcomes.map((out) => (
                  <li
                    key={out}
                    className="flex items-start gap-2.5 text-sm text-[#18181B]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
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
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                  Interactive Live Workspace
                </p>
                <h4 className="mt-1 font-display text-2xl font-bold text-[#18181B]">
                  Live FinFlow Document Upload, Vendor Workflow &amp; Accounting CRM
                </h4>
              </div>
            </div>
            <FinFlowLiveDemo />
          </div>
        )}

        {/* 3. High-Level Process Flow & Important Automation Steps */}
        <div className={cn(isLive && "border-t border-[#ECEBF2] pt-12")}>
          <h4 className="font-display text-xl font-bold text-[#18181B]">
            How the Workflow Operates — Key Automation Steps
          </h4>
          <p className="mt-1.5 text-sm text-[#6B7280]">
            Clear stage-by-stage breakdown of how information moves through {solution.name.split(" — ")[0]}.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
            {solution.highLevelDataFlow.map((item, idx) => (
              <div key={item.stage} className="flex items-center gap-2">
                <div className="w-full rounded-xl border border-[#ECEBF2] bg-[#FAF9FE] px-4 py-4">
                  <span className="font-mono text-xs font-semibold text-[#7C3AED]">
                    Stage {item.stage}
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-[#18181B]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280]">{item.payload}</p>
                </div>
                {idx < solution.highLevelDataFlow.length - 1 && (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-[#7C3AED] md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {solution.functionalSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-[#ECEBF2] bg-white p-5"
              >
                <span className="font-mono text-xs font-bold text-[#7C3AED]">
                  STEP {s.step}
                </span>
                <h5 className="mt-1 font-display text-base font-bold text-[#18181B]">
                  {s.title}
                </h5>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Large Unobstructed Actual n8n Workflow Screenshots (Zoomed Part 1 / Part 2 / Full) */}
        <div className="border-t border-[#ECEBF2] pt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#F5F3FF] px-3 py-1 text-xs font-semibold text-[#6D28D9]">
                Actual Local n8n Capture · Zoomed for Node Readability
              </span>
              <h4 className="mt-2 font-display text-2xl font-bold text-[#18181B]">
                Actual n8n Workflow Architecture
              </h4>
              <p className="mt-1 text-sm text-[#6B7280]">
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
                        ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                        : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#C4B5FD] hover:text-[#5B21B6]"
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
          <div className="border-t border-[#ECEBF2] pt-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center rounded-full border border-[#DDD6FE] bg-[#FAF9FE] px-3 py-1 text-xs font-semibold text-[#5B21B6]">
                  Static Concept Preview · Presentation Only
                </span>
                <h4 className="mt-2 font-display text-2xl font-bold text-[#18181B]">
                  {solution.name.split(" — ")[0]} Dashboard Concept Visual
                </h4>
                <p className="mt-1 text-sm text-[#6B7280]">
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
        <div className="border-t border-[#ECEBF2] pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h4 className="font-display text-2xl font-bold text-[#4C1D95]">
                Key n8n Nodes Explained
              </h4>
              <p className="mt-1.5 max-w-2xl text-base text-[#4B5563]">
                Inspect the actual n8n nodes configured inside {solution.name.split(" — ")[0]}—their role, input/output mapping, and parameters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedNodeIdx((i) => Math.max(0, i - 1))}
                disabled={selectedNodeIdx === 0}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#374151] transition-colors hover:border-[#C4B5FD] hover:text-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-40"
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
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-[#7C3AED] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
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
                        ? "border-[#7C3AED] bg-[#F5F3FF] text-[#4C1D95]"
                        : "border-[#ECEBF2] bg-white text-[#374151] hover:border-[#D1D5DB] hover:bg-[#FAFAFC]"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 font-mono text-xs font-bold",
                        selected ? "text-[#7C3AED]" : "text-[#9CA3AF]"
                      )}
                    >
                      {String(node.sequence).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">
                        {node.nodeName}
                      </p>
                      <p className="mt-0.5 text-xs text-[#6B7280]">
                        {node.category}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] p-7 sm:p-8 lg:col-span-8">
              <div className="border-b border-[#E5E7EB] pb-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-md bg-[#7C3AED] px-2.5 py-1 font-mono text-xs font-semibold text-white">
                    Node {String(activeNode.sequence).padStart(2, "0")} of{" "}
                    {String(nodes.length).padStart(2, "0")}
                  </span>
                  <span className="rounded-md bg-[#F5F3FF] px-2.5 py-1 text-xs font-semibold text-[#6D28D9]">
                    {activeNode.category}
                  </span>
                </div>
                <h5 className="mt-3 font-display text-2xl font-bold text-[#18181B]">
                  {activeNode.nodeName}
                </h5>
                <p className="mt-1 font-mono text-xs text-[#6B7280]">
                  Node Type: {activeNode.nodeType}
                </p>
              </div>

              <div className="mt-6 space-y-5 text-sm sm:text-base">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">
                    Role &amp; Function
                  </p>
                  <p className="mt-1.5 leading-relaxed text-[#18181B]">
                    {activeNode.whatIsIt} {activeNode.whatDoesItDo}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">
                    Why It Is Used
                  </p>
                  <p className="mt-1.5 leading-relaxed text-[#4B5563]">
                    {activeNode.whyUsed}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      Input Received
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">
                      {activeNode.inputData}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#DDD6FE] bg-[#FAF9FE] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6D28D9]">
                      Output Generated
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#18181B]">
                      {activeNode.outputData}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">
                      Connects Next To
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#18181B]">
                      {activeNode.nextConnection}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#7C3AED]" />
                </div>

                {activeNode.keyConfig.length > 0 && (
                  <div className="border-t border-[#E5E7EB] pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                      <Sliders className="h-3.5 w-3.5 text-[#7C3AED]" />
                      <span>Verified Configuration Highlights</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-[#4B5563]">
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
        <div className="border-t border-[#ECEBF2] pt-12">
          <div className="rounded-2xl border border-[#DDD6FE] bg-[#FAF9FE] p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
              <Sparkles className="h-4 w-4" />
              <span>Expected Business Benefits</span>
            </div>
            <h4 className="mt-2 font-display text-xl font-bold text-[#18181B]">
              Why {solution.name.split(" — ")[0]} Delivers Operational Value
            </h4>
            <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
              {solution.expectedBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-2.5 rounded-xl border border-[#ECEBF2] bg-white p-4 text-sm text-[#18181B]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. Collapsible Technical Deep Dive + Dedicated Learn More CTA */}
        <div className="border-t border-[#ECEBF2] pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowTechnicalDetails((v) => !v)}
              className="flex flex-1 cursor-pointer items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] px-6 py-4 text-left transition-colors hover:border-[#C4B5FD]"
            >
              <div>
                <p className="font-display text-base font-bold text-[#18181B]">
                  Technical Deep Dive: Branching, APIs &amp; Error Handling
                </p>
                <p className="mt-0.5 text-sm text-[#6B7280]">
                  Expand for architecture Q&amp;A or open the full Learn More page.
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[#7C3AED] transition-transform duration-200",
                  showTechnicalDetails && "rotate-180"
                )}
              />
            </button>

            <Link
              href={`/projects/${solution.id}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-[#6D28D9]"
            >
              <span>Open Full {solution.name.split(" — ")[0]} Page</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          {showTechnicalDetails && (
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <h5 className="font-display text-base font-bold text-[#4C1D95]">
                  {solution.technicalDeepDive.conditionalBranching.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                  {solution.technicalDeepDive.conditionalBranching.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.conditionalBranching.branches.map((b) => (
                    <div key={b.condition} className="rounded-xl bg-[#FAFAFC] p-3 text-xs">
                      <p className="font-mono font-semibold text-[#6D28D9]">{b.condition}</p>
                      <p className="mt-1 text-[#374151]">{b.path}</p>
                      <p className="mt-1 text-[#6B7280]">{b.outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <h5 className="font-display text-base font-bold text-[#4C1D95]">
                  {solution.technicalDeepDive.apisAndIntegrations.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                  {solution.technicalDeepDive.apisAndIntegrations.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.apisAndIntegrations.connections.map((c) => (
                    <div key={c.service} className="rounded-xl bg-[#FAFAFC] p-3 text-xs">
                      <p className="font-semibold text-[#18181B]">
                        {c.service}{" "}
                        <span className="font-mono font-normal text-[#7C3AED]">({c.protocol})</span>
                      </p>
                      <p className="mt-1 text-[#6B7280]">{c.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <h5 className="font-display text-base font-bold text-[#4C1D95]">
                  {solution.technicalDeepDive.errorHandling.title}
                </h5>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6B7280]">
                  {solution.technicalDeepDive.errorHandling.summary}
                </p>
                <div className="mt-4 space-y-3">
                  {solution.technicalDeepDive.errorHandling.safeguards.map((s) => (
                    <div key={s.failureMode} className="rounded-xl bg-[#FAFAFC] p-3 text-xs">
                      <p className="font-semibold text-[#18181B]">{s.failureMode}</p>
                      <p className="mt-1 text-[#6B7280]">{s.handling}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
