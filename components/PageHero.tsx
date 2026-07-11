"use client";

import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  crumb: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumb,
  stats = [
    { value: "20+", label: "Years of Excellence" },
    { value: "320+", label: "Team Strength" },
    { value: "26", label: "Cities" },
  ],
}: PageHeroProps) {
  const titleParts = title.split("of");

  return (
    <section className="relative flex min-h-[480px] items-end overflow-hidden pb-12 pt-32 lg:min-h-[560px] lg:pb-16">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(0,7,46,.97) 0%, rgba(0,7,46,.92) 40%, rgba(0,7,46,.85) 100%), url('${image}') center/cover`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-1/2 glow-pulse"
        style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.08) 0%, transparent 70%)" }}
      />

      <div className="wrap relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ============================================================ */}
          {/* Left Column — Content                                        */}
          {/* ============================================================ */}
          <div className="space-y-5">
            <div className="breadcrumb flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-white/60">
              <Link href="/" className="transition-colors duration-300 hover:text-cyan-400">
                Home
              </Link>
              <ChevronRight size={12} className="text-white/40" />
              <span className="text-white/80">{crumb}</span>
            </div>

            <div className="eyebrow-container flex items-center gap-4">
              <div className="h-px w-8 bg-emerald-200" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                {eyebrow}
              </span>
            </div>

            <h1 className="title-animated max-w-[14ch] text-[40px] font-bold leading-[1.08] tracking-tight text-white sm:text-[48px] lg:text-[56px] xl:text-[64px]">
              {titleParts.length > 1 ? (
                <>
                  {titleParts[0]}
                  <span className="text-cyan-300"> of</span>
                  <span className="relative ml-2 inline-block">
                    <span className="text-cyan-300">{titleParts[1]}</span>
                  </span>
                </>
              ) : (
                title
              )}
            </h1>

            {subtitle && (
              <p className="subtitle-animated max-w-[520px] text-[16px] font-normal leading-relaxed text-white/90 lg:text-[18px]">
                {subtitle}
              </p>
            )}

            <div className="cta-container pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-3.5 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,.4)]"
              >
                Get a Quote
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column — Gated-community / construction line-art scene */}
          {/* ============================================================ */}
          <div className="stats-container hidden lg:block">
            <div className="relative mx-auto max-w-[420px]">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-[80px]"
                />

                <svg viewBox="0 0 400 300" className="relative h-auto w-full" aria-hidden="true">
                  {/* Ground line */}
                  <line x1="20" y1="250" x2="380" y2="250" stroke="#22d3ee" strokeOpacity="0.25" strokeWidth="1" />

                  {/* Villas behind the gate — same line-art language as
                      the homepage's "Who We Are" construction animation,
                      reused here for visual consistency */}
                  <g stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1.4" fill="none">
                    <rect x="55" y="150" width="60" height="100" />
                    <rect x="45" y="132" width="80" height="18" />
                    <rect x="285" y="140" width="65" height="110" />
                    <rect x="275" y="120" width="85" height="20" />
                  </g>
                  <g fill="#22d3ee" fillOpacity="0.35">
                    <rect x="68" y="175" width="12" height="14" />
                    <rect x="90" y="175" width="12" height="14" />
                    <rect x="300" y="165" width="12" height="14" />
                    <rect x="322" y="165" width="12" height="14" />
                  </g>

                  {/* Construction crane, off to the side */}
                  <g stroke="#7dd3fc" strokeOpacity="0.45" strokeWidth="1.3">
                    <line x1="345" y1="250" x2="345" y2="70" />
                    <line x1="345" y1="78" x2="230" y2="98" />
                    <line x1="345" y1="90" x2="380" y2="78" />
                    <line x1="270" y1="100" x2="270" y2="130" />
                  </g>
                  <rect x="262" y="130" width="16" height="14" fill="none" stroke="#7dd3fc" strokeOpacity="0.5" strokeWidth="1.2" />

                  {/* Entrance gate — the clear "gated community" signal,
                      front and center */}
                  <g stroke="#67e8f9" strokeWidth="1.8">
                    <line x1="150" y1="250" x2="150" y2="120" />
                    <line x1="250" y1="250" x2="250" y2="120" />
                    <path d="M 150 120 Q 200 90 250 120" fill="none" />
                    <circle cx="150" cy="112" r="3" fill="#67e8f9" />
                    <circle cx="250" cy="112" r="3" fill="#67e8f9" />
                  </g>
                  <line x1="160" y1="250" x2="240" y2="250" stroke="#67e8f9" strokeOpacity="0.6" strokeWidth="1.4" />
                </svg>
              </div>

              {/* Stats — was accepted as a prop before but never actually
                  rendered anywhere; now it is */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm"
                  >
                    <div className="font-display text-[22px] font-bold text-white">{s.value}</div>
                    <div className="mt-1 text-[9.5px] uppercase leading-tight tracking-[0.1em] text-white/50">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/*
        Entrance choreography is unchanged from before (slideUp/slideRight
        staggered across the left column). The right-side visual is now a
        single deliberate scene (gate + villas + crane) instead of six
        independently-animated floating icons, so there's one gentle glow
        pulse rather than a dozen competing loops — reads as premium
        because it's calmer, not because it's busier.

        `prefers-reduced-motion` is expected to already be force-disabled
        globally in your globals.css (as it is elsewhere on this site);
        that rule collapses every animation/transition duration here to
        instant automatically, since everything below is plain CSS
        keyframes with no JS-driven loop that would need a manual
        matchMedia check.
      */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .breadcrumb { animation: slideUp 0.4s ease-out forwards; }
        .eyebrow-container { animation: slideRight 0.5s ease-out 0.1s both; }
        .title-animated { animation: slideUp 0.6s ease-out 0.2s both; }
        .subtitle-animated { animation: slideUp 0.6s ease-out 0.3s both; }
        .cta-container { animation: slideUp 0.6s ease-out 0.4s both; }
        .stats-container { animation: slideLeft 0.7s ease-out 0.3s both; }
        .glow-pulse { animation: glowPulse 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}