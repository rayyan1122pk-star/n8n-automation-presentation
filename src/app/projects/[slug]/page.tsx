import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Radio,
  Presentation,
  Sparkles,
} from "lucide-react";
import { SOLUTIONS } from "@/content/solutions";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { FinFlowLiveDemo } from "@/components/solutions/FinFlowLiveDemo";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export default async function ProjectLearnMorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.id === slug);
  if (!solution) notFound();

  const isLive = solution.mode === "live";

  return (
    <div className="min-h-screen bg-white text-[#18181B]">
      {/* Clean Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/#practical-demonstration"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5563] transition-colors hover:text-[#6D28D9]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Practical Demonstration</span>
          </Link>

          <div className="flex items-center gap-2">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.id}
                href={`/projects/${s.id}`}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  s.id === solution.id
                    ? "bg-[#7C3AED] text-white"
                    : "text-[#4B5563] hover:bg-[#F5F3FF] hover:text-[#5B21B6]"
                }`}
              >
                {s.name.split(" — ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-14">
        {/* Hero Header */}
        <section className="border-b border-[#ECEBF2] pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
              Project {solution.sectionNumber}
            </span>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                LIVE DEMONSTRATION · LOCAL n8n CONNECTED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-[#FAF9FE] px-3 py-1 text-xs font-semibold text-[#5B21B6]">
                <Presentation className="h-3.5 w-3.5" />
                PROJECT SHOWCASE · PRESENTATION ONLY
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold text-[#4C1D95] sm:text-5xl">
            {solution.name}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-[1.8] text-[#4B5563] sm:text-lg">
            {solution.fullDescription}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] p-7">
              <h2 className="font-display text-lg font-bold text-[#18181B]">
                Business Problem Solved
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                {solution.problem.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {solution.problem.painPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9CA3AF]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#DDD6FE] bg-[#FAF9FE] p-7">
              <h2 className="font-display text-lg font-bold text-[#4C1D95]">
                How the Automation Works
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">
                {solution.solution.summary}
              </p>
              <ul className="mt-4 space-y-2">
                {solution.solution.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm text-[#18181B]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Live FinFlow Workspace when viewing /projects/finflow */}
        {isLive && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#18181B]">
              Live FinFlow Interactive CRM &amp; Vendor Workflow
            </h2>
            <FinFlowLiveDemo />
          </section>
        )}

        {/* Actual Workflow Screenshots (Zoomed Part 1 & Part 2) */}
        <section className="space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#18181B]">
              Actual n8n Workflow Screenshots (Zoomed Close-Ups)
            </h2>
            <p className="mt-1 text-sm text-[#6B7280]">{solution.workflowOverview}</p>
          </div>
          {solution.workflowScreenshots.slice(0, 2).map((shot) => (
            <MediaFrame
              key={shot.id}
              primaryPath={shot.primaryPath}
              fallbackPath={shot.fallbackPath}
              title={shot.title}
              caption={shot.caption}
              aspectClass="aspect-[16/9]"
            />
          ))}
        </section>

        {/* Dashboard Concept Preview for Presentation Showcases */}
        {!isLive && solution.dashboardScreenshots[0] && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#18181B]">
              Dashboard Concept Preview (Static Visual)
            </h2>
            <MediaFrame
              primaryPath={solution.dashboardScreenshots[0].primaryPath}
              fallbackPath={solution.dashboardScreenshots[0].fallbackPath}
              title={solution.dashboardScreenshots[0].title}
              caption={solution.dashboardScreenshots[0].caption}
              aspectClass="aspect-[16/9]"
            />
          </section>
        )}

        {/* Complete Node Breakdown */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-[#4C1D95]">
            Relevant n8n Nodes &amp; Execution Architecture
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {solution.nodes.map((node) => (
              <div
                key={node.id}
                className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFC] p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#7C3AED] px-2.5 py-0.5 font-mono text-xs font-semibold text-white">
                    Step {String(node.sequence).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-[#6B7280]">{node.nodeType}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-[#18181B]">
                  {node.nodeName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                  {node.whatIsIt} {node.whatDoesItDo}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#5B21B6]">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Next: {node.nextConnection}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expected Benefits */}
        <section className="rounded-3xl border border-[#DDD6FE] bg-[#FAF9FE] p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
            <Sparkles className="h-4 w-4" />
            <span>Expected Business Benefits</span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {solution.expectedBenefits.map((b) => (
              <div
                key={b}
                className="flex items-start gap-2.5 rounded-xl border border-[#ECEBF2] bg-white p-4 text-sm text-[#18181B]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
