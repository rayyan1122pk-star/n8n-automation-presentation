"use client";

import React from "react";
import { Compass, ChevronDown, ChevronUp } from "lucide-react";
import { BeforeAfterAIShowcase } from "@/components/sections/BeforeAfterAIShowcase";
import { INTERACTIVE_WORKFLOW_STAGES, WORKFLOW_CONCEPTS } from "@/content/how-it-works";
import { AUTOMATION_COMPONENTS } from "@/content/fundamentals";
import { TECH_STACK_ITEMS } from "@/content/tech-stack";
import { SOLUTIONS } from "@/content/solutions";
import type { AdditionalMaterialLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

interface ExploreFurtherSectionProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  activeTab: AdditionalMaterialLink["tabKey"];
  onTabChange: (tab: AdditionalMaterialLink["tabKey"]) => void;
  presentationMode: boolean;
}

const TABS: { key: AdditionalMaterialLink["tabKey"]; label: string }[] = [
  { key: "impact", label: "Before & After AI Impact" },
  { key: "engine", label: "Workflow Engine & Stages" },
  { key: "ai-stack", label: "AI Components & Tech Stack" },
  { key: "inventories", label: "Complete Node Inventories" },
];

/**
 * OPTIONAL CONTENT AREA — Clearly separated from the 9 Main Presentation Headings.
 * Collapsed by default during Presentation Mode so teachers stay focused on the 9 main sections.
 */
export function ExploreFurtherSection({
  isOpen,
  onToggleOpen,
  activeTab,
  onTabChange,
  presentationMode,
}: ExploreFurtherSectionProps) {
  if (presentationMode && !isOpen) {
    return null;
  }

  return (
    <aside
      id="explore-further"
      aria-label="Optional supporting material"
      className="relative z-10 w-full border-t border-white/[0.06] text-[#171924]"
    >
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10">
        {/* Subtle Optional Material Header */}
        <div className="neu-card-white flex flex-col justify-between gap-4 rounded-[28px] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F3FF] text-[#7C3AED]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                Optional Supporting Material · Appendix
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-[#18181B]">
                Explore Further
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
                Additional technical architecture, interactive diagrams, technology stack details, and complete node tables for Q&amp;A sessions or deeper review.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleOpen}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#FAF9FE] px-4 py-2.5 text-sm font-semibold text-[#6D28D9] transition-colors hover:bg-[#F5F3FF]"
          >
            <span>{isOpen ? "Hide Optional Material" : "View Additional Details"}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Expandable Optional Tabs */}
        {isOpen && (
          <div className="mt-8 space-y-8">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => onTabChange(t.key)}
                  className={cn(
                    "cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                    activeTab === t.key
                      ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                      : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#C4B5FD] hover:text-[#4C1D95]"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Interactive 21st.dev PeakChart Before/After Impact */}
            {activeTab === "impact" && <BeforeAfterAIShowcase />}

            {/* Tab 2: Workflow Engine & 9 Execution Stages + Glossary */}
            {activeTab === "engine" && (
              <div className="space-y-8 rounded-2xl border border-[#E5E7EB] bg-white p-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#4C1D95]">
                    Workflow Engine Execution Stages (9-Step Deep Dive)
                  </h3>
                  <p className="mt-1.5 text-sm text-[#6B7280]">
                    Detailed stage-by-stage breakdown from file upload to stakeholder notification.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {INTERACTIVE_WORKFLOW_STAGES.map((stage) => (
                    <div
                      key={stage.code}
                      className="rounded-xl border border-[#ECEBF2] bg-[#FAF9FE] p-5"
                    >
                      <span className="font-mono text-xs font-bold text-[#7C3AED]">
                        Stage {stage.code} · {stage.role}
                      </span>
                      <h4 className="mt-1.5 font-display text-base font-bold text-[#18181B]">
                        {stage.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                        {stage.summary}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#ECEBF2] pt-8">
                  <h4 className="font-display text-lg font-bold text-[#18181B]">
                    Core Workflow Terminology Reference
                  </h4>
                  <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {WORKFLOW_CONCEPTS.map((c) => (
                      <div key={c.term} className="rounded-xl border border-[#ECEBF2] p-5">
                        <p className="font-display text-base font-bold text-[#4C1D95]">
                          {c.term}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">
                          {c.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Components of AI Systems & Editable Technology Stack */}
            {activeTab === "ai-stack" && (
              <div className="space-y-10 rounded-2xl border border-[#E5E7EB] bg-white p-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#4C1D95]">
                    Components of AI Automation Systems
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {AUTOMATION_COMPONENTS.map((comp) => (
                      <div
                        key={comp.number}
                        className="rounded-xl border border-[#ECEBF2] bg-[#FAF9FE] p-5"
                      >
                        <span className="font-mono text-xs font-semibold text-[#7C3AED]">
                          {comp.number} · {comp.layer}
                        </span>
                        <h4 className="mt-1 font-display text-base font-bold text-[#18181B]">
                          {comp.name}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563]">
                          {comp.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#ECEBF2] pt-8">
                  <h3 className="font-display text-xl font-bold text-[#4C1D95]">
                    Technology Stack (Editable Configuration)
                  </h3>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    Configurable in <code className="font-mono text-xs text-[#6D28D9]">src/content/tech-stack.ts</code> so only tools used in your final setup are listed.
                  </p>
                  <div className="mt-5 divide-y divide-[#ECEBF2] rounded-xl border border-[#ECEBF2]">
                    {TECH_STACK_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-1 gap-3 p-5 md:grid-cols-12 md:items-center"
                      >
                        <div className="md:col-span-3">
                          <p className="font-display text-base font-bold text-[#18181B]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#7C3AED]">{item.category}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-[#4B5563] md:col-span-6">
                          {item.role}
                        </p>
                        <div className="md:col-span-3 md:text-right">
                          <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-xs font-medium text-[#6D28D9]">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Complete Node Inventories for All 3 Projects */}
            {activeTab === "inventories" && (
              <div className="space-y-8">
                {SOLUTIONS.map((sol) => (
                  <div
                    key={sol.id}
                    className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white"
                  >
                    <div className="border-b border-[#ECEBF2] bg-[#FAF9FE] px-6 py-4">
                      <h3 className="font-display text-lg font-bold text-[#4C1D95]">
                        {sol.name} — Complete Node Inventory ({sol.nodes.length} Nodes)
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-[#ECEBF2] text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                            <th className="px-5 py-3">Seq</th>
                            <th className="px-5 py-3">Node Name</th>
                            <th className="px-5 py-3">Category</th>
                            <th className="px-5 py-3">Next Connection</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F3F4F6]">
                          {sol.nodes.map((node) => (
                            <tr key={node.id}>
                              <td className="px-5 py-3 font-mono font-semibold text-[#7C3AED]">
                                {String(node.sequence).padStart(2, "0")}
                              </td>
                              <td className="px-5 py-3 font-medium text-[#18181B]">
                                {node.nodeName}
                              </td>
                              <td className="px-5 py-3 text-[#4B5563]">
                                {node.category}
                              </td>
                              <td className="px-5 py-3 text-[#4B5563]">
                                {node.nextConnection}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
