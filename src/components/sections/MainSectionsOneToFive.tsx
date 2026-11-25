"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Zap,
  SlidersHorizontal,
  GitBranch,
  PlayCircle,
  CheckCircle2,
  Workflow,
  Boxes,
  KeyRound,
  Plug,
  Activity,
  ShieldAlert,
  Braces,
  Database,
  Link2,
  Receipt,
  BellRing,
  CalendarClock,
  Timer,
  AlertTriangle,
  Hourglass,
  EyeOff,
  ArrowRight,
  X,
  FileText,
  MessageSquareText,
  Cpu,
  Braces as JsonIcon,
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
import { EASE, GlassCard, Reveal, Stagger, StaggerItem } from "@/components/premium/motion";
import { DarkRender } from "@/components/premium/DarkRender";

const WORKFLOW_STAGE_ICONS = [Zap, SlidersHorizontal, GitBranch, PlayCircle, CheckCircle2];
const PROBLEM_ICONS = [Timer, AlertTriangle, Hourglass, EyeOff];
const EXAMPLE_ICONS = [Receipt, BellRing, CalendarClock];
const AI_STEP_ICONS = [FileText, MessageSquareText, Cpu, JsonIcon];

const COMPONENT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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

function Label({ children, tone = "warm" }: { children: React.ReactNode; tone?: "warm" | "cool" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em]",
        tone === "warm" ? "text-[#ff8a73]" : "text-[#a5b4fc]"
      )}
    >
      <span className={cn("h-px w-6", tone === "warm" ? "bg-[#ff8a73]" : "bg-[#a5b4fc]")} />
      {children}
    </span>
  );
}

function SubHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal>
      <h3 className={cn("font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-[44px] sm:leading-[1.1]", className)}>
        {children}
      </h3>
    </Reveal>
  );
}

/* ============================================================================
   1. INTRODUCTION TO AUTOMATION
   ============================================================================ */
