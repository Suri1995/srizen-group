"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

/**
 * On a hard reload/refresh, the browser may restore a mid-page scroll
 * position before this component ever mounts. If we always start "locked
 * at the top" regardless, we fight that position — scrolling looks stuck.
 * So: if the page is already scrolled past a small threshold on first
 * render, treat the hero as already fully expanded (no lock, no
 * scroll-jacking), so the page behaves exactly like a normal page from
 * wherever the browser placed you.
 */
const ALREADY_SCROLLED_THRESHOLD = 24;
const isAlreadyScrolled = () =>
  typeof window !== "undefined" && window.scrollY > ALREADY_SCROLLED_THRESHOLD;

/**
 * Full-bleed "scroll to expand" hero.
 *
 * Performance notes (this is a rewrite of the common community version,
 * which is known to jank):
 *  - Wheel/touch deltas are written to a ref and only committed to React
 *    state inside a requestAnimationFrame loop, so re-renders are capped
 *    to the display refresh rate instead of firing once per wheel tick.
 *  - The <body> is truly scroll-locked (overflow hidden) while the media
 *    is expanding, instead of fighting the native scroll position every
 *    "scroll" event — that fight is what causes the classic stutter.
 *  - Once fully expanded, the lock is released and the page scrolls
 *    natively with zero JS involvement, so there is no lag scrolling past
 *    the hero.
 *  - `prefers-reduced-motion` disables the scroll-jacking entirely.
 */
const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(() => (isAlreadyScrolled() ? 1 : 0));
  const [showContent, setShowContent] = useState(isAlreadyScrolled);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(isAlreadyScrolled);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mutable, render-free copies used inside the rAF loop / event handlers.
  const progressRef = useRef(isAlreadyScrolled() ? 1 : 0);
  const expandedRef = useRef(isAlreadyScrolled());
  const rafRef = useRef<number | null>(null);
  const dirtyRef = useRef(false);
  const touchStartYRef = useRef(0);

  // --- responsive + accessibility preference detection ------------------
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // If reduced motion is preferred, skip straight to the expanded/static state.
  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      expandedRef.current = true;
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    }
  }, [reducedMotion]);

  // --- rAF-throttled commit of ref -> state ------------------------------
  const scheduleCommit = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!dirtyRef.current) return;
      dirtyRef.current = false;

      const progress = progressRef.current;
      setScrollProgress(progress);

      if (progress >= 1 && !expandedRef.current) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (progress < 0.75 && expandedRef.current === false) {
        setShowContent(false);
      }
    });
  }, []);

  const applyDelta = useCallback(
    (rawDelta: number, sensitivity: number) => {
      if (expandedRef.current) return;
      const next = Math.min(
        Math.max(progressRef.current + rawDelta * sensitivity, 0),
        1
      );
      progressRef.current = next;
      dirtyRef.current = true;
      scheduleCommit();
    },
    [scheduleCommit]
  );

  // --- body scroll lock, kept in sync with expansion state ---------------
  useEffect(() => {
    if (reducedMotion) return;
    if (!mediaFullyExpanded) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
    return () => document.body.classList.remove("scroll-lock");
  }, [mediaFullyExpanded, reducedMotion]);

  // --- wheel / touch / collapse-on-scroll-up handlers --------------------
  useEffect(() => {
    if (reducedMotion) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (expandedRef.current) {
        // Only intercept an upward scroll at the very top of the page,
        // which re-collapses the hero. Everything else scrolls natively.
        if (e.deltaY < 0 && window.scrollY <= 4) {
          expandedRef.current = false;
          progressRef.current = 0.98;
          setMediaFullyExpanded(false);
          dirtyRef.current = true;
          scheduleCommit();
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      applyDelta(e.deltaY, 0.0011);
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      const touchY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current) {
        if (deltaY < -18 && window.scrollY <= 4) {
          expandedRef.current = false;
          progressRef.current = 0.98;
          setMediaFullyExpanded(false);
          dirtyRef.current = true;
          scheduleCommit();
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      const sensitivity = deltaY < 0 ? 0.009 : 0.006;
      applyDelta(deltaY, sensitivity);
      touchStartYRef.current = touchY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [applyDelta, reducedMotion, scheduleCommit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (reducedMotion || expandedRef.current) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        applyDelta(60, 0.0011);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        applyDelta(-60, 0.0011);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        progressRef.current = 1;
        dirtyRef.current = true;
        scheduleCommit();
      }
    },
    [applyDelta, reducedMotion, scheduleCommit]
  );

  const mediaWidth = 320 + scrollProgress * (isMobile ? 620 : 1180);
  const mediaHeight = 420 + scrollProgress * (isMobile ? 190 : 380);
  const textTranslateX = scrollProgress * (isMobile ? 130 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="relative overflow-x-hidden"
      role="region"
      aria-label={title ? `${title} — hero introduction` : "Hero introduction"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <p className="sr-only">
        {scrollToExpand ||
          "Scroll, or use the arrow keys, to expand the featured image."}
      </p>

      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={false}
            animate={{ opacity: 1 - scrollProgress * 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-navy-deep/30" />
          </motion.div>

          <div className="wrap flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 20px 60px rgba(0,7,46,0.45)",
                  willChange: "width, height",
                  contain: "layout paint",
                }}
              >
                {mediaType === "video" ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                      aria-hidden="true"
                    />
                    <motion.div
                      className="absolute inset-0 bg-navy-deep/30"
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Featured project"}
                      fill
                      sizes="(max-width: 768px) 95vw, 1250px"
                      className="object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-navy-deep/50"
                      animate={{ opacity: 0.55 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center absolute bottom-5 left-0 right-0 z-10">
                  {date && (
                    <p
                      className="font-mono text-xs tracking-[.18em] uppercase text-cyan"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="mt-2 text-white/70 text-[13px] font-medium"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-3 w-full relative z-10 flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <h1 className="sr-only">{title}</h1>
                <div
                  aria-hidden="true"
                  className="text-4xl md:text-6xl lg:text-[80px] font-display font-bold text-white"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </div>
                <div
                  aria-hidden="true"
                  className="text-4xl md:text-6xl lg:text-[80px] font-display font-bold text-center text-white"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </div>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full py-16 md:py-24"
              initial={false}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              aria-hidden={!showContent}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
