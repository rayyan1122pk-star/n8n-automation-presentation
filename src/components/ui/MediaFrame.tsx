"use client";

import React, { useState } from "react";
import { ImageIcon, Maximize2, X, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  primaryPath: string;
  fallbackPath?: string;
  stockFallbackUrl?: string;
  title: string;
  caption?: string;
  tag?: string;
  aspectClass?: string;
  className?: string;
  allowZoom?: boolean;
}

export function MediaFrame(props: MediaFrameProps) {
  return (
    <MediaFrameInner
      key={`${props.primaryPath}|${props.fallbackPath ?? ""}|${props.stockFallbackUrl ?? ""}`}
      {...props}
    />
  );
}

/**
 * Unobstructed screenshot & visual presentation frame.
 * Zero text overlays on top of screenshots — explanations and paths sit cleanly underneath.
 */
function MediaFrameInner({
  primaryPath,
  fallbackPath,
  stockFallbackUrl,
  title,
  caption,
  aspectClass = "aspect-[16/10]",
  className,
  allowZoom = true,
}: MediaFrameProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [failedAll, setFailedAll] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const localCandidates = [
    primaryPath,
    ...(fallbackPath && fallbackPath !== primaryPath ? [fallbackPath] : []),
  ];
  const candidates = [
    ...localCandidates,
    ...(stockFallbackUrl ? [stockFallbackUrl] : []),
  ];

  const currentSrc = candidates[srcIndex];
  const isShowingStock = Boolean(
    stockFallbackUrl && currentSrc === stockFallbackUrl && !failedAll && loaded
  );

  const handleError = () => {
    if (srcIndex + 1 < candidates.length) {
      setSrcIndex(srcIndex + 1);
    } else {
      setFailedAll(true);
    }
  };

  return (
    <>
      <figure className={cn("w-full", className)}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_6px_24px_rgba(17,24,39,0.05)]">
          <div className={cn("relative w-full overflow-hidden bg-white/[0.035]", aspectClass)}>
            {!failedAll && currentSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentSrc}
                alt={title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={handleError}
                onClick={() => loaded && allowZoom && setZoomed(true)}
                className={cn(
                  "h-full w-full transition-opacity duration-300",
                  isShowingStock ? "object-cover" : "object-contain bg-white/[0.04]",
                  loaded ? "opacity-100" : "opacity-0",
                  loaded && allowZoom ? "cursor-zoom-in" : ""
                )}
              />
            )}

            {/* Clean Light Blueprint Placeholder when no image is supplied yet */}
            {(failedAll || !loaded) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.035] p-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#ff6d5a]/25 bg-white/[0.04] text-[#ff8a73]">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-white">
                  {title}
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                  Place your actual project screenshot at the path below to display it here at full resolution.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#ff6d5a]/25 bg-white/[0.04] px-3.5 py-2 font-mono text-xs text-[#ff8a73]">
                  <FolderOpen className="h-3.5 w-3.5 shrink-0" />
                  <span>public{primaryPath}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clean, readable caption & inspect control BELOW the image (never covering the image) */}
        <figcaption className="mt-3.5 flex flex-wrap items-start justify-between gap-3 px-1">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white">{title}</p>
            {caption && (
              <p className="mt-1 text-sm leading-relaxed text-white/50">
                {caption}
              </p>
            )}
            {isShowingStock && (
              <p className="mt-1 font-mono text-xs text-[#ff8a73]">
                Representative visual · Replace with actual screenshot at public{primaryPath}
              </p>
            )}
          </div>

          {!failedAll && loaded && allowZoom && (
            <button
              type="button"
              onClick={() => setZoomed(true)}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-[#ff6d5a]/40 hover:text-[#ff8a73]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>View Full Size</span>
            </button>
          )}
        </figcaption>
      </figure>

      {/* Clean Fullscreen Lightbox */}
      {zoomed && !failedAll && currentSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0B1A]/85 p-6 backdrop-blur-sm"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-[94vw] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="font-mono text-xs text-white/50">
                  {isShowingStock ? `public${primaryPath}` : currentSrc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Close fullscreen view"
                className="cursor-pointer rounded-lg border border-white/10 p-2 text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto bg-white/[0.035] p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSrc}
                alt={title}
                className="mx-auto max-h-[76vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
