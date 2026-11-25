"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   Smooth scroll helper (uses Lenis when mounted)
   ------------------------------------------------------------------ */
type LenisLike = { scrollTo: (t: HTMLElement | number, o?: Record<string, unknown>) => void };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: id === "home" ? 0 : -8, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------
   Reveal: fade + rise + de-blur when entering the viewport
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  blur = 10,
  once = true,
  amount = 0.2,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "li" | "article" | "span" | "p";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   SplitTitle: words slide up from a mask, staggered
   ------------------------------------------------------------------ */
export function SplitTitle({
  text,
  className,
  wordClassName,
  delay = 0,
  highlight = [],
  highlightClassName = "text-gradient",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlight?: string[];
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text}>
      {words.map((w, i) => {
        const norm = (v: string) => v.replace(/[^\w&?]/g, "").toLowerCase();
        const hot = highlight.some((h) => norm(w) === norm(h));
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={cn("inline-block", wordClassName, hot && highlightClassName)}
              initial={{ y: "110%", rotate: 4 }}
              animate={inView ? { y: "0%", rotate: 0 } : {}}
              transition={{ duration: 1.1, delay: delay + i * 0.07, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------
   ScrubWords: scroll-scrubbed word-by-word illumination
   ------------------------------------------------------------------ */
function ScrubWord({
  word,
  progress,
  range,
  hot,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  hot?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={cn("inline-block", hot && "text-gradient-warm")}>
      {word}&nbsp;
    </motion.span>
  );
}

export function ScrubWords({
  text,
  className,
  offset = ["start 0.88", "end 0.45"],
  highlight = [],
}: {
  text: string;
  className?: string;
  offset?: [string, string];
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const hot = highlight.some((h) => w.toLowerCase().includes(h.toLowerCase()));
        return <ScrubWord key={i} word={w} progress={scrollYProgress} range={[start, end]} hot={hot} />;
      })}
    </p>
  );
}

/* ------------------------------------------------------------------
   Parallax: translate children on scroll
   ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  const smooth = useSpring(y, { stiffness: 80, damping: 20, mass: 0.4 });
  return (
    <motion.div ref={ref} style={{ y: smooth }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   GlassCard: liquid-glass surface with spotlight + optional 3D tilt
   ------------------------------------------------------------------ */
export function GlassCard({
  children,
  className,
  tilt = false,
  strong = false,
  as = "div",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  strong?: boolean;
  as?: "div" | "article" | "button";
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt) {
      rx.set((0.5 - py) * 8);
      ry.set((px - 0.5) * 10);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1000 } : undefined}
      className={cn(
        strong ? "glass-strong" : "glass",
        "glass-sheen spotlight overflow-hidden",
        className
      )}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------
   Magnetic wrapper for buttons
   ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14 });
  const sy = useSpring(y, { stiffness: 200, damping: 14 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-block"
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   CountUp
   ------------------------------------------------------------------ */
export function CountUp({ to, suffix = "", className, duration = 1.8 }: { to: number; suffix?: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   Stagger list helpers
   ------------------------------------------------------------------ */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
export const staggerChild = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}
