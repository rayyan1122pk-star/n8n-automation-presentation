"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { PrintDeckDocument } from "@/components/print/PrintDeckDocument";

export default function PrintPreviewPage() {
  const handlePrint = useCallback(async () => {
    const root = document.getElementById("print-deck-root");
    if (root) {
      const imgs = Array.from(root.querySelectorAll("img"));
      await Promise.allSettled(
        imgs.map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise<void>((resolve) => {
            const done = () => resolve();
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
            setTimeout(done, 2500);
          });
        })
      );
    }
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-[#CFD4E8] text-[#171924]">
      {/* Clean Print Preview Toolbar */}
      <div className="no-print sticky top-0 z-50 border-b border-white/80 bg-[#DFE2F0]/95 px-6 py-3.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#171924] transition-colors hover:text-[#5B3DF5]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Presentation</span>
            </Link>
            <div>
              <p className="font-display text-sm font-bold text-[#171924]">
                N8N &amp; AUTOMATION — Exact A4 Landscape PDF Preview
              </p>
              <p className="text-xs text-[#43495D]">
                Every slide is locked to A4 Landscape (297mm × 210mm) with zero overflow. Choose Landscape + Margins: None + Background Graphics ON when saving.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="quantum-cta-btn inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white"
          >
            <Printer className="h-4 w-4" />
            <span>Save / Print as PDF</span>
          </button>
        </div>
      </div>

      {/* Exact 1:1 A4 Landscape Artboards */}
      <div className="overflow-x-auto pb-12">
        <PrintDeckDocument previewMode />
      </div>
    </div>
  );
}
