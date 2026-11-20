"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Sliders,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  SECTION_6_APPLICATIONS,
  SECTION_7_ADVANTAGES,
  type RealLifeAppItem,
} from "@/content/presentation-sections";

const TOP_ADVANTAGE_ICONS = [Clock, Sliders, Gauge, ShieldCheck];

function CleanAppImage({ item }: { item: RealLifeAppItem }) {
  const [srcIdx, setSrcIdx] = useState(0);
  const candidates = [item.localPath, item.imageUrl];
  const current = candidates[srcIdx];

  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#E6EAF4]">
      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={item.title}
          loading="lazy"
          onError={() => {
            if (srcIdx + 1 < candidates.length) setSrcIdx(srcIdx + 1);
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

/* ============================================================================
   6. REAL-LIFE APPLICATIONS
   Sculpted Neumorphic Cards with Clean Unobstructed Imagery + Purple Numerals
   ============================================================================ */
export function SectionSixApplications() {
  return (
    <SectionShell
      id="real-life-applications"
      number="06"
      eyebrow="Main Presentation"
      title="Real-Life Applications"
      subtitle="Nine practical ways businesses and organizations apply n8n and AI automation to daily work."
      surface="subtle"
      canvasVariant="left-arc"
    >
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {SECTION_6_APPLICATIONS.map((item) => (
          <article
            key={item.number}
            className="neu-card group flex flex-col justify-between rounded-[26px] p-5"
          >
            <div>
              <CleanAppImage item={item} />
              <div className="mt-5 flex items-baseline gap-3">
                <span className="neu-num-gradient font-display text-2xl font-extrabold">
                  {item.number}.
                </span>
                <h3 className="font-display text-lg font-bold text-[#1A1D26]">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-[1.7] text-[#4C5264]">
                {item.description}
              </p>
            </div>
            <p className="mt-4 border-t border-white/80 pt-3 text-xs font-semibold text-[#5B3DF5]">
              Example: {item.example}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================================
   7. ADVANTAGES OF N8N
   3D Timepiece Sculpture + Slide 5 Pillar Cards + Sculpted Comparison Matrix
   ============================================================================ */
export function SectionSevenAdvantages() {
  return (
    <SectionShell
      id="advantages-of-n8n"
      number="07"
      eyebrow="Main Presentation"
      title="Advantages of n8n"
      subtitle={SECTION_7_ADVANTAGES.lead}
      surface="white"
      canvasVariant="right-arc"
    >
      {/* Top 4 Highlight Pillars + Custom 3D Efficiency Timepiece */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="neu-card-white overflow-hidden rounded-[30px] p-3">
            <div className="overflow-hidden rounded-[22px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/visuals/automation-clock.jpg"
                alt="3D frosted purple glass timepiece representing automated speed and 24/7 time savings"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-medium text-[#70778C]">
            Continuous 24/7 execution converts hours of repetitive administration into seconds
          </p>
        </div>

        {/* Slide 5 Style Sculpted Numbered Cards (01–04) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {SECTION_7_ADVANTAGES.advantages.slice(0, 4).map((adv, idx) => {
            const Icon = TOP_ADVANTAGE_ICONS[idx] ?? Clock;
            return (
              <div
                key={adv.title}
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
                    {adv.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4C5264]">
                    {adv.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Remaining 6 Advantages in Sculpted Slide 2 Horizontal Tiles (05.–10.) */}
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {SECTION_7_ADVANTAGES.advantages.slice(4).map((adv, idx) => (
          <div
            key={adv.title}
            className="neu-card flex items-start gap-5 rounded-[22px] px-6 py-5"
          >
            <span className="neu-num-gradient shrink-0 font-display text-3xl font-extrabold leading-none">
              {String(idx + 5).padStart(2, "0")}.
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-[#1A1D26]">
                {adv.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#4C5264]">
                {adv.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sculpted Comparison Matrix */}
      <div className="neu-card-white mt-16 overflow-hidden rounded-[28px]">
        <div className="border-b border-[#E5E9F3] px-8 py-5">
          <h3 className="font-display text-lg font-bold text-[#1A1D26]">
            Operational Comparison: Manual vs. Rigid Tools vs. n8n + AI
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E8ECF5] text-xs font-semibold uppercase tracking-wider text-[#70778C]">
                <th className="w-[22%] px-8 py-4">Criteria</th>
                <th className="w-[25%] px-5 py-4">Manual Process</th>
                <th className="w-[25%] px-5 py-4">Rigid Automation Tools</th>
                <th className="w-[28%] bg-[#F4F1FF] px-6 py-4 text-[#5B3DF5]">
                  n8n + AI Automation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF0F7] text-sm">
              {SECTION_7_ADVANTAGES.comparisonTable.map((row) => (
                <tr key={row.criteria}>
                  <td className="px-8 py-4 font-bold text-[#1A1D26]">
                    {row.criteria}
                  </td>
                  <td className="px-5 py-4 text-[#70778C]">{row.manual}</td>
                  <td className="px-5 py-4 text-[#4C5264]">{row.rigidTools}</td>
                  <td className="bg-[#F9F7FF] px-6 py-4 font-medium text-[#1A1D26]">
                    <span className="inline-flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5B3DF5]" />
                      <span>{row.n8nAi}</span>
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
