"use client";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/content";
import {
  MessageCircle,
  ClipboardList,
  PencilRuler,
  Cog,
  HardHat,
  ClipboardCheck,
  PackageCheck,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

// Presentation-only enrichment: icon + one-line description per step, keyed
// by the exact strings in @/data/content so nothing breaks if the list
// changes — unmapped steps still render cleanly via the fallback.
const STEP_DETAILS: Record<string, { icon: LucideIcon; description: string }> = {
  Consultation: {
    icon: MessageCircle,
    description: "Understanding your vision, goals and site requirements.",
  },
  Planning: {
    icon: ClipboardList,
    description: "Defining scope, budget and project timeline.",
  },
  Design: {
    icon: PencilRuler,
    description: "Turning requirements into detailed architectural plans.",
  },
  Engineering: {
    icon: Cog,
    description: "Structural and systems design backed by rigorous analysis.",
  },
  Construction: {
    icon: HardHat,
    description: "Building to plan with disciplined site execution.",
  },
  Inspection: {
    icon: ClipboardCheck,
    description: "Multi-stage quality checks at every milestone.",
  },
  Delivery: {
    icon: PackageCheck,
    description: "Final walkthrough and handover of the completed project.",
  },
  Support: {
    icon: LifeBuoy,
    description: "Ongoing maintenance and support after handover.",
  },
};

const FALLBACK_DETAIL = { icon: ClipboardList, description: "" };

export default function Process() {
  const trackRef = useRef<HTMLOListElement | null>(null);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const total = process.length;

  return (
    <section className="bg-bg-light py-8 md:py-20 overflow-hidden">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">How We Work</p>
          <h2>Our construction process</h2>
          <p>
            A structured, transparent delivery framework — from first consultation through
            post-handover support.
          </p>
        </div>

        <ol
          ref={trackRef}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {process.map((step, i) => {
            const detail = STEP_DETAILS[step] ?? FALLBACK_DETAIL;
            const Icon = detail.icon;
            const isLast = i === total - 1;

            return (
              <li
                key={step}
                className="group relative rounded-2xl border border-navy/10 bg-white p-6 opacity-0 transition-all ease-premium hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,15,102,0.18)] motion-reduce:!opacity-100 motion-reduce:!translate-y-0"
                style={{
                  opacity: active ? 1 : undefined,
                  transform: active ? "translateY(0)" : "translateY(16px)",
                  transitionProperty: "opacity, transform, box-shadow",
                  transitionDuration: reducedMotion ? "0ms" : "600ms",
                  transitionDelay: reducedMotion ? "0ms" : active ? `${i * 90}ms` : "0ms",
                }}
              >
                {/* Sequence connector cap — subtle, works regardless of row wrapping */}
                <span
                  aria-hidden="true"
                  className={`absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-navy to-cyan transition-transform ease-premium origin-left motion-reduce:!scale-x-100 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{
                    transitionDuration: reducedMotion ? "0ms" : "500ms",
                    transitionDelay: reducedMotion ? "0ms" : active ? `${i * 90 + 150}ms` : "0ms",
                  }}
                />

                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                </div>

                <h3 className="mt-5 text-[15px] font-semibold text-navy">{step}</h3>
                {detail.description && (
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                    {detail.description}
                  </p>
                )}

                <span className="sr-only">
                  {`Step ${i + 1} of ${total}${isLast ? " (final step)" : ""}`}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}