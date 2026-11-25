"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Bot, CheckCircle2, Play, Sparkles, Webhook, Database, Mail } from "lucide-react";
import { SITE_BRAND } from "@/content/navigation";
import { NeuralFlowCanvas } from "@/components/premium/NeuralFlowCanvas";
import { EASE, Magnetic, scrollToId } from "@/components/premium/motion";

interface HeroSectionProps {
  onStartPresentation: () => void;
}

const INTEGRATIONS = [
  "Webhooks", "Gmail", "Google Sheets", "PostgreSQL", "Gemini", "OpenAI", "Slack", "Telegram",
  "Notion", "Supabase", "HTTP Request", "Airtable", "Stripe", "HubSpot", "Google Drive", "Code (JS / Python)",
];

const RUN_STEPS = [
  { icon: Webhook, label: "Webhook received" },
  { icon: Bot, label: "AI Agent extracts fields" },
  { icon: Database, label: "Saved to database" },
  { icon: Mail, label: "Confirmation sent" },
];

function LiveRunWidget() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (RUN_STEPS.length + 2)), 1100);
    return () => clearInterval(id);
  }, []);
  const done = step >= RUN_STEPS.length;
  return (
    <div className="glass-strong w-[290px] rounded-[26px] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Workflow · live run</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            done ? "bg-emerald-400/15 text-emerald-300" : "bg-[#ff6d5a]/15 text-[#ff9a85]"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "animate-pulse bg-[#ff6d5a]"}`} />
          {done ? "Succeeded" : "Running"}
        </span>
      </div>
      <div className="space-y-1.5">
        {RUN_STEPS.map((s, i) => {
          const Icon = s.icon;
          const state = i < step ? "done" : i === step ? "active" : "idle";
          return (
            <div
              key={s.label}
              className={`flex items-center gap-3 rounded-2xl px-2.5 py-2 transition-all duration-500 ${
                state === "active" ? "bg-white/[0.08]" : ""
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-[10px] transition-colors duration-500 ${
                  state === "idle" ? "bg-white/[0.05] text-white/30" : "squircle-hot text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className={`flex-1 text-xs font-medium transition-colors duration-500 ${state === "idle" ? "text-white/35" : "text-white/90"}`}>
                {s.label}
              </span>
              {state === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const AI_LINES = [
  "Classifying email → Billing · Priority: high",
  "Extracting invoice → Vendor, Date, Total",
  "Drafting reply → ready for human approval",
];

function AiTypingWidget() {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % AI_LINES.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="glass-strong w-[300px] rounded-[26px] p-4">
      <div className="flex items-center gap-3">
        <span className="squircle-hot flex h-10 w-10 items-center justify-center rounded-[14px]">
          <Sparkles className="h-5 w-5 text-white" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">AI Agent node</p>
          <p className="text-[11px] text-white/45">Inside an n8n workflow</p>
        </div>
      </div>
      <div className="mt-3 h-[38px] overflow-hidden rounded-2xl bg-black/30 px-3 py-2.5 font-mono text-[11px] text-[#ffb4a6]">
        <p key={line} className="truncate [animation:lineIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
          {AI_LINES[line]}
        </p>
        <style>{`@keyframes lineIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </div>
  );
}

export function HeroSection({ onStartPresentation }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.86]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-12%"]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.5], ["blur(0px)", "blur(14px)"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const widgetsY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-40%"]);
  const widgetsOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <>
      <div ref={ref} id="home" data-section-id="home" className="relative h-[175vh]">
        <section className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Live n8n workflow "video" */}
          <motion.div style={{ scale: canvasScale, opacity: canvasOpacity }} className="absolute inset-0">
            <NeuralFlowCanvas className="h-full w-full" />
          </motion.div>

          {/* cinematic grading */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(4,5,10,0.92)_0%,rgba(4,5,10,0.55)_55%,rgba(4,5,10,0.1)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#04050a] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#04050a]/80 to-transparent" />

          {/* floating glass widgets */}
          <motion.div
            style={{ y: widgetsY, opacity: widgetsOpacity }}
            className="pointer-events-none absolute inset-0 z-10 hidden xl:block"
          >
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
              className="float-y absolute left-[4%] top-[58%]"
            >
              <LiveRunWidget />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
              className="absolute right-[4%] top-[22%]"
              style={{ animation: "floatY 9s ease-in-out infinite" }}
            >
              <AiTypingWidget />
            </motion.div>
          </motion.div>

          {/* headline */}
          <motion.div
            style={{ scale: contentScale, opacity: contentOpacity, y: contentY, filter: contentBlur }}
            className="relative z-20 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="chip mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {SITE_BRAND.presentationLabel}
            </motion.div>

            <h1 className="font-display font-extrabold tracking-[-0.055em]">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
                  className="block text-[17vw] leading-[0.9] sm:text-[120px] lg:text-[148px]"
                >
                  n8n{" "}
                  <span className="font-serif text-[0.8em] font-normal italic tracking-[-0.02em] text-white/70">&amp;</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-3">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
                  className="text-gradient block text-[10.5vw] leading-[0.95] sm:text-[80px] lg:text-[104px]"
                >
                  Workflow Automation
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
              className="mt-8 max-w-2xl text-base leading-[1.75] text-white/65 sm:text-lg"
            >
              {SITE_BRAND.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={onStartPresentation}
                  className="btn-liquid btn-liquid-primary py-2.5 pl-7 pr-2.5 text-[15px]"
                >
                  Start Presentation
                  <span className="btn-icon-bubble h-10 w-10">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId("practical-demonstration")}
                  className="btn-liquid px-7 py-4 text-[15px]"
                >
                  Explore Solutions
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* scroll cue */}
          <motion.button
            type="button"
            onClick={() => scrollToId("table-of-contents")}
            aria-label="Scroll to Table of Contents"
            style={{ opacity: contentOpacity }}
            className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/10">
              <span className="scroll-cue-line absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-[#ff6d5a]" />
            </span>
          </motion.button>
        </section>
      </div>

      {/* Integration marquee */}
      <div className="relative z-10 border-y border-white/[0.06] bg-[#04050a]/60 py-7 backdrop-blur-xl">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-4">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
              <span
                key={i}
                className="glass inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white/75"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#ff6d5a] to-[#8b5cf6]" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
