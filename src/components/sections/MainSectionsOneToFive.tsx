"use client";

import React, { useState } from "react";
import {
  Zap,
  SlidersHorizontal,
  GitBranch,
  PlayCircle,
  CheckCircle2,
  Cpu,
  ChevronDown,
  Workflow,
  Boxes,
  KeyRound,
  Plug,
  Activity,
  ShieldAlert,
  Braces,
  Database,
  Link2,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  SECTION_1_INTRO,
  SECTION_2_WORKFLOW,
  SECTION_3_HOW_N8N_WORKS,
  SECTION_4_COMPONENTS,
  SECTION_5_N8N_AND_AI,
} from "@/content/presentation-sections";
import { cn } from "@/lib/utils";

const WORKFLOW_STAGE_ICONS = [
  Zap,
  SlidersHorizontal,
  GitBranch,
  PlayCircle,
  CheckCircle2,
];

const COMPONENT_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Workflows: Workflow,
  Nodes: Boxes,
  Triggers: Zap,
  Actions: PlayCircle,
  Connections: Link2,
  Expressions: Braces,
  Conditions: GitBranch,
  "Data Handling": Database,
  Credentials: KeyRound,
  "APIs & Integrations": Plug,
  Executions: Activity,
  "Error Handling": ShieldAlert,
};

/* ============================================================================
   1. INTRODUCTION TO AUTOMATION
   Inspired by Reference Slide 3 (Central Matte 3D Sphere + 4 Orbital Nodes)
   ============================================================================ */
