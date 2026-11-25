"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";

/* Lenis inertial smooth scrolling (disabled while presenting) */
export function SmoothScroll({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [enabled]);
  return null;
}

/* Fixed full-page aurora, grid, grain and cursor-following light */
export function AmbientBackdrop() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#141026_0%,#07070f_45%,#04050a_100%)]" />
      <div className="aurora-a absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw] rounded-full bg-[#ff6d5a]/[0.10] blur-[120px]" />
      <div className="aurora-b absolute -right-[20%] top-[10%] h-[80vh] w-[60vw] rounded-full bg-[#7c3aed]/[0.14] blur-[140px]" />
      <div className="aurora-c absolute bottom-[-30%] left-[20%] h-[70vh] w-[60vw] rounded-full bg-[#0891b2]/[0.10] blur-[140px]" />
      <div className="grid-fade absolute inset-0 opacity-60" />
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(255,109,90,0.10) 0%, rgba(139,92,246,0.06) 35%, transparent 65%)",
        }}
      />
      <div className="grain" />
    </div>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#ff6d5a] via-[#ea4b71] to-[#22d3ee] shadow-[0_0_12px_rgba(255,109,90,0.8)]"
    />
  );
}
