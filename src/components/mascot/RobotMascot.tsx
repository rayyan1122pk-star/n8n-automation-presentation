"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Sun, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RobotMascotProps {
  presentationMode: boolean;
  currentSlideIdx: number;
  activeSectionId: string;
}

type EyeMood =
  | "normal"
  | "blink"
  | "happy"
  | "curious"
  | "attentive"
  | "wink"
  | "sleepy";

interface DockPosition {
  name: string;
  x: number;
  y: number;
  align: "left" | "right";
}

const SECTION_COMMENTS: Record<number, string> = {
  0: "Ready to present! 🚀",
  1: "Trigger → Action flow! ⚡",
  2: "Execution lifecycle! 🔄",
  3: "Nodes, Triggers & Keys! 🔑",
  4: "AI Neural Core online! 🧠",
  5: "9 Real-world business cases! 💼",
  6: "Measurable ROI & speed! ⏱️",
  7: "FinFlow LIVE Demo! ⚡✨",
  8: "The Future of AI Automation! 🔮",
};

const CLICK_QUOTES = [
  "Automating like a pro! ⚡",
  "n8n + AI = Superpower 🚀",
  "Smooth workflows ahead! ✨",
  "Looking sharp! Keep going! 💡",
  "Use ← → arrows to navigate! ⌨️",
  "Autonomous agents ready! 🤖",
  "High efficiency, zero clutter! 🎯",
];

