"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronUp,
  ChevronDown,
  X,
  List,
  Compass,
  FileDown,
  GripHorizontal,
} from "lucide-react";
import { MAIN_PRESENTATION_SECTIONS } from "@/content/navigation";
import { cn } from "@/lib/utils";

interface PresentationModeOverlayProps {
  active: boolean;
  currentSlideIdx: number;
  totalSlides: number;
  onSelectSlide: (idx: number) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  showOptional: boolean;
  onToggleOptional: () => void;
  onExit: () => void;
  onExportPdf: () => void;
}

/**
 * Portal-mounted Vertical, Side-Positioned, Draggable Presentation Controller.
 * Mounts directly into document.body at z-[99999] so it is ALWAYS visible above
 * fullscreen slides and never clipped by any parent container.
 */
export function PresentationModeOverlay(props: PresentationModeOverlayProps) {
  if (!props.active || typeof document === "undefined") return null;
  return createPortal(
    <PresentationModeOverlayInner {...props} />,
    document.body
  );
}

function PresentationModeOverlayInner({
  currentSlideIdx,
  totalSlides,
  onSelectSlide,
  onPrevSlide,
  onNextSlide,
  showOptional,
  onToggleOptional,
  onExit,
  onExportPdf,
}: PresentationModeOverlayProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragState = useRef<{
    dragging: boolean;
    offsetX: number;
    offsetY: number;
  }>({ dragging: false, offsetX: 0, offsetY: 0 });
  const railRef = useRef<HTMLDivElement>(null);

  const currentSection =
    MAIN_PRESENTATION_SECTIONS[currentSlideIdx] ??
    MAIN_PRESENTATION_SECTIONS[0];

  // Keyboard navigation across single-slide deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        onNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        onPrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNextSlide, onPrevSlide, onExit]);

  // Smooth pointer drag & drop constrained cleanly within viewport
  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragState.current.dragging || !railRef.current) return;
      const rect = railRef.current.getBoundingClientRect();
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);
      const nextX = Math.min(
        maxX,
        Math.max(8, e.clientX - dragState.current.offsetX)
      );
      const nextY = Math.min(
        maxY,
        Math.max(8, e.clientY - dragState.current.offsetY)
      );
      setPos({ x: nextX, y: nextY });
    };

    const handleUp = () => {
      dragState.current.dragging = false;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    dragState.current = {
      dragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const isOnLeftHalf =
    pos !== null && typeof window !== "undefined" && pos.x < window.innerWidth / 2;

  return (
    <div
      ref={railRef}
      data-presentation-rail="true"
      style={
        pos
          ? { left: `${pos.x}px`, top: `${pos.y}px` }
          : { right: "20px", top: "50%", transform: "translateY(-50%)" }
      }
      className="no-print fixed z-[99999] flex items-center gap-3"
    >
      {/* Slide Jump Popover opening inward */}
      {drawerOpen && !isOnLeftHalf && (
        <SlideJumpPopover
          currentSlideIdx={currentSlideIdx}
          onSelect={(i) => {
            onSelectSlide(i);
            setDrawerOpen(false);
          }}
        />
      )}

      {/* High-Contrast Vertical Draggable Control Rail */}
      <div className="flex flex-col items-center gap-2 rounded-full border-2 border-[#5B3DF5]/30 bg-white/95 px-2.5 py-3 text-[#171924] shadow-[0_20px_50px_rgba(32,37,70,0.28)] backdrop-blur-xl">
        {/* Drag Handle */}
        <button
          type="button"
          onPointerDown={startDrag}
          aria-label="Drag presentation controls"
          title="Drag to move anywhere on screen"
          className="flex h-7 w-9 cursor-grab items-center justify-center rounded-full bg-[#F3F4FA] text-[#5B3DF5] transition-colors hover:bg-[#EDE9FE] active:cursor-grabbing"
        >
          <GripHorizontal className="h-4 w-4" />
        </button>

        {/* Current Slide Indicator + Menu Toggle */}
        <button
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          title={`Slide ${currentSlideIdx + 1} of ${totalSlides}: ${currentSection.label}`}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-2xl px-2 py-1.5 font-mono text-[11px] font-bold transition-colors",
            drawerOpen
              ? "bg-[#EDE9FE] text-[#5B3DF5]"
              : "text-[#171924] hover:bg-[#F3F4FA]"
          )}
        >
          <List className="mb-0.5 h-3.5 w-3.5 text-[#5B3DF5]" />
          <span>{String(currentSlideIdx + 1).padStart(2, "0")}</span>
          <span className="my-0.5 h-px w-4 bg-[#D2D6E6]" />
          <span className="text-[10px] text-[#70778C]">
            {String(totalSlides).padStart(2, "0")}
          </span>
        </button>

        <span className="h-px w-6 bg-[#E2E6F2]" />

        {/* Previous Slide */}
        <button
          type="button"
          onClick={onPrevSlide}
          disabled={currentSlideIdx === 0}
          aria-label="Previous slide"
          title="Previous slide (Left Arrow)"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D8DDF0] bg-white text-[#171924] transition-colors hover:border-[#5B3DF5] hover:text-[#5B3DF5] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronUp className="h-4 w-4" />
        </button>

        {/* Next Slide */}
        <button
          type="button"
          onClick={onNextSlide}
          disabled={currentSlideIdx >= totalSlides - 1}
          aria-label="Next slide"
          title="Next slide (Right Arrow)"
          className="neu-purple-orb inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        <span className="h-px w-6 bg-[#E2E6F2]" />

        {/* Optional Appendix Toggle */}
        <button
          type="button"
          onClick={onToggleOptional}
          aria-label="Toggle optional material"
          title={showOptional ? "Hide Optional Material" : "Show Optional Material"}
          className={cn(
            "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors",
            showOptional
              ? "border-[#5B3DF5] bg-[#EDE9FE] text-[#5B3DF5]"
              : "border-[#D8DDF0] bg-white text-[#43495D] hover:text-[#5B3DF5]"
          )}
        >
          <Compass className="h-4 w-4" />
        </button>

        {/* Export PDF */}
        <button
          type="button"
          onClick={onExportPdf}
          aria-label="Download PDF"
          title="Download formatted PDF"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D8DDF0] bg-white text-[#43495D] transition-colors hover:border-[#5B3DF5] hover:text-[#5B3DF5]"
        >
          <FileDown className="h-4 w-4" />
        </button>

        {/* Exit Fullscreen Presentation */}
        <button
          type="button"
          onClick={onExit}
          aria-label="Exit presentation mode"
          title="Exit Presentation (Esc)"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#D8DDF0] bg-[#F4F5FA] text-[#171924] transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {drawerOpen && isOnLeftHalf && (
        <SlideJumpPopover
          currentSlideIdx={currentSlideIdx}
          onSelect={(i) => {
            onSelectSlide(i);
            setDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
}

function SlideJumpPopover({
  currentSlideIdx,
  onSelect,
}: {
  currentSlideIdx: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="w-72 rounded-[22px] border border-[#D8DDF0] bg-white/98 p-3.5 text-[#171924] shadow-[0_20px_50px_rgba(32,37,70,0.22)] backdrop-blur-xl">
      <p className="mb-2 border-b border-[#E6EAF4] pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B3DF5]">
        Jump to Slide (01–09)
      </p>
      <div className="space-y-1">
        {MAIN_PRESENTATION_SECTIONS.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => onSelect(idx)}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs transition-colors",
              idx === currentSlideIdx
                ? "bg-[#EDE9FE] font-bold text-[#5B3DF5]"
                : "text-[#374151] hover:bg-[#F4F5FA]"
            )}
          >
            <span className="font-mono font-bold text-[#5B3DF5]">
              {sec.number}
            </span>
            <span className="truncate">{sec.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
