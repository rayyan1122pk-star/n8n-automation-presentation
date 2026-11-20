"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  MAIN_PRESENTATION_SECTIONS,
  type AdditionalMaterialLink,
} from "@/content/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TableOfContentsSlide } from "@/components/sections/TableOfContentsSlide";
import {
  SectionOneIntroduction,
  SectionTwoWorkflowAutomation,
  SectionThreeHowN8nWorks,
  SectionFourComponents,
  SectionFiveN8nAndAI,
} from "@/components/sections/MainSectionsOneToFive";
import {
  SectionSixApplications,
  SectionSevenAdvantages,
} from "@/components/sections/MainSectionsSixAndSeven";
import { PracticalDemonstrationSection } from "@/components/sections/PracticalDemonstrationSection";
import { SectionNineFuture } from "@/components/sections/FutureSection";
import { ExploreFurtherSection } from "@/components/sections/ExploreFurtherSection";
import { PresentationModeOverlay } from "@/components/presentation/PresentationModeOverlay";
import { RobotMascot } from "@/components/mascot/RobotMascot";
import { PrintDeckDocument } from "@/components/print/PrintDeckDocument";

export function PresentationApp() {
  const [activeSectionId, setActiveSectionId] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [overHero, setOverHero] = useState<boolean>(true);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [exploreOpen, setExploreOpen] = useState<boolean>(false);
  const [exploreTab, setExploreTab] =
    useState<AdditionalMaterialLink["tabKey"]>("impact");
  const enteredFullscreenRef = useRef(false);

  // Track scroll progress & active section during normal scrolling mode
  useEffect(() => {
    if (presentationMode) return;

    const trackedIds = [
      "home",
      ...MAIN_PRESENTATION_SECTIONS.map((s) => s.id),
    ];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const heroEl = document.getElementById("home");
      if (heroEl) {
        setOverHero(heroEl.getBoundingClientRect().bottom > 88);
      }

      let current = "home";
      for (const id of trackedIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      }
      setActiveSectionId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [presentationMode]);

  // Track browser fullscreen entry & exit cleanly (only exit presentation mode if we actually entered fullscreen first)
  useEffect(() => {
    if (!presentationMode) {
      enteredFullscreenRef.current = false;
      return;
    }
    const onFsChange = () => {
      if (document.fullscreenElement) {
        enteredFullscreenRef.current = true;
      } else if (enteredFullscreenRef.current) {
        enteredFullscreenRef.current = false;
        setPresentationMode(false);
        const targetId = MAIN_PRESENTATION_SECTIONS[currentSlideIdx]?.id;
        if (targetId) {
          requestAnimationFrame(() => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
          });
        }
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [presentationMode, currentSlideIdx]);

  const handleStartPresentation = useCallback(() => {
    // Start on the current section if already viewing one of the 9 sections, otherwise Slide 01
    const matchedIdx = MAIN_PRESENTATION_SECTIONS.findIndex(
      (s) => s.id === activeSectionId
    );
    const startIdx = matchedIdx >= 0 ? matchedIdx : 0;
    setCurrentSlideIdx(startIdx);
    setExploreOpen(false);
    setPresentationMode(true);
    window.scrollTo({ top: 0, behavior: "instant" });

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, [activeSectionId]);

  const handleExitPresentation = useCallback(() => {
    const returnSectionId = MAIN_PRESENTATION_SECTIONS[currentSlideIdx]?.id;
    setPresentationMode(false);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    if (returnSectionId) {
      requestAnimationFrame(() => {
        const el = document.getElementById(returnSectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [currentSlideIdx]);

  const handleSelectSlide = useCallback((idx: number) => {
    const clamped = Math.max(
      0,
      Math.min(MAIN_PRESENTATION_SECTIONS.length - 1, idx)
    );
    setCurrentSlideIdx(clamped);
    setExploreOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => {
      const next = Math.min(MAIN_PRESENTATION_SECTIONS.length - 1, prev + 1);
      if (next !== prev) {
        setExploreOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return next;
    });
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => {
      const next = Math.max(0, prev - 1);
      if (next !== prev) {
        setExploreOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return next;
    });
  }, []);

  const handleExportPdf = useCallback(async () => {
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

  const handleOpenExploreTab = useCallback(
    (tab: AdditionalMaterialLink["tabKey"]) => {
      setExploreTab(tab);
      setExploreOpen(true);
      requestAnimationFrame(() => {
        const el = document.getElementById("explore-further");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    []
  );

  const renderSlideByIndex = (idx: number) => {
    switch (idx) {
      case 0:
        return <SectionOneIntroduction />;
      case 1:
        return <SectionTwoWorkflowAutomation />;
      case 2:
        return <SectionThreeHowN8nWorks />;
      case 3:
        return <SectionFourComponents />;
      case 4:
        return <SectionFiveN8nAndAI />;
      case 5:
        return <SectionSixApplications />;
      case 6:
        return <SectionSevenAdvantages />;
      case 7:
        return <PracticalDemonstrationSection />;
      case 8:
        return (
          <SectionNineFuture
            onStartPresentation={handleStartPresentation}
            onExportPdf={handleExportPdf}
          />
        );
      default:
        return <SectionOneIntroduction />;
    }
  };

  return (
    <>
      <div className="no-print min-h-screen w-full overflow-x-clip bg-[#DFE2F0]">
        {!presentationMode && (
          <Navbar
            activeSectionId={activeSectionId}
            scrollProgress={scrollProgress}
            overHero={overHero}
            onStartPresentation={handleStartPresentation}
            onExportPdf={handleExportPdf}
            onOpenExploreTab={handleOpenExploreTab}
          />
        )}

        {presentationMode ? (
          /* =============================================================
             TRUE SINGLE-SLIDE FULLSCREEN PRESENTATION MODE
             Only the active section is visible on screen — zero bleed!
             ============================================================= */
          <main className="min-h-screen w-full bg-[#DFE2F0]">
            {exploreOpen ? (
              <ExploreFurtherSection
                isOpen={true}
                onToggleOpen={() => setExploreOpen(false)}
                activeTab={exploreTab}
                onTabChange={setExploreTab}
                presentationMode={true}
              />
            ) : (
              renderSlideByIndex(currentSlideIdx)
            )}
          </main>
        ) : (
          /* Normal Scrolling Website Mode */
          <>
            <main>
              <HeroSection onStartPresentation={handleStartPresentation} />
              <TableOfContentsSlide />
              <SectionOneIntroduction />
              <SectionTwoWorkflowAutomation />
              <SectionThreeHowN8nWorks />
              <SectionFourComponents />
              <SectionFiveN8nAndAI />
              <SectionSixApplications />
              <SectionSevenAdvantages />
              <PracticalDemonstrationSection />
              <SectionNineFuture
                onStartPresentation={handleStartPresentation}
                onExportPdf={handleExportPdf}
              />
            </main>

            <ExploreFurtherSection
              isOpen={exploreOpen}
              onToggleOpen={() => setExploreOpen((v) => !v)}
              activeTab={exploreTab}
              onTabChange={setExploreTab}
              presentationMode={false}
            />
          </>
        )}

        {/* Vertical, Side-Positioned, Draggable Slide Controller */}
        <PresentationModeOverlay
          active={presentationMode}
          currentSlideIdx={currentSlideIdx}
          totalSlides={MAIN_PRESENTATION_SECTIONS.length}
          onSelectSlide={handleSelectSlide}
          onPrevSlide={handlePrevSlide}
          onNextSlide={handleNextSlide}
          showOptional={exploreOpen}
          onToggleOptional={() => setExploreOpen((v) => !v)}
          onExit={handleExitPresentation}
          onExportPdf={handleExportPdf}
        />

        {/* Interactive Floating Robot Mascot Companion */}
        <RobotMascot
          presentationMode={presentationMode}
          currentSlideIdx={currentSlideIdx}
          activeSectionId={activeSectionId}
        />
      </div>

      {/* Synced 17-Slide Soft Lavender-Slate PDF Layout */}
      <PrintDeckDocument />
    </>
  );
}