export function RobotMascot({
  presentationMode,
  currentSlideIdx,
  activeSectionId,
}: RobotMascotProps) {
  // Robot emotional & physical state
  const [mood, setMood] = useState<EyeMood>("normal");
  const [isHovered, setIsHovered] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [speechKey, setSpeechKey] = useState<number>(0);

  // Digital eyes pupil tracking (-5px to +5px) & head tilt (-7deg to +7deg)
  const [lookOffset, setLookOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [headTilt, setHeadTilt] = useState<number>(0);

  // Position state (screen coordinates)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isCustomDragged, setIsCustomDragged] = useState(false);
  const [isGliding, setIsGliding] = useState(false);
  const [dockIndex, setDockIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prevSlideRef = useRef<number>(currentSlideIdx);
  const prevPresModeRef = useRef<boolean>(presentationMode);

  // Helper to trigger temporary speech bubble
  const triggerSpeech = useCallback((text: string, duration = 3000) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechText(text);
    setSpeechKey((prev) => prev + 1);
    speechTimerRef.current = setTimeout(() => {
      setSpeechText(null);
    }, duration);
  }, []);

  // Compute safe peripheral docking zones based on window dimensions
  const getDockPositions = useCallback((): DockPosition[] => {
    if (typeof window === "undefined") return [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Small screens (mobile / tablet): strictly bottom right
    if (w < 768) {
      return [
        {
          name: "mobile-corner",
          x: Math.max(14, w - 76),
          y: Math.max(16, h - 96),
          align: "right",
        },
      ];
    }

    // Desktop presentation & page mode: spacious safe periphery
    // Sits in outer margins to never obstruct content or the slide rail
    return [
      {
        name: "bottom-right-safe",
        x: Math.max(20, w - 116),
        y: Math.max(24, h - 132),
        align: "right",
      },
      {
        name: "mid-left-margin",
        x: 32,
        y: Math.max(120, h * 0.44),
        align: "left",
      },
      {
        name: "lower-left-safe",
        x: 36,
        y: Math.max(24, h - 132),
        align: "left",
      },
      {
        name: "mid-right-lower",
        x: Math.max(20, w - 116),
        y: Math.max(120, h * 0.72),
        align: "right",
      },
      {
        name: "top-left-safe",
        x: 32,
        y: 114,
        align: "left",
      },
    ];
  }, []);

  // Initialize position on mount or resize
  useEffect(() => {
    const handleResize = () => {
      if (isCustomDragged) return; // Keep user's custom placement
      const docks = getDockPositions();
      if (docks.length > 0) {
        setPosition({ x: docks[0].x, y: docks[0].y });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getDockPositions, isCustomDragged]);

  // Periodic natural blinking (every 3s - 6.5s)
  useEffect(() => {
    if (isSleeping) return;

    let timeoutId: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = Math.random() * 3500 + 2800;
      timeoutId = setTimeout(() => {
        setMood((prev) =>
          prev === "normal" || prev === "attentive" ? "blink" : prev
        );
        setTimeout(() => {
          setMood((prev) => (prev === "blink" ? "normal" : prev));
          scheduleNextBlink();
        }, 170);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, [isSleeping]);

  // Occasional natural looking around and subtle head tilts (every 9 - 16s)
  useEffect(() => {
    if (isSleeping || isHovered) return;

    const intervalId = setInterval(() => {
      const r = Math.random();
      if (r < 0.4) {
        // Look toward presentation heading / center
        const isRightSide = position ? position.x > window.innerWidth / 2 : true;
        setLookOffset({ x: isRightSide ? -4 : 4, y: -2 });
        setHeadTilt(isRightSide ? -4 : 4);
        setMood("attentive");
      } else if (r < 0.75) {
        // Subtle tilt & curious look
        const tilt = Math.random() > 0.5 ? 5 : -5;
        setHeadTilt(tilt);
        setLookOffset({ x: tilt > 0 ? 3 : -3, y: 1 });
        setMood("curious");
      } else {
        // Centered
        setLookOffset({ x: 0, y: 0 });
        setHeadTilt(0);
        setMood("normal");
      }

      // Return to neutral after 3 seconds
      setTimeout(() => {
        setLookOffset({ x: 0, y: 0 });
        setHeadTilt(0);
        setMood((prev) =>
          prev === "curious" || prev === "attentive" ? "normal" : prev
        );
      }, 3200);
    }, 12000);

    return () => clearInterval(intervalId);
  }, [isSleeping, isHovered, position]);

  // Occasional calm wandering between safe peripheral docking zones (every 30 - 45s)
  useEffect(() => {
    if (isSleeping || isCustomDragged) return;

    const wanderTimer = setInterval(() => {
      const docks = getDockPositions();
      if (docks.length <= 1) return;

      const nextIdx = (dockIndex + 1) % docks.length;
      setDockIndex(nextIdx);
      const target = docks[nextIdx];

      setIsGliding(true);
      if (position) {
        const goingRight = target.x > position.x;
        setHeadTilt(goingRight ? 5 : -5);
      }

      setPosition({ x: target.x, y: target.y });

      setTimeout(() => {
        setIsGliding(false);
        setHeadTilt(0);
      }, 2300);
    }, 34000);

    return () => clearInterval(wanderTimer);
  }, [isSleeping, isCustomDragged, dockIndex, getDockPositions, position]);

  // Interactive Cursor Eye-Tracking on Hover
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isSleeping || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const maxOffset = 4.5;
    const nx = Math.max(-maxOffset, Math.min(maxOffset, dx / 14));
    const ny = Math.max(-maxOffset, Math.min(maxOffset, dy / 14));

    setLookOffset({ x: nx, y: ny });
    setHeadTilt(Math.max(-5, Math.min(5, nx * 1.2)));
  };

  // Entrance reaction when presentation mode starts
  useEffect(() => {
    if (presentationMode && !prevPresModeRef.current) {
      setIsCelebrating(true);
      setIsWaving(true);
      setMood("happy");
      triggerSpeech("Welcome to the Presentation! 🚀", 3400);

      // Slide in smoothly to safe dock
      const docks = getDockPositions();
      if (docks.length > 0 && !isCustomDragged) {
        setPosition({ x: docks[0].x, y: docks[0].y });
      }

      setTimeout(() => {
        setIsCelebrating(false);
        setIsWaving(false);
        setMood("normal");
      }, 2200);
    }
    prevPresModeRef.current = presentationMode;
  }, [presentationMode, triggerSpeech, getDockPositions, isCustomDragged]);

  // Section Change Awareness & Reactions
  useEffect(() => {
    if (currentSlideIdx !== prevSlideRef.current) {
      const isFinFlowDemo = currentSlideIdx === 7; // Section 08: Practical Demonstration
      const comment =
        SECTION_COMMENTS[currentSlideIdx] || `Slide 0${currentSlideIdx + 1} 🎯`;

      if (isFinFlowDemo) {
        // Special celebratory reaction for Section 08 FinFlow Live Demo!
        setIsCelebrating(true);
        setIsWaving(true);
        setMood("happy");
        triggerSpeech("⚡ FinFlow Live Demo! Watch the engine run!", 4200);

        setTimeout(() => {
          setIsCelebrating(false);
          setIsWaving(false);
          setMood("normal");
        }, 3000);
      } else {
        // Small friendly greeting for new section
        setIsWaving(true);
        setMood("attentive");
        setLookOffset({ x: -3.5, y: -2.5 });
        triggerSpeech(comment, 2600);

        // ~35% chance to glide to an alternate safe dock on section transition
        if (!isCustomDragged && Math.random() < 0.35) {
          const docks = getDockPositions();
          if (docks.length > 1) {
            const nextIdx = (dockIndex + 1) % docks.length;
            setDockIndex(nextIdx);
            setIsGliding(true);
            setPosition({ x: docks[nextIdx].x, y: docks[nextIdx].y });
            setTimeout(() => setIsGliding(false), 2200);
          }
        }

        setTimeout(() => {
          setIsWaving(false);
          setLookOffset({ x: 0, y: 0 });
          setMood("normal");
        }, 1800);
      }

      prevSlideRef.current = currentSlideIdx;
    }
  }, [currentSlideIdx, triggerSpeech, isCustomDragged, dockIndex, getDockPositions]);

  // Click handler: friendly playful reaction & quote
  const handleRobotClick = () => {
    if (isSleeping) {
      setIsSleeping(false);
      setMood("happy");
      triggerSpeech("I'm awake and ready! ✨", 2400);
      return;
    }

    setIsCelebrating(true);
    setIsWaving(true);
    setMood("happy");

    const randomQuote =
      CLICK_QUOTES[Math.floor(Math.random() * CLICK_QUOTES.length)];
    triggerSpeech(randomQuote, 2800);

    setTimeout(() => {
      setIsCelebrating(false);
      setIsWaving(false);
      setMood("normal");
    }, 2000);
  };

  // Toggle sleep mode (for quiet formal moments)
  const handleToggleSleep = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSleeping((prev) => {
      const next = !prev;
      if (next) {
        setMood("sleepy");
        triggerSpeech("Sleep mode: I'll stay quiet 💤", 1800);
      } else {
        setMood("happy");
        triggerSpeech("Awake and ready! ⚡", 1800);
      }
      return next;
    });
  };

  // Reset to auto-wandering safe docks
  const handleResetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCustomDragged(false);
    const docks = getDockPositions();
    if (docks.length > 0) {
      setIsGliding(true);
      setPosition({ x: docks[0].x, y: docks[0].y });
      triggerSpeech("Back to standard dock! 📍", 1800);
      setTimeout(() => setIsGliding(false), 1200);
    }
  };

  if (!position) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Interactive Presentation Companion Mascot"
      className="no-print select-none fixed z-[99990]"
      style={{
        left: position.x,
        top: position.y,
        transition: isGliding
          ? "left 2.2s cubic-bezier(0.22, 1, 0.36, 1), top 2.2s cubic-bezier(0.22, 1, 0.36, 1)"
          : "none",
      }}
    >
      <div className="relative">
        {/* =========================================================
            SPEECH BUBBLE / STATUS BADGE (Above Head)
            ========================================================= */}
        <AnimatePresence>
          {speechText && (
            <motion.div
              key={speechKey}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute -top-11 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-auto cursor-pointer"
              onClick={() => setSpeechText(null)}
            >
              <div
                className={cn(
                  "px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-tight shadow-[0_8px_20px_rgba(32,27,70,0.18)]",
                  "bg-white/95 backdrop-blur-md border border-[#5B3DF5]/25 text-[#1B1934] flex items-center gap-1.5",
                  isCelebrating &&
                    "border-[#7C5CFF] bg-gradient-to-r from-white via-[#F5F2FF] to-white"
                )}
              >
                <Sparkles className="w-3 h-3 text-[#7C5CFF] animate-pulse" />
                <span>{speechText}</span>
              </div>
              {/* Little triangle tail */}
              <div className="w-2 h-2 bg-white/95 border-r border-b border-[#5B3DF5]/25 rotate-45 mx-auto -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            HOVER QUICK CONTROLS (Tuck / Sleep / Reset)
            ========================================================= */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="absolute -right-7 top-1 flex flex-col gap-1 z-30 pointer-events-auto"
            >
              <button
                type="button"
                onClick={handleToggleSleep}
                title={isSleeping ? "Wake Mascot" : "Snooze Mascot"}
                className="w-6 h-6 rounded-full bg-white/95 hover:bg-white border border-[#5B3DF5]/30 shadow-md flex items-center justify-center text-[#5B3DF5] hover:text-[#4323D6] transition-colors"
                aria-label={isSleeping ? "Wake Mascot" : "Snooze Mascot"}
              >
                {isSleeping ? (
                  <Sun className="w-3 h-3" />
                ) : (
                  <Moon className="w-3 h-3" />
                )}
              </button>

              {isCustomDragged && (
                <button
                  type="button"
                  onClick={handleResetPosition}
                  title="Reset to Dock"
                  className="w-6 h-6 rounded-full bg-white/95 hover:bg-white border border-[#5B3DF5]/30 shadow-md flex items-center justify-center text-[#5B3DF5] hover:text-[#4323D6] transition-colors"
                  aria-label="Reset to Dock"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            MAIN DRAGGABLE & CLICKABLE ROBOT ACTOR
            ========================================================= */}
        <motion.div
          drag
          dragMomentum={false}
          onDragStart={() => setIsCustomDragged(true)}
          onDragEnd={(_, info) => {
            setPosition((prev) =>
              prev
                ? { x: prev.x + info.offset.x, y: prev.y + info.offset.y }
                : null
            );
          }}
          onHoverStart={() => {
            setIsHovered(true);
            if (!isSleeping) setMood("curious");
          }}
          onHoverEnd={() => {
            setIsHovered(false);
            if (!isSleeping) {
              setMood("normal");
              setLookOffset({ x: 0, y: 0 });
              setHeadTilt(0);
            }
          }}
          onPointerMove={handlePointerMove}
          onClick={handleRobotClick}
          className="cursor-grab active:cursor-grabbing group relative w-[74px] h-[90px] md:w-[82px] md:h-[100px] touch-none"
          title="Presentation Companion Mascot (Click to interact, Drag to move)"
        >
          {/* Continuous Floating Bob & Gentle Physics */}
          <motion.div
            animate={
              isSleeping
                ? { y: 0, rotate: 0 }
                : isCelebrating
                ? {
                    y: [0, -16, -3, -12, 0],
                    rotate: [0, -8, 8, -4, 0],
                  }
                : {
                    y: [0, -6, 0],
                    rotate: headTilt,
                  }
            }
            transition={
              isCelebrating
                ? { duration: 0.85, ease: "easeOut" }
                : {
                    y: {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 0.45,
                      ease: "easeOut",
                    },
                  }
            }
            className="w-full h-full relative"
          >
            {/* =====================================================
                3D-STYLED VECTOR ROBOT CHARACTER (Porcelain & Soft Violet)
                ===================================================== */}
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-[0_12px_24px_rgba(76,29,149,0.18)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Porcelain Body Gradient */}
                <linearGradient
                  id="robotBodyGrad"
                  x1="20"
                  y1="20"
                  x2="80"
                  y2="105"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#F5F6FC" />
                  <stop offset="100%" stopColor="#D5DAEE" />
                </linearGradient>

                {/* Head Top Specular Bevel */}
                <linearGradient
                  id="robotHeadGrad"
                  x1="30"
                  y1="12"
                  x2="70"
                  y2="60"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F8F9FE" />
                  <stop offset="100%" stopColor="#DBE0F4" />
                </linearGradient>

                {/* Midnight Obsidian Visor Screen */}
                <linearGradient
                  id="robotVisorGrad"
                  x1="50"
                  y1="26"
                  x2="50"
                  y2="56"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#111222" />
                  <stop offset="45%" stopColor="#191932" />
                  <stop offset="100%" stopColor="#221F42" />
                </linearGradient>

                {/* Visor Glass Reflection */}
                <linearGradient
                  id="visorReflect"
                  x1="28"
                  y1="28"
                  x2="68"
                  y2="44"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                {/* Electric Purple Digital Eye Glow */}
                <linearGradient id="eyeGlowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C4B5FD" />
                  <stop offset="50%" stopColor="#9061F9" />
                  <stop offset="100%" stopColor="#6C2BD9" />
                </linearGradient>

                {/* Core Arc Reactor Gradient */}
                <radialGradient id="coreReactorGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#DDD6FE" />
                  <stop offset="45%" stopColor="#7C5CFF" />
                  <stop offset="85%" stopColor="#4C1D95" />
                  <stop offset="100%" stopColor="#2E1065" />
                </radialGradient>

                {/* Soft Lavender Anti-Gravity Thrust Bloom */}
                <radialGradient id="repulsorGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#7C5CFF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
                </radialGradient>

                {/* Drop Glow Filter */}
                <filter
                  id="eyeNeonBloom"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* --------------------------------------------------
                  1. ANTI-GRAVITY REPULSOR FIELD & EMITTER RING
                  -------------------------------------------------- */}
              <ellipse
                cx="50"
                cy="103"
                rx="19"
                ry="5.5"
                fill="url(#repulsorGlow)"
                className="animate-pulse"
              />
              <ellipse
                cx="50"
                cy="98"
                rx="11"
                ry="3"
                fill="#5B3DF5"
                opacity="0.6"
              />
              <ellipse cx="50" cy="98" rx="6" ry="1.8" fill="#C4B5FD" />

              {/* --------------------------------------------------
                  2. FLOATING MAGNETIC HANDS (LEFT & RIGHT)
                  -------------------------------------------------- */}
              {/* Left Hand Pod */}
              <motion.g
                animate={{
                  y: isCelebrating ? [-3, 3, -3] : [0, 2, 0],
                  x: [0, -1, 0],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <circle
                  cx="16"
                  cy="74"
                  r="7"
                  fill="url(#robotBodyGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
                <circle cx="16" cy="74" r="3.2" fill="#7C5CFF" opacity="0.4" />
              </motion.g>

              {/* Right Hand Pod (Waves during celebration or section transition) */}
              <motion.g
                animate={
                  isWaving
                    ? {
                        y: [-12, -4, -12],
                        x: [4, 7, 4],
                        rotate: [20, -15, 20],
                      }
                    : {
                        y: [0, -2, 0],
                        x: [0, 1, 0],
                        rotate: 0,
                      }
                }
                transition={
                  isWaving
                    ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
                    : {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }
                }
                style={{ originX: "84px", originY: "74px" }}
              >
                <circle
                  cx="84"
                  cy="74"
                  r="7"
                  fill="url(#robotBodyGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                />
                <circle
                  cx="84"
                  cy="74"
                  r="3.2"
                  fill="#7C5CFF"
                  opacity="0.75"
                />
              </motion.g>

              {/* --------------------------------------------------
                  3. ROBOT TORSO / CHASSIS
                  -------------------------------------------------- */}
              <path
                d="M 28 64 C 28 58 72 58 72 64 L 70 91 C 70 96 30 96 30 91 Z"
                fill="url(#robotBodyGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Torso Top Highlight Seam */}
              <path
                d="M 33 63 Q 50 66 67 63"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* CHEST ARC REACTOR / AI CORE */}
              <circle
                cx="50"
                cy="78"
                r="9.5"
                fill="#141328"
                stroke="#7C5CFF"
                strokeWidth="1.2"
              />
              <circle
                cx="50"
                cy="78"
                r="6.5"
                fill="url(#coreReactorGrad)"
                className={isCelebrating ? "animate-ping" : ""}
              />
              <circle cx="50" cy="78" r="2.8" fill="#FFFFFF" opacity="0.9" />

              {/* --------------------------------------------------
                  4. EAR SENSOR NODES (LEFT & RIGHT)
                  -------------------------------------------------- */}
              {/* Left Ear */}
              <rect
                x="18"
                y="34"
                width="6"
                height="15"
                rx="3"
                fill="#D9DEF2"
                stroke="#5B3DF5"
                strokeWidth="1.2"
              />
              <line
                x1="21"
                y1="38"
                x2="21"
                y2="45"
                stroke="#7C5CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Right Ear */}
              <rect
                x="76"
                y="34"
                width="6"
                height="15"
                rx="3"
                fill="#D9DEF2"
                stroke="#5B3DF5"
                strokeWidth="1.2"
              />
              <line
                x1="79"
                y1="38"
                x2="79"
                y2="45"
                stroke="#7C5CFF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* --------------------------------------------------
                  5. ROBOT HEAD CHASSIS
                  -------------------------------------------------- */}
              <path
                d="M 24 38 C 24 18 36 12 50 12 C 64 12 76 18 76 38 C 76 58 64 61 50 61 C 36 61 24 58 24 38 Z"
                fill="url(#robotHeadGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.6"
              />

              {/* ANTENNA WITH PULSING PURPLE ORB */}
              <path
                d="M 50 12 L 50 4"
                stroke="#9EA6C8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="4"
                r="3.5"
                fill="#7C5CFF"
                filter="url(#eyeNeonBloom)"
                className="animate-pulse"
              />
              <circle cx="50" cy="4" r="1.5" fill="#FFFFFF" />

              {/* --------------------------------------------------
                  6. HIGH-TECH MIDNIGHT VISOR SCREEN
                  -------------------------------------------------- */}
              <rect
                x="28"
                y="24"
                width="44"
                height="28"
                rx="14"
                fill="url(#robotVisorGrad)"
                stroke="#4C3A82"
                strokeWidth="1.2"
              />

              {/* Visor Glass Reflection Arch */}
              <path
                d="M 33 27 Q 50 31 67 27 C 62 25 38 25 33 27 Z"
                fill="url(#visorReflect)"
              />

              {/* --------------------------------------------------
                  7. EXPRESSIVE DIGITAL PURPLE EYES
                  -------------------------------------------------- */}
              <g
                style={{
                  transform: `translate(${lookOffset.x}px, ${lookOffset.y}px)`,
                  transition: "transform 0.22s ease-out",
                }}
              >
                {/* MOOD: BLINK (compressed thin slits) */}
                {mood === "blink" && (
                  <>
                    <line
                      x1="37"
                      y1="38"
                      x2="45"
                      y2="38"
                      stroke="#C4B5FD"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="55"
                      y1="38"
                      x2="63"
                      y2="38"
                      stroke="#C4B5FD"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* MOOD: HAPPY (curved joyful arcs `^ ^`) */}
                {mood === "happy" && (
                  <>
                    <path
                      d="M 37 40 Q 41 33 45 40"
                      stroke="#C4B5FD"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      filter="url(#eyeNeonBloom)"
                    />
                    <path
                      d="M 55 40 Q 59 33 63 40"
                      stroke="#C4B5FD"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      filter="url(#eyeNeonBloom)"
                    />
                  </>
                )}

                {/* MOOD: SLEEPY (gentle restful arcs `u u`) */}
                {mood === "sleepy" && (
                  <>
                    <path
                      d="M 37 36 Q 41 42 45 36"
                      stroke="#A78BFA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M 55 36 Q 59 42 63 36"
                      stroke="#A78BFA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                  </>
                )}

                {/* MOOD: NORMAL / ATTENTIVE / CURIOUS (glowing luminous capsules) */}
                {(mood === "normal" ||
                  mood === "attentive" ||
                  mood === "curious") && (
                  <>
                    {/* Left Eye */}
                    <g filter="url(#eyeNeonBloom)">
                      <rect
                        x="37"
                        y={mood === "curious" ? "32" : "33"}
                        width="8"
                        height={mood === "curious" ? "12" : "11"}
                        rx="4"
                        fill="url(#eyeGlowGrad)"
                      />
                      {/* Specular White Dot */}
                      <circle
                        cx="39.5"
                        cy={mood === "curious" ? "34.5" : "35.5"}
                        r="1.3"
                        fill="#FFFFFF"
                      />
                    </g>

                    {/* Right Eye */}
                    <g filter="url(#eyeNeonBloom)">
                      <rect
                        x="55"
                        y="33"
                        width="8"
                        height="11"
                        rx="4"
                        fill="url(#eyeGlowGrad)"
                      />
                      {/* Specular White Dot */}
                      <circle cx="57.5" cy="35.5" r="1.3" fill="#FFFFFF" />
                    </g>
                  </>
                )}
              </g>

              {/* Subtle Cheerful Digital Smile (Shows when celebrating or happy) */}
              {mood === "happy" && (
                <path
                  d="M 46 47 Q 50 50 54 47"
                  stroke="#A78BFA"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  filter="url(#eyeNeonBloom)"
                />
              )}
            </svg>
          </motion.div>

          {/* =====================================================
              GROUND SHADOW (Scale-synced with floating height)
              ===================================================== */}
          <motion.div
            animate={
              isSleeping
                ? { scale: 1, opacity: 0.26 }
                : isCelebrating
                ? {
                    scale: [1, 0.65, 0.9, 0.7, 1],
                    opacity: [0.32, 0.12, 0.28, 0.14, 0.32],
                  }
                : {
                    scale: [1, 0.82, 1],
                    opacity: [0.32, 0.18, 0.32],
                  }
            }
            transition={
              isCelebrating
                ? { duration: 0.85, ease: "easeOut" }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
            className="w-10 h-2 bg-[#4C1D95]/30 rounded-full blur-[3px] mx-auto -mt-1 pointer-events-none"
          />
        </motion.div>
      </div>
    </div>
  );
}
