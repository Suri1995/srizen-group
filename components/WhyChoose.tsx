"use client";
import Link from "next/link";
import useReveal from "./useReveal";
import {
  ShieldCheck,
  Clock,
  Users,
  Award,
  Lightbulb,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import { whyChoose } from "@/data/content";

// A small rotation of icons for the principle cards. Matched by keyword
// where the title gives an obvious signal, otherwise cycled by index so
// six cards still get six visually distinct anchors rather than repeating
// the same icon.
const FALLBACK_ICONS: LucideIcon[] = [ShieldCheck, Clock, Users, Award, Lightbulb, HardHat];

function iconFor(title: string, index: number): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("quality") || t.includes("safety") || t.includes("trust")) return ShieldCheck;
  if (t.includes("schedule") || t.includes("time") || t.includes("deadline")) return Clock;
  if (t.includes("team") || t.includes("people") || t.includes("expert")) return Users;
  if (t.includes("track record") || t.includes("award") || t.includes("experience")) return Award;
  if (t.includes("innovat")) return Lightbulb;
  return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

export default function WhyChoose() {
  const [textRef, textIn] = useReveal<HTMLDivElement>();
  const [gridRef, gridIn] = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-secondary to-white py-8 md:py-20">
      {/* Soft, blurred colour blobs behind the content — a static
          background-position, not an animation, so it costs nothing at
          runtime beyond the initial paint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-navy/[0.07] blur-[110px]"
      />

      <div className="wrap relative">
        <div ref={textRef} data-in={textIn} className="reveal">
          <p className="eyebrow">Why SriZen Group</p>
          <h2 className="text-[32px] md:text-[48px]">A partner built for the long term</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Every engagement is backed by the same operating principles — regardless of project
            size or sector.
          </p>
        </div>

        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {whyChoose.map(([title, copy], i) => {
            const Icon = iconFor(title, i);
            return (
              <div
                key={title}
                data-in={gridIn}
                className="why-card reveal group rounded-2xl border border-navy/10 bg-white/70 p-8 backdrop-blur-sm transition-all duration-400 ease-premium hover:-translate-y-1 hover:border-navy/25 hover:bg-white hover:shadow-[0_24px_46px_-24px_rgba(0,15,102,0.25)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-[#000f66] text-cyan transition-transform duration-400 ease-premium group-hover:scale-110">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <h4 className="mt-5 font-body text-base font-semibold text-navy">{title}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{copy}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/*
        `.reveal` / `[data-in="true"]` is the site's existing fade-up
        pattern (already defined in globals.css), driven by the existing
        `useReveal` hook — reused as-is here rather than introducing a
        second reveal system. The only addition is per-card
        `transitionDelay`, staggering the six principle cards instead of
        having them all fade in simultaneously.

        `prefers-reduced-motion` is already force-disabled globally in
        globals.css (collapses every animation/transition duration to
        0.01ms), so the staggered reveal and every hover transition here
        automatically collapse to instant for anyone who needs that.
      */}
    </section>
  );
}