function ProblemCard({
  idx,
  title,
  detail,
  onActive,
  active,
}: {
  idx: number;
  title: string;
  detail: string;
  onActive: (i: number) => void;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-20% 0px -20% 0px" });
  useEffect(() => {
    if (inView) onActive(idx);
  }, [inView, idx, onActive]);
  const Icon = PROBLEM_ICONS[idx] ?? Timer;
  return (
    <div ref={ref} className="flex min-h-[46vh] items-center py-6">
      <motion.div
        animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.96 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="w-full"
      >
        <GlassCard className={cn("rounded-[32px] p-8 sm:p-10", active && "ring-glow")}>
          <div className="flex items-start gap-6">
            <span className={cn("squircle h-14 w-14 shrink-0", active && "squircle-hot")}>
              <Icon className="h-6 w-6 text-white" />
            </span>
            <div>
              <span className="font-mono text-xs text-white/40">Problem 0{idx + 1}</span>
              <h4 className="mt-1 font-display text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">{title}</h4>
              <p className="mt-3 text-base leading-[1.75] text-white/60 sm:text-lg">{detail}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export function SectionOneIntroduction() {
  const [active, setActive] = useState(0);
  const problems = SECTION_1_INTRO.manualProblems;
  const orbitPos = [
    "left-[6%] top-[10%]",
    "right-[6%] top-[10%]",
    "left-[6%] bottom-[10%]",
    "right-[6%] bottom-[10%]",
  ];

  return (
    <SectionShell
      id="introduction-to-automation"
      number="01"
      eyebrow="Main Presentation"
      title="Introduction to Automation"
      subtitle={SECTION_1_INTRO.lead}
    >
      {/* Definition + Business need */}
      <Stagger className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[
          { tag: "Definition", title: "What Automation Means", body: SECTION_1_INTRO.whatIsAutomation, tone: "warm" as const },
          { tag: "Business Need", title: "Why Businesses Need Automation", body: SECTION_1_INTRO.whyImportant, tone: "cool" as const },
        ].map((c) => (
          <StaggerItem key={c.title}>
            <GlassCard tilt className="h-full rounded-[36px] p-9 sm:p-12">
              <Label tone={c.tone}>{c.tag}</Label>
              <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">{c.title}</h3>
              <p className="mt-5 text-base leading-[1.85] text-white/60 sm:text-[17px]">{c.body}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Sticky scroll-story: four problems */}
      <div className="mt-36">
        <Label>Scroll story</Label>
        <SubHeading className="mt-5 max-w-2xl">
          Four Core Problems With <span className="font-serif font-normal italic text-gradient-warm">Manual Processes</span>
        </SubHeading>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[18vh] flex h-[64vh] items-center justify-center">
              <div className="relative aspect-square w-full max-w-[440px]">
                <div className="spin-slow absolute inset-[4%] rounded-full border border-dashed border-white/10" />
                <div className="spin-slower absolute inset-[18%] rounded-full border border-white/[0.07]" />
                <div className="orb float-y absolute inset-[30%]" />
                {orbitPos.map((pos, i) => {
                  const Icon = PROBLEM_ICONS[i];
                  const on = active === i;
                  return (
                    <motion.div
                      key={i}
                      animate={{ scale: on ? 1.15 : 1, opacity: on ? 1 : 0.5 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className={cn("absolute", pos)}
                    >
                      <div className={cn("flex h-20 w-20 flex-col items-center justify-center rounded-[26px]", on ? "squircle squircle-hot" : "glass")}>
                        <Icon className="h-6 w-6 text-white" />
                        <span className="mt-1 font-mono text-[10px] text-white/70">0{i + 1}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            {problems.map((p, i) => (
              <ProblemCard key={p.title} idx={i} title={p.title} detail={p.detail} onActive={setActive} active={active === i} />
            ))}
          </div>
        </div>
      </div>

      {/* Everyday examples */}
      <div className="mt-28">
        <Label tone="cool">In the wild</Label>
        <SubHeading className="mt-5">Everyday Examples of Automation</SubHeading>
        <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SECTION_1_INTRO.basicExamples.map((ex, idx) => {
            const Icon = EXAMPLE_ICONS[idx] ?? Receipt;
            return (
              <StaggerItem key={ex.title}>
                <GlassCard tilt className="group h-full rounded-[32px] p-8">
                  <div className="flex items-center justify-between">
                    <span className="squircle squircle-hot h-14 w-14 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <span className="num-gradient font-display text-5xl font-extrabold">0{idx + 1}</span>
                  </div>
                  <h4 className="mt-10 font-display text-xl font-bold tracking-[-0.02em] text-white">{ex.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/55">{ex.detail}</p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   2. WORKFLOW AUTOMATION — pinned, scroll-scrubbed pipeline
   ============================================================================ */
export function SectionTwoWorkflowAutomation() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const lineWidth = useTransform(progress, [0.05, 0.9], ["0%", "100%"]);
  const [stage, setStage] = useState(0);
  const stages = SECTION_2_WORKFLOW.pipelineStages;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(stages.length - 1, Math.max(0, Math.floor(((v - 0.05) / 0.85) * stages.length)));
    setStage(s);
  });

  const current = stages[stage];
  const CurrentIcon = WORKFLOW_STAGE_ICONS[stage] ?? Zap;

  return (
    <SectionShell
      id="workflow-automation"
      number="02"
      eyebrow="Main Presentation"
      title="Workflow Automation"
      subtitle={SECTION_2_WORKFLOW.lead}
    >
      <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          { title: "What Is a Workflow?", body: SECTION_2_WORKFLOW.whatIsWorkflow, tag: "Concept" },
          { title: "How Different Applications Communicate", body: SECTION_2_WORKFLOW.howAppsCommunicate, tag: "APIs · Webhooks · JSON" },
        ].map((c, i) => (
          <StaggerItem key={c.title}>
            <GlassCard tilt className="h-full rounded-[36px] p-9 sm:p-11">
              <Label tone={i === 0 ? "warm" : "cool"}>{c.tag}</Label>
              <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.03em] text-white sm:text-[32px] sm:leading-tight">{c.title}</h3>
              <p className="mt-4 text-base leading-[1.85] text-white/60">{c.body}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Pinned pipeline */}
      <div ref={pinRef} className="relative mt-24 lg:h-[320vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Label>The anatomy of every workflow</Label>
              <h3 className="mt-5 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-5xl">
                Trigger <span className="text-white/30">→</span> Processing <span className="text-white/30">→</span> Decision{" "}
                <span className="text-white/30">→</span> Action <span className="text-white/30">→</span>{" "}
                <span className="text-gradient-warm">Result</span>
              </h3>
            </div>
            <span className="hidden font-mono text-xs text-white/40 lg:block">Keep scrolling to execute ↓</span>
          </div>

          {/* rail */}
          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-[10%] right-[10%] top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/[0.08]" />
            <div className="absolute left-[10%] right-[10%] top-1/2 h-[2px] -translate-y-1/2">
              <motion.div
                style={{ width: lineWidth }}
                className="relative h-full rounded-full bg-gradient-to-r from-[#ff6d5a] via-[#ea4b71] to-[#8b5cf6] shadow-[0_0_20px_rgba(255,109,90,0.8)]"
              >
                <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_6px_rgba(255,140,115,0.9)]" />
              </motion.div>
            </div>
            <div className="relative grid grid-cols-5">
              {stages.map((s, i) => {
                const Icon = WORKFLOW_STAGE_ICONS[i] ?? Zap;
                const on = i <= stage;
                return (
                  <div key={s.name} className="flex flex-col items-center">
                    <motion.div
                      animate={{ scale: i === stage ? 1.12 : 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={cn(
                        "flex h-24 w-24 items-center justify-center rounded-[30px] transition-all duration-500",
                        on ? "squircle squircle-hot" : "glass"
                      )}
                    >
                      <Icon className={cn("h-9 w-9 transition-colors duration-500", on ? "text-white" : "text-white/35")} />
                    </motion.div>
                    <span className={cn("mt-4 font-display text-lg font-bold transition-colors duration-500", on ? "text-white" : "text-white/35")}>
                      {s.name}
                    </span>
                    <span className="font-mono text-[11px] text-white/35">0{s.step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* active stage detail (desktop) */}
          <div className="mt-12 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(10px)" }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <GlassCard strong className="mx-auto flex max-w-3xl items-center gap-8 rounded-[34px] p-8">
                  <span className="squircle squircle-hot h-20 w-20 shrink-0 rounded-[26px]">
                    <CurrentIcon className="h-9 w-9 text-white" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#ff8a73]">
                      Step 0{current.step} · {current.role}
                    </p>
                    <h4 className="mt-1 font-display text-3xl font-bold tracking-[-0.03em] text-white">{current.name}</h4>
                    <p className="mt-2 text-base leading-relaxed text-white/60">{current.explanation}</p>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* mobile list */}
          <Stagger className="mt-10 space-y-4 lg:hidden">
            {stages.map((s, i) => {
              const Icon = WORKFLOW_STAGE_ICONS[i] ?? Zap;
              return (
                <StaggerItem key={s.name}>
                  <GlassCard className="flex items-start gap-5 rounded-[28px] p-6">
                    <span className="squircle squircle-hot h-14 w-14 shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff8a73]">0{s.step} · {s.role}</p>
                      <h4 className="mt-1 font-display text-xl font-bold text-white">{s.name}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.explanation}</p>
                    </div>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* Manual → automated */}
      <div className="mt-28">
        <Label tone="cool">Transformation</Label>
        <SubHeading className="mt-5">From Manual Tasks to Automated Processes</SubHeading>
        <div className="mt-12 space-y-5">
          {SECTION_2_WORKFLOW.manualToAutomated.map((row, i) => (
            <Reveal key={row.task} delay={i * 0.08}>
              <GlassCard className="grid grid-cols-1 items-stretch gap-0 rounded-[32px] lg:grid-cols-[1fr_1.3fr_auto_1.5fr]">
                <div className="flex items-center p-7 lg:p-8">
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-white">{row.task}</p>
                </div>
                <div className="border-t border-white/[0.07] p-7 lg:border-l lg:border-t-0 lg:p-8">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
                    <X className="h-3.5 w-3.5 text-[#ff6d5a]" /> Manual way
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/45 line-through decoration-[#ff6d5a]/40">{row.before}</p>
                </div>
                <div className="hidden items-center justify-center px-2 lg:flex">
                  <span className="squircle squircle-hot h-11 w-11 rounded-full">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="border-t border-white/[0.07] bg-gradient-to-r from-[#ff6d5a]/[0.07] to-[#8b5cf6]/[0.07] p-7 lg:border-t-0 lg:p-8">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff8a73]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Automated workflow
                  </p>
                  <p className="mt-2 text-[15px] font-medium leading-relaxed text-white">{row.after}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   3. HOW DOES N8N WORK?
   ============================================================================ */
export function SectionThreeHowN8nWorks() {
  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 90, damping: 22 });

  return (
    <SectionShell
      id="how-does-n8n-work"
      number="03"
      eyebrow="Main Presentation"
      title="How Does n8n Work?"
      subtitle={SECTION_3_HOW_N8N_WORKS.lead}
    >
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <DarkRender
            src="/media/visuals/n8n-hub-orb.jpg"
            alt="n8n central workflow hub connecting external services"
            caption="Central orchestration hub · triggers · services · APIs"
          />
        </div>

        {/* scroll-filled timeline */}
        <div ref={tlRef} className="relative lg:col-span-7">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/[0.08]" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-[#ff6d5a] via-[#ea4b71] to-[#8b5cf6] shadow-[0_0_12px_rgba(255,109,90,0.8)]"
          />
          <div className="space-y-8">
            {SECTION_3_HOW_N8N_WORKS.executionSteps.map((item, i) => (
              <Reveal key={item.step} delay={0.05}>
                <div className="relative flex gap-7">
                  <span className="squircle squircle-hot relative z-10 h-14 w-14 shrink-0 font-mono text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <GlassCard className="flex-1 rounded-[30px] p-7">
                    <h4 className="font-display text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">{item.title}</h4>
                    <p className="mt-2.5 text-[15px] leading-[1.75] text-white/60">{item.detail}</p>
                    {i === 1 && (
                      <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/[0.06] bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-white/70">
{`{ "vendor": "Acme Supplies",
  "total": 1240.50,
  "status": "validated" }`}
                      </pre>
                    )}
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* AI systems supporting concept */}
      <div className="mt-32">
        <Label tone="cool">Supporting Explanation</Label>
        <SubHeading className="mt-5 max-w-4xl">{SECTION_3_HOW_N8N_WORKS.aiBasics.title}</SubHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-lg leading-[1.75] text-white/55">{SECTION_3_HOW_N8N_WORKS.aiBasics.summary}</p>
        </Reveal>

        <div className="relative mt-14">
          {/* traveling packet rail */}
          <div className="absolute left-[12%] right-[12%] top-[52px] hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 lg:block">
            <span className="absolute top-1/2 h-2 w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#ff8a73] to-transparent blur-[1px] [animation:packetRun_3.2s_ease-in-out_infinite]" />
          </div>
          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SECTION_3_HOW_N8N_WORKS.aiBasics.components.map((comp, idx) => {
              const Icon = AI_STEP_ICONS[idx] ?? Cpu;
              return (
                <StaggerItem key={comp.name}>
                  <GlassCard tilt className="h-full rounded-[30px] p-7 text-center">
                    <span className={cn("squircle mx-auto h-[58px] w-[58px]", idx === 2 && "squircle-hot")}>
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <p className="mt-6 font-mono text-[11px] text-white/35">0{idx + 1}</p>
                    <h4 className="mt-1 font-display text-lg font-bold text-white">{comp.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{comp.detail}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
      <style>{`@keyframes packetRun{0%{left:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:calc(100% - 4rem);opacity:0}}`}</style>
    </SectionShell>
  );
}

/* ============================================================================
   4. IMPORTANT COMPONENTS OF N8N — iOS segmented control
   ============================================================================ */
export function SectionFourComponents() {
  const [activeGroupId, setActiveGroupId] = useState(SECTION_4_COMPONENTS[0].id);
  const activeGroup = SECTION_4_COMPONENTS.find((g) => g.id === activeGroupId) ?? SECTION_4_COMPONENTS[0];

  return (
    <SectionShell
      id="important-components"
      number="04"
      eyebrow="Main Presentation"
      title="Important Components of n8n"
      subtitle="Twelve technical building blocks, organized into three groups — tap through each to see what it does, why it matters, and where it shows up."
    >
      <Reveal>
        <div className="flex justify-center">
          <div className="glass-strong inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5">
            {SECTION_4_COMPONENTS.map((group, idx) => {
              const active = group.id === activeGroup.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  className={cn(
                    "relative cursor-pointer rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-7",
                    active ? "text-white" : "text-white/50 hover:text-white/80"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="seg-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="btn-liquid btn-liquid-primary absolute inset-0 rounded-full"
                    />
                  )}
                  <span className="relative">
                    <span className="font-mono text-xs opacity-60">0{idx + 1}</span> {group.groupTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeGroup.id + "-d"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-white/55"
        >
          {activeGroup.groupDescription}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup.id}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.3 } }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {activeGroup.items.map((item, idx) => {
            const Icon = COMPONENT_ICON_MAP[item.name] ?? Boxes;
            return (
              <motion.div
                key={item.name}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -15, filter: "blur(8px)" },
                  show: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
                }}
                style={{ transformPerspective: 900 }}
              >
                <GlassCard tilt className="group flex h-full flex-col rounded-[32px] p-7">
                  <div className="flex items-start justify-between">
                    <span className="squircle squircle-hot h-14 w-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em] text-white">{item.name}</h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-white/70">{item.whatItDoes}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    <span className="font-semibold text-white/75">Why it matters — </span>
                    {item.whyItMatters}
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="rounded-2xl border border-white/[0.06] bg-black/25 p-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff8a73]">Example</span>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{item.example}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}

/* ============================================================================
   5. N8N AND AI
   ============================================================================ */
export function SectionFiveN8nAndAI() {
  return (
    <SectionShell
      id="n8n-and-ai"
      number="05"
      eyebrow="Main Presentation"
      title="n8n and AI"
      subtitle={SECTION_5_N8N_AND_AI.lead}
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
        <Stagger className="space-y-4 lg:col-span-7">
          {SECTION_5_N8N_AND_AI.pillars.map((pillar, idx) => (
            <StaggerItem key={pillar.title}>
              <GlassCard className="group flex items-start gap-6 rounded-[30px] p-7">
                <span className="num-gradient shrink-0 font-display text-5xl font-extrabold leading-none tracking-[-0.04em]">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#ffb4a6]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-white/55">{pillar.detail}</p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="lg:col-span-5">
          <DarkRender
            src="/media/visuals/ai-neural-core.jpg"
            alt="3D glass AI neural core"
            glow="cool"
            caption="AI interprets unstructured text, documents & context"
          />
        </div>
      </div>

      {/* Versus comparison */}
      <div className="mt-32">
        <Label tone="cool">Side by side</Label>
        <SubHeading className="mt-5">Traditional Automation vs. AI-Powered Automation</SubHeading>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full rounded-[36px] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="squircle h-11 w-11"><SlidersHorizontal className="h-5 w-5 text-white/60" /></span>
                <h4 className="font-display text-2xl font-bold text-white/70">Traditional Automation</h4>
              </div>
              <div className="mt-8 divide-y divide-white/[0.06]">
                {SECTION_5_N8N_AND_AI.comparison.map((row) => (
                  <div key={row.aspect} className="py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">{row.aspect}</p>
                    <p className="mt-1.5 text-base text-white/50">{row.traditional}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.12}>
            <GlassCard strong className="ring-glow h-full rounded-[36px] p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="squircle squircle-hot h-11 w-11"><Cpu className="h-5 w-5 text-white" /></span>
                <h4 className="font-display text-2xl font-bold text-white">AI-Powered Automation</h4>
              </div>
              <div className="mt-8 divide-y divide-white/[0.08]">
                {SECTION_5_N8N_AND_AI.comparison.map((row) => (
                  <div key={row.aspect} className="py-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ff8a73]">{row.aspect}</p>
                    <p className="mt-1.5 flex items-start gap-2.5 text-base font-medium text-white">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                      {row.aiPowered}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
