// components/HomeHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "240+", label: "Projects Delivered" },
  { value: "26", label: "Cities" },
  { value: "2008", label: "Est." },
  { value: "17+", label: "Years of Trust" },
];

// Static, tiny, no runtime cost — a touch of film-grain so the flat colour
// panel doesn't read as a plain digital gradient. Rendered once, cached by
// the browser like any other background-image.
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

/** Counts a stat up from 0 on mount. Respects prefers-reduced-motion by
 *  skipping straight to the final value — CSS alone can't cover a
 *  JS-driven number change, so this checks matchMedia itself. */
function StatValue({ value, delay }: { value: string; delay: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match || reduce) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 900;
    let raf = 0;
    let start: number | null = null;

    const timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * target) + suffix);
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return <>{display}</>;
}

export default function HomeHero() {
  const [in_, setIn] = useState(false);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setIn(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.12, 80);
        if (imgWrapRef.current) {
          imgWrapRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#00072e] py-8 sm:pb-20 sm:pt-32 lg:min-h-[92vh]">
      <div ref={imgWrapRef} className="absolute -inset-y-14 inset-x-0 will-change-transform">
        <Image
          src="/images/hero-villas.jpg"
          alt="SriZen Group villa community at dusk"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00072e]/90 via-[#00072e]/35 to-transparent" />
      </div>

      <div className={`hero-panel ${in_ ? "hero-panel--in" : ""} absolute inset-0`} />

      {/* Cinematic vignette — darkens the corners a touch so the frame
          feels composed rather than a flat crop of a photo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_30%,transparent_45%,rgba(0,7,46,0.45)_100%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundRepeat: "repeat" }}
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="75"
          y1="0"
          x2="45"
          y2="100"
          vectorEffect="non-scaling-stroke"
          className={`seam ${in_ ? "seam--in" : ""}`}
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
        <div className="max-w-full sm:max-w-[480px] md:max-w-[540px] lg:max-w-[600px]">
          <div
            className="hero-in absolute bottom-8 right-4 z-10 hidden items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md sm:flex md:right-6 md:gap-3 md:px-5 md:py-3.5 lg:right-12"
            style={{ animationDelay: "700ms" }}
          >
            <span className="font-display text-lg font-bold text-cyan sm:text-xl md:text-2xl">17+</span>
            <span className="max-w-[7ch] text-[9px] font-medium uppercase leading-tight tracking-[.06em] text-white/75 sm:max-w-[8ch] sm:text-[10px] md:max-w-[9ch] md:text-[11px]">
              Years of Trusted Excellence
            </span>
          </div>

          <div className="hero-in eyebrow eyebrow-on-dark" style={{ animationDelay: "0ms" }}>
            <span>SRIZEN GROUP</span>
          </div>

          <h1 className="text-[28px] leading-[1.08] text-white sm:text-[38px] md:text-[46px] md:leading-[1.05] lg:text-[54px] xl:text-[58px]">
            <span className="hero-in line-mask block" style={{ animationDelay: "80ms" }}>
              Building Tomorrow
            </span>
            <span className="hero-in line-mask block text-cyan" style={{ animationDelay: "180ms" }}>
              with Precision.
            </span>
          </h1>

          <p
            className="hero-in mt-4 text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base md:mt-6 md:text-lg"
            style={{ animationDelay: "280ms" }}
          >
            Est. 2008 &middot; Hyderabad — engineering excellence across
            construction, infrastructure, commercial, residential and
            industrial projects, delivered at scale.
          </p>

          <div
            className="hero-in mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3 md:mt-10 md:gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="/projects"
              className="group btn btn-primary bg-cyan px-4 py-2.5 text-sm text-[#00072e] hover:bg-white sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
              <span className="relative">Explore Projects</span>
              <ArrowUpRight className="arrow relative h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="group btn btn-ghost px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
              <span className="relative">Contact Us</span>
              <ArrowUpRight className="arrow relative h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            </Link>
          </div>

          <dl
            className="hero-in mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 pt-6 sm:mt-10 sm:gap-x-6 sm:gap-y-6 sm:pt-7 md:mt-12 md:gap-x-8 md:pt-8 lg:mt-14 lg:gap-x-10"
            style={{ animationDelay: "440ms" }}
          >
            {STATS.map((s, i) => (
              <div key={s.label}>
                <dd className="font-display text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  <StatValue value={s.value} delay={500 + i * 90} />
                </dd>
                <dt className="mt-1 font-mono text-[9px] uppercase tracking-[.12em] text-white/55 sm:text-[10px] sm:tracking-[.15em] md:text-[11px]">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <style jsx>{`
        .hero-panel {
          background: linear-gradient(135deg, #00072e 0%, #000a52 45%, #000f66 100%);
          clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
          transition: clip-path 1.15s cubic-bezier(0.16, 0.84, 0.24, 1);
        }
        .hero-panel--in {
          clip-path: polygon(0% 0%, 85% 0%, 55% 100%, 0% 100%);
        }
        @media (min-width: 640px) {
          .hero-panel--in {
            clip-path: polygon(0% 0%, 80% 0%, 48% 100%, 0% 100%);
          }
        }
        @media (min-width: 768px) {
          .hero-panel--in {
            clip-path: polygon(0% 0%, 75% 0%, 42% 100%, 0% 100%);
          }
        }
        @media (min-width: 1024px) {
          .hero-panel--in {
            clip-path: polygon(0% 0%, 72% 0%, 40% 100%, 0% 100%);
          }
        }

        .seam {
          stroke: #00ffff;
          stroke-opacity: 0.6;
          stroke-width: 1.25;
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
          filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.55));
          transition: stroke-dashoffset 1.2s cubic-bezier(0.16, 0.84, 0.24, 1) 0.5s;
        }
        .seam--in {
          stroke-dashoffset: 0;
        }

        .hero-in {
          opacity: 0;
          animation: heroIn 0.7s cubic-bezier(0.16, 0.84, 0.24, 1) forwards;
        }
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-track {
          display: block;
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}