export function SectionOneIntroduction() {
  const [activeProblemIdx, setActiveProblemIdx] = useState(0);
  const problems = SECTION_1_INTRO.manualProblems;

  return (
    <SectionShell
      id="introduction-to-automation"
      number="01"
      eyebrow="Main Presentation"
      title="Introduction to Automation"
      subtitle={SECTION_1_INTRO.lead}
      surface="white"
      canvasVariant="center"
    >
      {/* Clean Two-Column Foundations Card */}
      <div className="neu-card-white grid grid-cols-1 gap-10 rounded-[30px] p-8 sm:p-10 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#5B3DF5]">
            Definition
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-[#1A1D26]">
            What Automation Means
          </h3>
          <p className="mt-3 text-base leading-[1.8] text-[#4C5264]">
            {SECTION_1_INTRO.whatIsAutomation}
          </p>
        </div>

        <div className="border-t border-[#E3E7F2] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <span className="inline-block rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#5B3DF5]">
            Business Need
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-[#1A1D26]">
            Why Businesses Need Automation
          </h3>
          <p className="mt-3 text-base leading-[1.8] text-[#4C5264]">
            {SECTION_1_INTRO.whyImportant}
          </p>
        </div>
      </div>

      {/* Reference Slide 3 Composition: Central 3D White Sphere + 4 Radial Nodes */}
      <div className="mt-20">
        <p className="mb-10 text-center font-display text-xl font-bold text-[#1A1D26]">
          Four Core Problems With Manual Processes
        </p>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Pair (01 & 03) */}
          <div className="space-y-10 lg:col-span-4 lg:text-right">
            {[0, 2].map((idx) => {
              const item = problems[idx];
              const active = activeProblemIdx === idx;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveProblemIdx(idx)}
                  className={cn(
                    "block w-full cursor-pointer rounded-2xl p-4 text-left transition-colors lg:text-right",
                    active ? "bg-white/75 shadow-sm" : "hover:bg-white/45"
                  )}
                >
                  <h4
                    className={cn(
                      "font-display text-lg font-bold",
                      active ? "text-[#5B3DF5]" : "text-[#1A1D26]"
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-[1.7] text-[#4C5264]">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Center Matte White 3D Sphere + 4 Orbital Interactive Circles */}
          <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center lg:col-span-4">
            {/* Soft central 3D white sphere */}
            <div className="matte-white-sphere h-44 w-44" />

            {/* 4 Positioned Circular Nodes (TL, TR, BL, BR) matching S/W/O/T slide */}
            {[
              { idx: 0, label: "01", pos: "left-2 top-3" },
              { idx: 1, label: "02", pos: "right-2 top-3" },
              { idx: 2, label: "03", pos: "left-2 bottom-3" },
              { idx: 3, label: "04", pos: "right-2 bottom-3" },
            ].map((orb) => {
              const active = activeProblemIdx === orb.idx;
              return (
                <button
                  key={orb.label}
                  type="button"
                  onClick={() => setActiveProblemIdx(orb.idx)}
                  aria-label={`Highlight ${problems[orb.idx].title}`}
                  className={cn(
                    "absolute flex h-20 w-20 cursor-pointer items-center justify-center rounded-full font-display text-lg font-bold transition-transform duration-200 hover:scale-105",
                    orb.pos,
                    active
                      ? "neu-purple-orb text-white"
                      : "neu-glass-circle text-[#1A1D26]"
                  )}
                >
                  {orb.label}
                </button>
              );
            })}
          </div>

          {/* Right Pair (02 & 04) */}
          <div className="space-y-10 lg:col-span-4 lg:text-left">
            {[1, 3].map((idx) => {
              const item = problems[idx];
              const active = activeProblemIdx === idx;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveProblemIdx(idx)}
                  className={cn(
                    "block w-full cursor-pointer rounded-2xl p-4 text-left transition-colors",
                    active ? "bg-white/75 shadow-sm" : "hover:bg-white/45"
                  )}
                >
                  <h4
                    className={cn(
                      "font-display text-lg font-bold",
                      active ? "text-[#5B3DF5]" : "text-[#1A1D26]"
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-[1.7] text-[#4C5264]">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sculpted Neumorphic Everyday Examples Strip */}
      <div className="mt-20">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#5B3DF5]">
          Everyday Examples of Automation
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SECTION_1_INTRO.basicExamples.map((ex, idx) => (
            <div
              key={ex.title}
              className="neu-card flex items-start gap-4 rounded-[24px] p-6"
            >
              <span className="neu-num-gradient shrink-0 font-display text-4xl font-extrabold">
                0{idx + 1}.
              </span>
              <div>
                <h4 className="font-display text-base font-bold text-[#1A1D26]">
                  {ex.title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4C5264]">
                  {ex.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   2. WORKFLOW AUTOMATION
   Inspired by Reference Slide 5 (Sculpted Vertical Pillar Cards 01–05)
   ============================================================================ */
export function SectionTwoWorkflowAutomation() {
  return (
    <SectionShell
      id="workflow-automation"
      number="02"
      eyebrow="Main Presentation"
      title="Workflow Automation"
      subtitle={SECTION_2_WORKFLOW.lead}
      surface="subtle"
      canvasVariant="right-arc"
    >
      {/* Clear Two-Column Explanation */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="neu-card-white rounded-[26px] p-8">
          <h3 className="font-display text-xl font-bold text-[#1A1D26]">
            What Is a Workflow?
          </h3>
          <p className="mt-3 text-base leading-[1.8] text-[#4C5264]">
            {SECTION_2_WORKFLOW.whatIsWorkflow}
          </p>
        </div>
        <div className="neu-card-white rounded-[26px] p-8">
          <h3 className="font-display text-xl font-bold text-[#1A1D26]">
            How Different Applications Communicate
          </h3>
          <p className="mt-3 text-base leading-[1.8] text-[#4C5264]">
            {SECTION_2_WORKFLOW.howAppsCommunicate}
          </p>
        </div>
      </div>

      {/* Reference Slide 5 Style: Sculpted Vertical Cards for Trigger -> Result */}
      <div className="mt-16">
        <p className="mb-8 text-center font-display text-xl font-bold text-[#1A1D26]">
          Trigger → Processing → Decision → Action → Result
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SECTION_2_WORKFLOW.pipelineStages.map((stage, idx) => {
            const Icon = WORKFLOW_STAGE_ICONS[idx] ?? Zap;
            return (
              <div
                key={stage.name}
                className="neu-card flex flex-col items-center justify-between rounded-[28px] px-5 py-8 text-center"
              >
                <div>
                  <span className="neu-num-gradient block font-display text-5xl font-extrabold leading-none">
                    0{stage.step}
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-[#1A1D26]">
                    {stage.name}
                  </h4>
                  <p className="mt-1 text-xs font-semibold text-[#5B3DF5]">
                    {stage.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4C5264]">
                    {stage.explanation}
                  </p>
                </div>

                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-[#1A1D26] shadow-sm">
                  <Icon className="h-6 w-6 stroke-[1.6]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sculpted Manual-to-Automated Transformation Table */}
      <div className="neu-card-white mt-16 overflow-hidden rounded-[28px]">
        <div className="border-b border-[#E5E9F3] px-8 py-5">
          <h3 className="font-display text-lg font-bold text-[#1A1D26]">
            From Manual Tasks to Automated Processes
          </h3>
        </div>
        <div className="divide-y divide-[#E8ECF5]">
          {SECTION_2_WORKFLOW.manualToAutomated.map((row) => (
            <div
              key={row.task}
              className="grid grid-cols-1 gap-6 px-8 py-6 md:grid-cols-12 md:items-center"
            >
              <div className="md:col-span-3">
                <p className="font-display text-base font-bold text-[#1A1D26]">
                  {row.task}
                </p>
              </div>
              <div className="md:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#70778C]">
                  Manual Way
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#4C5264]">
                  {row.before}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5B3DF5]">
                  Automated Workflow
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-[#1A1D26]">
                  {row.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   3. HOW DOES N8N WORK?
   3D Workflow Hub Render + Sculpted Horizontal Numbered Execution Cards
   ============================================================================ */
export function SectionThreeHowN8nWorks() {
  const [showAiBasics, setShowAiBasics] = useState(true);

  return (
    <SectionShell
      id="how-does-n8n-work"
      number="03"
      eyebrow="Main Presentation"
      title="How Does n8n Work?"
      subtitle={SECTION_3_HOW_N8N_WORKS.lead}
      surface="white"
      canvasVariant="left-arc"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Custom 3D n8n Workflow Hub Render */}
        <div className="lg:col-span-5">
          <div className="neu-card-white overflow-hidden rounded-[30px] p-3">
            <div className="overflow-hidden rounded-[22px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/visuals/n8n-hub-orb.jpg"
                alt="n8n central workflow hub connecting external services"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-[#70778C]">
            Central n8n orchestration hub connecting triggers, services, and APIs
          </p>
        </div>

        {/* 4 Sculpted Horizontal Cards (Slide 2 DNA) */}
        <div className="space-y-4 lg:col-span-7">
          {SECTION_3_HOW_N8N_WORKS.executionSteps.map((item) => (
            <div
              key={item.step}
              className="neu-card flex items-start gap-5 rounded-[24px] px-6 py-5"
            >
              <span className="neu-num-gradient shrink-0 font-display text-4xl font-extrabold leading-none">
                {item.step}.
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-[#1A1D26] sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-[1.7] text-[#4C5264]">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Concept Inside Section 3: How AI Systems Work With n8n */}
      <div className="neu-card-white mt-16 overflow-hidden rounded-[28px]">
        <button
          type="button"
          onClick={() => setShowAiBasics((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-8 py-6 text-left"
        >
          <div className="flex items-center gap-3.5">
            <span className="neu-purple-orb flex h-10 w-10 items-center justify-center rounded-full text-white">
              <Cpu className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5B3DF5]">
                Supporting Explanation
              </p>
              <h3 className="mt-0.5 font-display text-lg font-bold text-[#1A1D26]">
                {SECTION_3_HOW_N8N_WORKS.aiBasics.title}
              </h3>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-[#5B3DF5] transition-transform duration-200",
              showAiBasics ? "rotate-180" : ""
            )}
          />
        </button>

        {showAiBasics && (
          <div className="border-t border-[#E6EAF4] px-8 py-7">
            <p className="max-w-3xl text-base leading-[1.75] text-[#4C5264]">
              {SECTION_3_HOW_N8N_WORKS.aiBasics.summary}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SECTION_3_HOW_N8N_WORKS.aiBasics.components.map((comp, idx) => (
                <div
                  key={comp.name}
                  className="neu-card rounded-[22px] p-5"
                >
                  <span className="neu-num-gradient font-display text-3xl font-extrabold">
                    0{idx + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-bold text-[#1A1D26]">
                    {comp.name}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C5264]">
                    {comp.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   4. IMPORTANT COMPONENTS OF N8N
   Inspired Directly by Reference Slide 5 ("Strategic Initiatives" 4-Column Cards)
   ============================================================================ */
export function SectionFourComponents() {
  const [activeGroupId, setActiveGroupId] = useState(
    SECTION_4_COMPONENTS[0].id
  );
  const activeGroup =
    SECTION_4_COMPONENTS.find((g) => g.id === activeGroupId) ??
    SECTION_4_COMPONENTS[0];

  return (
    <SectionShell
      id="important-components"
      number="04"
      eyebrow="Main Presentation"
      title="Important Components of n8n"
      subtitle="Twelve core technical building blocks organized into three clean slide groups—four spacious components at a time."
      surface="subtle"
      canvasVariant="right-arc"
    >
      {/* Centered Neumorphic Group Switcher Pills */}
      <div className="flex flex-wrap justify-center gap-4">
        {SECTION_4_COMPONENTS.map((group, idx) => {
          const active = group.id === activeGroup.id;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={cn(
                "cursor-pointer rounded-full px-6 py-3 text-sm font-bold transition-all",
                active
                  ? "neu-purple-orb text-white"
                  : "neu-card text-[#1A1D26] hover:text-[#5B3DF5]"
              )}
            >
              0{idx + 1} · {group.groupTitle}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-[#4C5264]">
        {activeGroup.groupDescription}
      </p>

      {/* Reference Slide 5 Composition: 4 Sculpted Neumorphic Vertical Cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {activeGroup.items.map((item, idx) => {
          const Icon = COMPONENT_ICON_MAP[item.name] ?? Boxes;
          return (
            <article
              key={item.name}
              className="neu-card flex flex-col justify-between rounded-[28px] p-7 text-center"
            >
              <div>
                <span className="neu-num-gradient block font-display text-5xl font-extrabold leading-none">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-[#1A1D26]">
                  {item.name}
                </h3>

                <div className="mx-auto my-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-[#1A1D26] shadow-sm">
                  <Icon className="h-6 w-6 stroke-[1.6]" />
                </div>

                <p className="text-left text-sm leading-[1.7] text-[#374151]">
                  {item.whatItDoes}
                </p>
                <p className="mt-2.5 text-left text-xs leading-relaxed text-[#60677A]">
                  <strong className="text-[#1A1D26]">Why it matters: </strong>
                  {item.whyItMatters}
                </p>
              </div>

              <div className="mt-5 border-t border-white/80 pt-4 text-left">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#5B3DF5]">
                  Example
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#4C5264]">
                  {item.example}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   5. N8N AND AI
   Sculpted Numbered Tiles + 3D AI Neural Core + Clean Comparison Slide
   ============================================================================ */
export function SectionFiveN8nAndAI() {
  return (
    <SectionShell
      id="n8n-and-ai"
      number="05"
      eyebrow="Main Presentation"
      title="n8n and AI"
      subtitle={SECTION_5_N8N_AND_AI.lead}
      surface="white"
      canvasVariant="center"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: 4 Sculpted Horizontal Numbered Cards (Slide 2 DNA) */}
        <div className="space-y-4 lg:col-span-7">
          {SECTION_5_N8N_AND_AI.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="neu-card flex items-start gap-5 rounded-[24px] px-6 py-5"
            >
              <span className="neu-num-gradient shrink-0 font-display text-4xl font-extrabold leading-none">
                0{idx + 1}.
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-[#1A1D26] sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-sm leading-[1.7] text-[#4C5264]">
                  {pillar.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Custom 3D AI Neural Core Studio Render */}
        <div className="lg:col-span-5">
          <div className="neu-card-white overflow-hidden rounded-[30px] p-3">
            <div className="overflow-hidden rounded-[22px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/visuals/ai-neural-core.jpg"
                alt="3D frosted purple glass AI neural core"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-[#70778C]">
            AI models interpret unstructured text, documents, and context inside workflows
          </p>
        </div>
      </div>

      {/* Sculpted Traditional vs AI-Powered Comparison Table */}
      <div className="neu-card-white mt-16 overflow-hidden rounded-[28px]">
        <div className="border-b border-[#E5E9F3] px-8 py-5">
          <h3 className="font-display text-lg font-bold text-[#1A1D26]">
            Traditional Automation vs. AI-Powered Automation
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E8ECF5] text-xs font-semibold uppercase tracking-wider text-[#70778C]">
                <th className="w-[24%] px-8 py-4">Dimension</th>
                <th className="w-[38%] px-6 py-4">Traditional Automation</th>
                <th className="w-[38%] bg-[#F4F1FF] px-6 py-4 text-[#5B3DF5]">
                  AI-Powered Automation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF0F7] text-sm sm:text-base">
              {SECTION_5_N8N_AND_AI.comparison.map((row) => (
                <tr key={row.aspect}>
                  <td className="px-8 py-4 font-bold text-[#1A1D26]">
                    {row.aspect}
                  </td>
                  <td className="px-6 py-4 text-[#4C5264]">
                    {row.traditional}
                  </td>
                  <td className="bg-[#F9F7FF] px-6 py-4 font-medium text-[#1A1D26]">
                    <span className="inline-flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#5B3DF5]" />
                      <span>{row.aiPowered}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}
