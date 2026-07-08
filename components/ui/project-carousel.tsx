"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselProject {
  slug: string;
  name: string;
  loc: string;
  cat: string;
  img: string;
}

interface ProjectCarouselProps {
  projects: CarouselProject[];
  autoPlayMs?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function ProjectCarousel({
  projects,
  autoPlayMs = 6000,
}: ProjectCarouselProps) {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  const count = projects.length;
  const current = projects[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      const wrapped = (nextIndex + count) % count;
      setIndexState([wrapped, dir]);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Autoplay, paused on hover/focus/reduced-motion.
  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [paused, reducedMotion, next, autoPlayMs, count]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 60;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  if (!current) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.slug}
            custom={direction}
            variants={reducedMotion ? undefined : variants}
            initial={reducedMotion ? false : "enter"}
            animate="center"
            exit={reducedMotion ? undefined : "exit"}
            transition={{ duration: 0.5, ease: [0.16, 0.84, 0.24, 1] }}
            drag={reducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <Image
              src={current.img}
              alt={current.name}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 1320px"
              className="object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/25 to-navy-deep/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 lg:p-14">
              <span className="font-mono text-[11px] tracking-[.16em] uppercase text-cyan">
                {current.cat}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[42px] font-semibold text-white max-w-[16ch]">
                {current.name}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-white/60 text-sm">
                <MapPin size={14} /> {current.loc}
              </p>
              <Link
                href={`/projects/${current.slug}`}
                className="mt-6 inline-flex items-center gap-2 w-fit text-sm font-semibold text-white border-b border-cyan/60 pb-1 hover:text-cyan hover:border-cyan transition-colors"
              >
                View Project <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Live region for screen readers announcing slide changes */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          className="sr-only"
        >
          {`Slide ${index + 1} of ${count}: ${current.name}, ${current.loc}`}
        </div>
      </div>

      {/* Bottom carousel controls: prev / dots / next */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full border border-navy/20 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none"
        >
          <ChevronLeft size={19} />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Select project slide">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${p.name}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none",
                i === index ? "w-7 bg-navy" : "w-2 bg-navy/20 hover:bg-navy/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className="w-11 h-11 rounded-full border border-navy/20 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}
