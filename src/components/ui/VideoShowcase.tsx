"use client";

import React, { useState, useRef } from "react";
import { Play, Film, CheckCircle2, FolderOpen } from "lucide-react";
import type { VideoSpec } from "@/content/solutions";

interface VideoShowcaseProps {
  video: VideoSpec;
  solutionName: string;
}

export function VideoShowcase({ video, solutionName }: VideoShowcaseProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [videoMissing, setVideoMissing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sources = [
    video.primaryPath,
    ...(video.fallbackPath !== video.primaryPath ? [video.fallbackPath] : []),
  ];

  const handleVideoError = () => {
    if (srcIndex + 1 < sources.length) {
      setSrcIndex(srcIndex + 1);
    } else {
      setVideoMissing(true);
    }
  };

  const handlePlayClick = () => {
    if (!videoRef.current || videoMissing) return;
    setIsPlaying(true);
    videoRef.current.play().catch(() => {
      setVideoMissing(true);
      setIsPlaying(false);
    });
  };

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
      {/* Left: Spacious Video Player */}
      <div className="lg:col-span-7">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#141022] shadow-[0_10px_30px_rgba(17,24,39,0.08)]">
          {!videoMissing ? (
            <>
              <video
                ref={videoRef}
                key={sources[srcIndex]}
                src={sources[srcIndex]}
                poster={video.posterPrimaryPath}
                controls={isPlaying}
                preload="metadata"
                onError={handleVideoError}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />

              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141022]/80 p-6 text-center">
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    aria-label={`Play ${video.title}`}
                    className="quantum-cta-btn mb-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full text-white"
                  >
                    <Play className="ml-0.5 h-6 w-6 fill-white" />
                  </button>
                  <p className="font-display text-lg font-semibold text-white">
                    {video.title}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#C4B5FD]">
                    {sources[srcIndex]}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#FAF9FE] p-8 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[#DDD6FE] bg-white text-[#7C3AED]">
                <Film className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-semibold text-[#18181B]">
                {solutionName} Recorded Demonstration
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#6B7280]">
                Place your local MP4 screen recording at the path below to play it directly here.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#DDD6FE] bg-white px-3.5 py-2 font-mono text-xs text-[#6D28D9]">
                <FolderOpen className="h-3.5 w-3.5" />
                <span>public{video.primaryPath}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Clean, Readable Walkthrough Explanation */}
      <div className="lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
          Demonstration Video
        </p>
        <h4 className="mt-2 font-display text-2xl font-bold text-[#18181B]">
          {video.title}
        </h4>
        <p className="mt-3 text-base leading-relaxed text-[#4B5563]">
          {video.summary}
        </p>

        <ul className="mt-6 space-y-3">
          {video.demonstrates.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[#374151]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
