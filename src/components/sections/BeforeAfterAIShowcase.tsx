"use client";

import React, { useState, useEffect } from "react";
import { PeakChart } from "@/components/ui/peak-chart";
import { AlertCircle, Sparkles, Clock, Zap } from "lucide-react";

const BEFORE_AI_SERIES: Record<
  string,
  { data: number[]; labels: string[]; value: number }
> = {
  Weekly: {
    data: [42, 39, 36, 31, 29, 24, 22],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: 22,
  },
  Monthly: {
    data: [48, 45, 44, 41, 38, 36, 39, 34, 31, 28, 29, 26, 24, 21, 19, 18],
    labels: Array.from({ length: 16 }, (_, i) => `Day ${i * 2 + 1}`),
    value: 18,
  },
  Yearly: {
    data: [52, 49, 47, 44, 40, 38, 35, 31, 28, 26, 23, 21],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    value: 21,
  },
};

const AFTER_AI_SERIES: Record<
  string,
  { data: number[]; labels: string[]; value: number }
> = {
  Weekly: {
    data: [128, 162, 188, 246, 384, 342, 368],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: 384,
  },
  Monthly: {
    data: [60, 78, 96, 118, 134, 152, 168, 194, 220, 255, 296, 348, 388, 400, 392, 396],
    labels: Array.from({ length: 16 }, (_, i) => `Day ${i * 2 + 1}`),
    value: 400,
  },
  Yearly: {
    data: [92, 114, 132, 168, 195, 224, 268, 302, 336, 397, 412, 428],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    value: 428,
  },
};

function useCardWidth() {
  const [cardWidth, setCardWidth] = useState(340);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        setCardWidth(Math.max(250, Math.min(320, vw - 64)));
      } else if (vw < 1024) {
        setCardWidth(310);
      } else {
        setCardWidth(365);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cardWidth;
}

export function BeforeAfterAIShowcase() {
  const [period, setPeriod] = useState("Monthly");
  const cardWidth = useCardWidth();

  const beforeData = BEFORE_AI_SERIES[period] ?? BEFORE_AI_SERIES.Monthly;
  const afterData = AFTER_AI_SERIES[period] ?? AFTER_AI_SERIES.Monthly;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#2C2050] bg-[#070412] p-6 shadow-[0_30px_90px_rgba(92,33,182,0.18)] sm:p-10">
      {/* Subtle violet ambient backlight */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[760px] -translate-x-1/2 rounded-full bg-[#7C3AED]/20 blur-[110px]" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-[#241A42] pb-7 md:flex-row md:items-end">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#3B2A6B] bg-[#140E29] px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#C084FC]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E9D5FF]">
              Interactive Impact Comparison · Hover to Scrub
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Before AI Business vs. After AI Automation
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#A79BC2]">
            Compare how manual bottlenecks erode capacity as volume scales against
            an AI-automated workflow architecture that compounds speed and accuracy.
            Hover across either curve or switch timeframes to inspect the trajectory.
          </p>
        </div>

        <span className="shrink-0 rounded-lg border border-[#2D2152] bg-[#100A22] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#B8A9DC]">
          Illustrative Model · Synchronized {period} View
        </span>
      </div>

      {/* Dual Interactive 21st.dev PeakChart Cards */}
      <div className="relative z-10 mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* BEFORE AI BUSINESS */}
        <div className="flex flex-col items-center">
          <div className="mb-5 flex w-full max-w-[380px] items-center justify-between rounded-xl border border-rose-500/25 bg-[#160A16] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-rose-400" />
              <span className="font-display text-sm font-semibold text-white">
                Before AI Business
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300">
              Manual Bottleneck
            </span>
          </div>

          <div className="py-3">
            <PeakChart
              width={cardWidth}
              accent="#e11d48"
              data={beforeData.data}
              labels={beforeData.labels}
              value={beforeData.value}
              valueSuffix="%"
              decimals={0}
              title="Manual process velocity"
              caption="Capacity drops as requests pile up"
              updatedText="Before AI · Manual Ops"
              trend="down"
              period={period}
              onPeriodChange={setPeriod}
              formatValue={(v) => `${Math.round(v)}%`}
            />
          </div>

          <div className="mt-5 grid w-full max-w-[380px] grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-rose-500/20 bg-[#120A18] p-3.5">
              <p className="font-mono text-[10px] uppercase text-rose-300">
                Turnaround
              </p>
              <p className="mt-1 text-xs font-medium text-[#E5DCEB]">
                Hours to days per batch
              </p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-[#120A18] p-3.5">
              <p className="font-mono text-[10px] uppercase text-rose-300">
                Data Quality
              </p>
              <p className="mt-1 text-xs font-medium text-[#E5DCEB]">
                Prone to copy-paste errors
              </p>
            </div>
          </div>
        </div>

        {/* AFTER AI AUTOMATION */}
        <div className="flex flex-col items-center">
          <div className="mb-5 flex w-full max-w-[380px] items-center justify-between rounded-xl border border-[#8B5CF6]/40 bg-[#160E2E] px-4 py-2.5 shadow-[0_0_24px_rgba(139,92,246,0.2)]">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#C084FC]" />
              <span className="font-display text-sm font-semibold text-white">
                After AI Automation
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#C084FC]">
              Intelligent Scale
            </span>
          </div>

          <div className="py-3">
            <PeakChart
              width={cardWidth}
              accent="#8b5cf6"
              data={afterData.data}
              labels={afterData.labels}
              value={afterData.value}
              valueSuffix="%"
              decimals={0}
              title="Automated throughput"
              caption="Increase with AI workflows active"
              updatedText="After AI · Live Pipelines"
              trend="up"
              period={period}
              onPeriodChange={setPeriod}
              formatValue={(v) => `${Math.round(v)}%`}
            />
          </div>

          <div className="mt-5 grid w-full max-w-[380px] grid-cols-2 gap-3 text-left">
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-[#140E2A] p-3.5">
              <p className="font-mono text-[10px] uppercase text-[#C084FC]">
                Turnaround
              </p>
              <p className="mt-1 text-xs font-medium text-white">
                Seconds · 24/7 continuous
              </p>
            </div>
            <div className="rounded-xl border border-[#8B5CF6]/30 bg-[#140E2A] p-3.5">
              <p className="font-mono text-[10px] uppercase text-[#C084FC]">
                Data Quality
              </p>
              <p className="mt-1 text-xs font-medium text-white">
                Validated structured JSON
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Honest educational disclosure */}
      <div className="relative z-10 mt-8 flex items-center gap-2.5 rounded-xl border border-[#251B45] bg-[#0D091D] px-4 py-3 text-xs text-[#9C90B8]">
        <AlertCircle className="h-4 w-4 shrink-0 text-[#A855F7]" />
        <span>
          Illustrative educational curves showing the structural difference between
          linear human-constrained workflows and scalable AI-orchestrated workflows.
        </span>
      </div>
    </div>
  );
}
