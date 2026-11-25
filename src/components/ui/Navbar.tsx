"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Presentation,
  FileDown,
  Menu,
  X,
  BookOpen,
  Compass,
  ExternalLink,
  Play,
} from "lucide-react";
import {
  MAIN_PRESENTATION_SECTIONS,
  ADDITIONAL_MATERIAL_LINKS,
  SITE_BRAND,
  type AdditionalMaterialLink,
} from "@/content/navigation";
import { cn } from "@/lib/utils";
import { EASE, scrollToId } from "@/components/premium/motion";

interface NavbarProps {
  activeSectionId: string;
  scrollProgress: number;
  overHero: boolean;
  onStartPresentation: () => void;
  onExportPdf: () => void;
  onOpenExploreTab: (tab: AdditionalMaterialLink["tabKey"]) => void;
}

const panelMotion = {
  initial: { opacity: 0, y: -8, scale: 0.96, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, scale: 0.97, filter: "blur(4px)" },
  transition: { duration: 0.35, ease: EASE },
};

export function Navbar({
  activeSectionId,
  scrollProgress,
  overHero,
  onStartPresentation,
  onExportPdf,
  onOpenExploreTab,
}: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<"main" | "additional" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const activeSection = MAIN_PRESENTATION_SECTIONS.find((s) => s.id === activeSectionId);

  useEffect(() => {
    if (!openMenu) return;
    const handleOutside = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("pointerdown", handleOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("pointerdown", handleOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openMenu]);

  const go = (id: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
    scrollToId(id);
  };

  const handleAdditionalClick = (tab: AdditionalMaterialLink["tabKey"]) => {
    setOpenMenu(null);
    setMobileOpen(false);
    onOpenExploreTab(tab);
  };

  // progress ring
  const R = 15;
  const C = 2 * Math.PI * R;

  return (
    <header ref={headerRef} className="no-print fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        className={cn(
          "glass-strong flex w-full max-w-[1100px] items-center justify-between gap-3 rounded-full py-2 pl-2.5 pr-2 transition-[background] duration-500",
          !overHero && "bg-[#0a0b14]/60"
        )}
      >
        {/* Brand + progress ring */}
        <button type="button" onClick={() => go("home")} className="flex cursor-pointer items-center gap-3 rounded-full pr-3">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
              <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <circle
                cx="20"
                cy="20"
                r={R}
                fill="none"
                stroke="url(#navGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (C * Math.min(100, scrollProgress)) / 100}
              />
              <defs>
                <linearGradient id="navGrad" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ff6d5a" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#ff6d5a] to-[#ea4b71] shadow-[0_0_12px_rgba(255,109,90,0.9)]" />
          </span>
          <span className="hidden flex-col text-left sm:flex">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-white">{SITE_BRAND.name}</span>
            <span className="h-4 overflow-hidden font-mono text-[10px] text-white/45">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection?.id ?? "cover"}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {activeSection ? `${activeSection.number} · ${activeSection.shortLabel}` : "Cover"}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Presentation navigation" className="hidden items-center gap-1 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((m) => (m === "main" ? null : "main"))}
              aria-expanded={openMenu === "main"}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white",
                openMenu === "main" && "bg-white/[0.08] text-white"
              )}
            >
              <BookOpen className="h-4 w-4 text-[#ff8a73]" />
              Main Presentation (9)
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === "main" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openMenu === "main" && (
                <motion.div
                  {...panelMotion}
                  className="glass-strong absolute left-1/2 top-[calc(100%+14px)] w-[420px] -translate-x-1/2 rounded-[28px] bg-[#0b0c16]/80 p-2.5"
                >
                  {MAIN_PRESENTATION_SECTIONS.map((sec) => {
                    const active = sec.id === activeSectionId;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => go(sec.id)}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-4 rounded-[18px] px-4 py-3 text-left transition-colors",
                          active ? "bg-white/[0.1]" : "hover:bg-white/[0.06]"
                        )}
                      >
                        <span className={cn("font-mono text-xs", active ? "text-[#ff8a73]" : "text-white/35")}>{sec.number}</span>
                        <span className={cn("text-sm font-medium", active ? "text-white" : "text-white/75")}>{sec.label}</span>
                        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#ff6d5a] shadow-[0_0_8px_#ff6d5a]" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => go("practical-demonstration")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live Demo
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((m) => (m === "additional" ? null : "additional"))}
              aria-expanded={openMenu === "additional"}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white",
                openMenu === "additional" && "bg-white/[0.08] text-white"
              )}
            >
              <Compass className="h-4 w-4 text-[#a5b4fc]" />
              Additional Material
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openMenu === "additional" && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openMenu === "additional" && (
                <motion.div
                  {...panelMotion}
                  className="glass-strong absolute right-0 top-[calc(100%+14px)] w-[360px] rounded-[28px] bg-[#0b0c16]/80 p-2.5"
                >
                  {ADDITIONAL_MATERIAL_LINKS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleAdditionalClick(item.tabKey)}
                      className="block w-full cursor-pointer rounded-[18px] px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
                    >
                      <span className="block text-sm font-semibold text-white">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-white/45">{item.description}</span>
                    </button>
                  ))}
                  <Link
                    href="/print"
                    onClick={() => setOpenMenu(null)}
                    className="mt-1 flex items-center justify-between rounded-[18px] border-t border-white/[0.06] px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    Print-ready slide deck
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportPdf}
            aria-label="Download PDF"
            className="btn-liquid hidden h-11 w-11 sm:inline-flex"
          >
            <FileDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onStartPresentation}
            className="btn-liquid btn-liquid-primary hidden py-1.5 pl-5 pr-1.5 text-sm sm:inline-flex"
          >
            Present
            <span className="btn-icon-bubble h-8 w-8">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="btn-liquid h-11 w-11 lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            {...panelMotion}
            className="glass-strong absolute inset-x-4 top-[calc(100%+12px)] max-h-[75vh] overflow-y-auto rounded-[30px] bg-[#0b0c16]/85 p-3 lg:hidden"
          >
            <p className="px-3 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Main Presentation (9)</p>
            {MAIN_PRESENTATION_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => go(sec.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-[16px] px-3 py-3 text-left text-sm",
                  sec.id === activeSectionId ? "bg-white/[0.1] text-white" : "text-white/75"
                )}
              >
                <span className="font-mono text-xs text-[#ff8a73]">{sec.number}</span>
                {sec.label}
              </button>
            ))}
            <p className="px-3 pb-2 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Additional Material</p>
            {ADDITIONAL_MATERIAL_LINKS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleAdditionalClick(item.tabKey)}
                className="block w-full cursor-pointer rounded-[16px] px-3 py-3 text-left text-sm text-white/75"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setMobileOpen(false); onExportPdf(); }} className="btn-liquid py-3 text-sm">
                <FileDown className="h-4 w-4" /> PDF
              </button>
              <button type="button" onClick={() => { setMobileOpen(false); onStartPresentation(); }} className="btn-liquid btn-liquid-primary py-3 text-sm">
                <Presentation className="h-4 w-4" /> Present
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
