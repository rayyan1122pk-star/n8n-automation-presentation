"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Sliders,
  Gauge,
  ShieldCheck,
  GitMerge,
  Code2,
  Plug,
  TrendingUp,
  Sparkles,
  PiggyBank,
  ArrowUpRight,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  SECTION_6_APPLICATIONS,
  SECTION_7_ADVANTAGES,
  type RealLifeAppItem,
} from "@/content/presentation-sections";
import { cn } from "@/lib/utils";
import { CountUp, EASE, GlassCard, Reveal, Stagger, StaggerItem } from "@/components/premium/motion";
import { DarkRender } from "@/components/premium/DarkRender";

const ADVANTAGE_ICONS = [Clock, Sliders, Gauge, ShieldCheck, GitMerge, Code2, Plug, TrendingUp, Sparkles, PiggyBank];

/* Bento spans for the 9 applications (lg: 6-col grid) */
const BENTO = [
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-6",
];

function AppImage({ item }: { item: RealLifeAppItem }) {
  const [srcIdx, setSrcIdx] = useState(0);
  const candidates = [item.imageUrl, item.localPath];
  const current = candidates[srcIdx];
  return current ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={item.title}
      loading="lazy"
      onError={() => {
        if (srcIdx + 1 < candidates.length) setSrcIdx(srcIdx + 1);
      }}
      className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.85] transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:opacity-90 group-hover:saturate-100"
    />
  ) : null;
}

/* ============================================================================
   6. REAL-LIFE APPLICATIONS — cinematic bento
   ============================================================================ */
export function SectionSixApplications() {
  return (
    <SectionShell
      id="real-life-applications"
      number="06"
      eyebrow="Main Presentation"
      title="Real-Life Applications"
      subtitle="Nine practical ways businesses and organizations apply n8n and AI automation to their daily work."
    >
      <div className="grid auto-rows-[300px] grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[290px] lg:grid-cols-6">
        {SECTION_6_APPLICATIONS.map((item, i) => (
          <motion.article
            key={item.number}
            initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, delay: (i % 3) * 0.08, ease: EASE }}
            className={cn(
              "group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0c16]",
              BENTO[i],
              i === 0 && "sm:col-span-2 sm:row-span-2"
            )}
          >
            <AppImage item={item} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04050a] via-[#04050a]/70 to-[#04050a]/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6d5a]/0 to-[#8b5cf6]/0 transition-colors duration-700 group-hover:from-[#ff6d5a]/15 group-hover:to-[#8b5cf6]/20" />

            <div className="relative flex h-full flex-col justify-between p-7">
              <div className="flex items-start justify-between">
                <span className="chip">{item.number}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#ea4b71]">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div>
                <h3 className={cn("font-display font-bold tracking-[-0.03em] text-white", i === 0 ? "text-3xl sm:text-5xl" : "text-2xl")}>
                  {item.title}
                </h3>
                <p className={cn("mt-2 leading-relaxed text-white/65", i === 0 ? "max-w-md text-base" : "line-clamp-2 text-sm")}>
                  {item.description}
                </p>
                <div className="grid grid-rows-[0fr] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-medium text-[#ffb4a6] backdrop-blur-md">
                      Example — {item.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   7. ADVANTAGES OF N8N
   ============================================================================ */
export function SectionSevenAdvantages() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);
  const advs = SECTION_7_ADVANTAGES.advantages;

  return (
    <SectionShell
      id="advantages-of-n8n"
      number="07"
      eyebrow="Main Presentation"
      title="Advantages of n8n"
      subtitle={SECTION_7_ADVANTAGES.lead}
    >
      {/* Hero stat + render */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DarkRender
            src="/media/visuals/automation-clock.jpg"
            alt="3D glass timepiece representing automated 24/7 time savings"
            caption="24/7 execution turns hours of admin into seconds"
          />
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-end gap-5">
              <CountUp to={10} className="num-gradient font-display text-[140px] font-extrabold leading-[0.85] tracking-[-0.06em] sm:text-[200px]" />
              <p className="pb-5 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                measurable
                <br />
                <span className="font-serif font-normal italic text-white/60">advantages</span>
              </p>
            </div>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {advs.slice(0, 4).map((adv, idx) => {
              const Icon = ADVANTAGE_ICONS[idx];
              return (
                <StaggerItem key={adv.title}>
                  <GlassCard tilt className="h-full rounded-[28px] p-6">
                    <div className="flex items-center gap-4">
                      <span className="squircle squircle-hot h-12 w-12"><Icon className="h-5 w-5 text-white" /></span>
                      <h3 className="font-display text-lg font-bold text-white">{adv.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{adv.detail}</p>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* Kinetic marquee rows of remaining advantages */}
      <div ref={ref} className="relative -mx-6 mt-24 space-y-5 overflow-hidden py-4 sm:-mx-10">
        {[advs.slice(4, 7), advs.slice(7)].map((row, r) => (
          <motion.div key={r} style={{ x: r === 0 ? x1 : x2 }} className="flex w-max gap-5 px-6">
            {[...row, ...row].map((adv, i) => {
              const realIdx = advs.indexOf(adv);
              const Icon = ADVANTAGE_ICONS[realIdx] ?? Sparkles;
              return (
                <GlassCard key={`${adv.title}-${i}`} className="flex w-[420px] shrink-0 items-start gap-5 rounded-[30px] p-7">
                  <span className="num-gradient font-display text-4xl font-extrabold leading-none">
                    {String(realIdx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                      <Icon className="h-4 w-4 text-[#ff8a73]" /> {adv.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{adv.detail}</p>
                  </div>
                </GlassCard>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Comparison matrix */}
      <div className="mt-28">
        <Reveal>
          <h3 className="font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-[44px] sm:leading-[1.1]">
            Operational Comparison: Manual vs. Rigid Tools vs. <span className="text-gradient-warm">n8n + AI</span>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard strong className="mt-12 overflow-x-auto rounded-[36px]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                  <th className="w-[22%] px-8 py-6 font-medium">Criteria</th>
                  <th className="w-[24%] px-6 py-6 font-medium">Manual Process</th>
                  <th className="w-[24%] px-6 py-6 font-medium">Rigid Automation Tools</th>
                  <th className="relative w-[30%] px-7 py-6 font-medium text-[#ffb4a6]">
                    <span className="absolute inset-x-2 inset-y-0 rounded-t-[24px] bg-gradient-to-b from-[#ff6d5a]/20 to-[#ff6d5a]/[0.06]" />
                    <span className="relative">n8n + AI Automation</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {SECTION_7_ADVANTAGES.comparisonTable.map((row, i, arr) => (
                  <tr key={row.criteria} className="border-t border-white/[0.07]">
                    <td className="px-8 py-6 font-display font-bold text-white">{row.criteria}</td>
                    <td className="px-6 py-6 text-white/40">{row.manual}</td>
                    <td className="px-6 py-6 text-white/55">{row.rigidTools}</td>
                    <td className="relative px-7 py-6 font-medium text-white">
                      <span
                        className={cn(
                          "absolute inset-x-2 inset-y-0 bg-[#ff6d5a]/[0.06]",
                          i === arr.length - 1 && "rounded-b-[24px]"
                        )}
                      />
                      <span className="relative flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {row.n8nAi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}
