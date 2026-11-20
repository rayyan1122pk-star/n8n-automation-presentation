"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Presentation,
  FileDown,
  Menu,
  X,
  BookOpen,
  Compass,
  ExternalLink,
} from "lucide-react";
import {
  MAIN_PRESENTATION_SECTIONS,
  ADDITIONAL_MATERIAL_LINKS,
  SITE_BRAND,
  type AdditionalMaterialLink,
} from "@/content/navigation";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeSectionId: string;
  scrollProgress: number;
  overHero: boolean;
  onStartPresentation: () => void;
  onExportPdf: () => void;
  onOpenExploreTab: (tab: AdditionalMaterialLink["tabKey"]) => void;
}

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

  useEffect(() => {
    if (!openMenu) return;
    const handleOutside = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
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

  const scrollTo = (id: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdditionalClick = (tab: AdditionalMaterialLink["tabKey"]) => {
    setOpenMenu(null);
    setMobileOpen(false);
    onOpenExploreTab(tab);
  };

  return (
    <header ref={headerRef} className="no-print fixed left-0 right-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-200 backdrop-blur-xl",
          overHero
            ? "border-white/80 bg-[#E6E8F4]/78 text-[#171924]"
            : "border-white/90 bg-[#DFE2F0]/94 text-[#171924]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          {/* Left: Clean Presentation Identity */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex cursor-pointer items-center gap-2.5 text-left"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
            <span className="font-display text-sm font-bold uppercase tracking-[0.14em]">
              {SITE_BRAND.name}
            </span>
          </button>

          {/* Center: Clean Two-Level Navigation (Main Presentation + Additional Material) */}
          <nav
            aria-label="Presentation navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {/* Level 1: Main Presentation (9 Headings) */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((m) => (m === "main" ? null : "main"))
                }
                aria-expanded={openMenu === "main"}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#171924] transition-colors hover:text-[#5B3DF5]"
              >
                <BookOpen className="h-4 w-4 text-[#5B3DF5]" />
                <span>Main Presentation (9)</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    openMenu === "main" ? "rotate-180" : ""
                  )}
                />
              </button>

              {openMenu === "main" && (
                <div className="absolute left-0 top-11 z-50 w-[360px] rounded-2xl border border-[#E5E7EB] bg-white p-2.5 text-[#18181B] shadow-[0_20px_50px_rgba(17,24,39,0.12)]">
                  <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                    Main Presentation Flow
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {MAIN_PRESENTATION_SECTIONS.map((sec) => {
                      const active = activeSectionId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => scrollTo(sec.id)}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                            active
                              ? "bg-[#F5F3FF] font-semibold text-[#6D28D9]"
                              : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#18181B]"
                          )}
                        >
                          <span className="font-mono text-xs font-semibold text-[#7C3AED]">
                            {sec.number}
                          </span>
                          <span>{sec.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollTo("practical-demonstration")}
              className={cn(
                "cursor-pointer text-sm font-medium transition-colors",
                activeSectionId === "practical-demonstration"
                  ? "font-semibold text-[#5B3DF5]"
                  : "text-[#43495D] hover:text-[#5B3DF5]"
              )}
            >
              Practical Demonstration
            </button>

            {/* Level 2: Additional Material (Optional Appendix) */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((m) => (m === "additional" ? null : "additional"))
                }
                aria-expanded={openMenu === "additional"}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#555C73] transition-colors hover:text-[#5B3DF5]"
              >
                <Compass className="h-4 w-4" />
                <span>Additional Material</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    openMenu === "additional" ? "rotate-180" : ""
                  )}
                />
              </button>

              {openMenu === "additional" && (
                <div className="absolute left-0 top-11 z-50 w-[330px] rounded-2xl border border-[#E5E7EB] bg-white p-2.5 text-[#18181B] shadow-[0_20px_50px_rgba(17,24,39,0.12)]">
                  <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                    Optional Supporting Resources
                  </p>
                  <div className="mt-1 space-y-1">
                    {ADDITIONAL_MATERIAL_LINKS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleAdditionalClick(item.tabKey)}
                        className="flex w-full cursor-pointer flex-col rounded-xl px-3 py-2 text-left transition-colors hover:bg-[#F5F3FF]"
                      >
                        <span className="text-sm font-medium text-[#18181B]">
                          {item.label}
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          {item.description}
                        </span>
                      </button>
                    ))}
                    <Link
                      href="/print"
                      onClick={() => setOpenMenu(null)}
                      className="mt-1 flex items-center justify-between rounded-xl border-t border-[#F3F4F6] px-3 py-2.5 text-sm font-medium text-[#6D28D9] hover:bg-[#F5F3FF]"
                    >
                      <span>Open Printable PDF Preview</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Focused Presentation & PDF Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onExportPdf}
              className="hidden cursor-pointer items-center gap-1.5 rounded-xl border border-white/80 bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#171924] shadow-sm transition-colors hover:border-[#C4B5FD] hover:text-[#5B3DF5] sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onStartPresentation}
              className="quantum-cta-btn inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white"
            >
              <Presentation className="h-3.5 w-3.5" />
              <span>Start Presentation</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/80 bg-white/85 text-[#171924] lg:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Clean Thin Progress Bar */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-full bg-[#7C3AED] transition-[width] duration-150 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-[#E5E7EB] bg-white px-5 py-5 text-[#18181B] shadow-xl lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            Main Presentation (9 Headings)
          </p>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {MAIN_PRESENTATION_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollTo(sec.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm",
                  activeSectionId === sec.id
                    ? "bg-[#F5F3FF] font-semibold text-[#6D28D9]"
                    : "text-[#374151] hover:bg-[#F9FAFB]"
                )}
              >
                <span className="font-mono text-xs text-[#7C3AED]">
                  {sec.number}
                </span>
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-[#ECEBF2] pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
              Additional Material
            </p>
            <div className="flex flex-wrap gap-2">
              {ADDITIONAL_MATERIAL_LINKS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleAdditionalClick(item.tabKey)}
                  className="cursor-pointer rounded-lg border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#374151] hover:border-[#C4B5FD] hover:text-[#6D28D9]"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onExportPdf();
                }}
                className="cursor-pointer rounded-lg border border-[#DDD6FE] bg-[#F5F3FF] px-3 py-1.5 text-xs font-semibold text-[#6D28D9]"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
