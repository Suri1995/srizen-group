"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Landmark, Building2, Wrench, HardHat, Award, TrendingUp, type LucideIcon } from "lucide-react";
import { timeline } from "@/data/content";
import { motion } from "framer-motion";

const ICONS: LucideIcon[] = [Landmark, Building2, Wrench, HardHat, Award, TrendingUp];

interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
  cx: number;
  cy: number;
}

interface Pt {
  x: number;
  y: number;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const probeStartRef = useRef<HTMLSpanElement>(null);
  const probeEndRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [cols, setCols] = useState(2);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [rects, setRects] = useState<Rect[]>([]);
  const [lineStart, setLineStart] = useState("#0891b2");
  const [lineEnd, setLineEnd] = useState("#1e3a8a");

  useLayoutEffect(() => {
    const updateCols = () => setCols(window.innerWidth < 768 ? 1 : 2);
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    const next: Rect[] = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push({
        left: r.left - cRect.left,
        right: r.right - cRect.left,
        top: r.top - cRect.top,
        bottom: r.bottom - cRect.top,
        cx: r.left - cRect.left + r.width / 2,
        cy: r.top - cRect.top + r.height / 2,
      });
    });

    setRects(next);
    setDims({ w: container.scrollWidth, h: container.scrollHeight });

    if (probeStartRef.current) setLineStart(getComputedStyle(probeStartRef.current).color);
    if (probeEndRef.current) setLineEnd(getComputedStyle(probeEndRef.current).color);
  };

  useLayoutEffect(() => {
    measure();
    // re-measure a beat later too, in case webfonts/images shift card heights after first paint
    const t = setTimeout(measure, 150);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline.length, cols]);

  // build the S-curve linking card i -> card i+1, choosing horizontal or vertical anchors.
  // Every curve gets a forced bow so its bounding box is never zero-height/zero-width.
  const linkFor = (i: number): { d: string; mid: Pt } | null => {
    const a = rects[i];
    const b = rects[i + 1];
    if (!a || !b) return null;

    const sameRow = Math.floor(i / cols) === Math.floor((i + 1) / cols);

    let p1: Pt;
    let p2: Pt;
    let d: string;

    if (sameRow) {
      if (a.cx < b.cx) {
        p1 = { x: a.right, y: a.cy };
        p2 = { x: b.left, y: b.cy };
      } else {
        p1 = { x: a.left, y: a.cy };
        p2 = { x: b.right, y: b.cy };
      }
      const midX = (p1.x + p2.x) / 2;
      const bow = 26; // px vertical bow so the bbox always has height
      d = `M ${p1.x} ${p1.y} C ${midX} ${p1.y - bow}, ${midX} ${p2.y + bow}, ${p2.x} ${p2.y}`;
    } else {
      p1 = { x: a.cx, y: a.bottom };
      p2 = { x: b.cx, y: b.top };
      const midY = (p1.y + p2.y) / 2;
      const bow = 26; // px horizontal bow so the bbox always has width
      d = `M ${p1.x} ${p1.y} C ${p1.x - bow} ${midY}, ${p2.x + bow} ${midY}, ${p2.x} ${p2.y}`;
    }

    return { d, mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 } };
  };

  const links = timeline.slice(0, -1).map((_, i) => linkFor(i)).filter(Boolean) as NonNullable<ReturnType<typeof linkFor>>[];

  const rows: number[][] = [];
  for (let i = 0; i < timeline.length; i += cols) {
    rows.push(Array.from({ length: Math.min(cols, timeline.length - i) }, (_, k) => i + k));
  }

  return (
    <section className="relative py-8 md:py-20 overflow-hidden bg-gradient-to-b from-sky-400 via-sky-250 to-sky-100">
      <span ref={probeStartRef} className="text-accent absolute -z-10 opacity-0 pointer-events-none">.</span>
      <span ref={probeEndRef} className="text-primary absolute -z-10 opacity-0 pointer-events-none">.</span>

      <div className="wrap relative">
        <div className="section-head">
          <div className="flex items-center gap-4 mb-5 md:mb-8">
          <div className="w-10 h-px bg-primary" />
              <span className="text-[13px] tracking-[0.25em] uppercase font-medium text-primary">
                Our Journey
              </span>
              </div>
              <motion.h2 className="text-[38px] sm:text-[44px] lg:text-[52px] xl:text-[58px] leading-[1.05] font-light tracking-tight flex gap-4">
              Two decades of
              <span className="text-primary/70 font-semibold">
                Building
              </span>
            </motion.h2>
          <h2>
             <span className="text-foreground/80"></span>
          </h2>
          <p className="mt-3 text-secondary text-[15px]">
            Key moments that shaped our growth and defined who we are today
          </p>
        </div>

        <div ref={containerRef} className="relative mt-16">
          {dims.w > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ filter: `drop-shadow(0 0 4px ${lineStart}66)` }}
              width={dims.w}
              height={dims.h}
              viewBox={`0 0 ${dims.w} ${dims.h}`}
              fill="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={lineStart} />
                  <stop offset="100%" stopColor={lineEnd} />
                </linearGradient>
              </defs>
              {links.map((l, i) => (
                <path
                  key={i}
                  d={l.d}
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              ))}
            </svg>
          )}

          {links.map((l, i) => {
            const Icon = ICONS[(i + 1) % ICONS.length];
            return (
              <div
                key={i}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] ring-4 ring-white"
                style={{ left: l.mid.x, top: l.mid.y }}
              >
                <Icon className="w-6 h-6 text-white" strokeWidth={2.25} />
              </div>
            );
          })}

          <div className="flex flex-col gap-16 md:gap-24">
            {rows.map((row, rowIdx) => {
              const reversed = rowIdx % 2 === 1;
              return (
                <div
                  key={rowIdx}
                  className={`flex flex-col md:flex-row gap-8 md:gap-10 ${
                    reversed ? "md:flex-row-reverse" : ""
                  } ${cols === 1 ? "justify-center" : "justify-between"}`}
                >
                  {row.map((globalIndex) => {
                    const t = timeline[globalIndex];
                    return (
                      <div
                        key={t.year}
                        ref={(el) => {
                          cardRefs.current[globalIndex] = el;
                        }}
                        className="relative w-full md:w-[420px] rounded-2xl bg-gradient-to-b from-white to-secondary/5 border border-primary/10 shadow-[0_10px_34px_-16px_rgba(15,23,42,0.18)] hover:shadow-[0_18px_44px_-16px_rgba(15,23,42,0.24)] hover:-translate-y-1 transition-all duration-300 px-7 py-6"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs font-bold px-3 py-1 tracking-wide shadow-sm">
                            {t.year}
                          </span>
                          <span className="h-px flex-1 bg-primary/15" />
                        </div>

                        <h3 className="mt-4 font-display text-2xl font-bold text-primary">{t.title}</h3>
                        <span className="mt-2 block h-[3px] w-10 rounded-full bg-gradient-to-r from-accent to-primary" />

                        <p className="mt-3 text-foreground/75 text-[15px] leading-relaxed">{t.copy}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}