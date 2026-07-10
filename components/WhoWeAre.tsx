// components/WhoWeAre.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const CAPABILITIES = ["Construction", "Infrastructure", "Commercial", "Residential", "Industrial"];

// A villa's body + roof + windows, all grouped so the whole thing can grow
// up from the ground as one unit, then have its windows light up after.
function Villa({
  x,
  width,
  height,
  groundY,
  delay,
}: {
  x: number;
  width: number;
  height: number;
  groundY: number;
  delay: number;
}) {
  const top = groundY - height;
  const winW = width * 0.22;
  const winGap = (width - winW * 2) / 3;

  return (
    <g
      className="villa-grow"
      style={{ animationDelay: `${delay}ms`, transformBox: "fill-box", transformOrigin: "bottom" }}
    >
      {/* Soft ground glow */}
      <ellipse
        cx={x + width / 2}
        cy={groundY + 2}
        rx={width * 0.62}
        ry={5}
        fill="#00ffff"
        opacity={0.12}
      />
      {/* Body */}
      <rect
        x={x}
        y={top}
        width={width}
        height={height}
        fill="none"
        stroke="#00e6e6"
        strokeWidth={1.6}
      />
      {/* Flat-roof cantilever, echoing the real villa massing */}
      <rect
        x={x - width * 0.08}
        y={top - height * 0.16}
        width={width * 0.62}
        height={height * 0.16}
        fill="none"
        stroke="#00e6e6"
        strokeWidth={1.6}
      />
      {/* Windows — light up after the body has grown in */}
      <g className="villa-windows" style={{ animationDelay: `${delay + 450}ms` }}>
        <rect x={x + winGap} y={top + height * 0.42} width={winW} height={height * 0.22} fill="#00ffff" opacity={0.55} />
        <rect
          x={x + winGap * 2 + winW}
          y={top + height * 0.42}
          width={winW}
          height={height * 0.22}
          fill="#00ffff"
          opacity={0.55}
        />
      </g>
    </g>
  );
}

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="wrap py-8 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={`who-in ${inView ? "who-in--on" : ""}`}>
          <p className="eyebrow text-xs sm:text-sm">Who We Are</p>
          <h2 className="max-w-[16ch] text-[28px] text-navy sm:text-[34px] md:text-[40px] lg:text-[44px]">
            Engineering excellence, delivered at scale
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-ink-muted sm:text-base md:text-[17px]">
            SriZen Group delivers innovative construction, infrastructure,
            commercial, residential, and industrial projects with
            uncompromising quality and precision —{" "}
            <span className="font-semibold text-navy">240+ projects</span>{" "}
            across <span className="font-semibold text-navy">26 cities</span>.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {CAPABILITIES.map((c) => (
              <li
                key={c}
                className="rounded-full border border-navy/15 bg-secondary px-4 py-1.5 text-[12.5px] font-medium text-navy/75"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* ============================================================ */}
        {/* Illustration column — villas rising, windows lighting up      */}
        {/* ============================================================ */}
        <div className={`who-in ${inView ? "who-in--on" : ""}`} style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#00072e] to-[#000f66] shadow-[0_40px_80px_-30px_rgba(0,15,102,0.4)] sm:mx-auto lg:mx-0 lg:ml-auto">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                backgroundRepeat: "repeat",
              }}
              aria-hidden="true"
            />

            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              {/* Ground line */}
              <line x1="20" y1="300" x2="380" y2="300" stroke="#00ffff" strokeOpacity={0.3} strokeWidth={1} />

              {/* Crane — mast, jib, and a load that bobs gently once built */}
              <g className={inView ? "crane-in" : ""} opacity={inView ? 1 : 0}>
                <line x1="55" y1="300" x2="55" y2="70" stroke="#7fd6d6" strokeOpacity={0.5} strokeWidth={1.4} />
                <line x1="55" y1="78" x2="150" y2="98" stroke="#7fd6d6" strokeOpacity={0.5} strokeWidth={1.4} />
                <line x1="55" y1="90" x2="90" y2="78" stroke="#7fd6d6" strokeOpacity={0.4} strokeWidth={1} />
                <g className="crane-bob">
                  <line x1="130" y1="100" x2="130" y2="130" stroke="#7fd6d6" strokeOpacity={0.5} strokeWidth={1} />
                  <rect x="122" y="130" width="16" height="14" fill="none" stroke="#7fd6d6" strokeOpacity={0.6} strokeWidth={1.2} />
                </g>
              </g>

              {/* Villas — staggered growth */}
              <Villa x={80} width={70} height={90} groundY={300} delay={0} />
              <Villa x={165} width={80} height={140} groundY={300} delay={220} />
              <Villa x={260} width={72} height={110} groundY={300} delay={440} />
            </svg>

            {/* Caption chip */}
            <div
              className={`who-in absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md ${
                inView ? "who-in--on" : ""
              }`}
              style={{ animationDelay: "900ms" }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[.18em] text-cyan">Live Progress</p>
              <p className="mt-1 text-[13.5px] text-white/80">Turning blueprints into villas.</p>
            </div>
          </div>
        </div>
      </div>

      {/*
        `.villa-grow` / `.villa-windows` / `.crane-bob` are all pure CSS
        keyframes gated behind the `inView` state from the
        IntersectionObserver above, so the whole illustration only
        animates once, the first time it scrolls into view — not on every
        render, and not before the visitor can actually see it.

        `prefers-reduced-motion` is already force-disabled globally in
        globals.css (collapses every animation/transition duration to
        0.01ms and iteration-count to 1), so all of this — including the
        otherwise-infinite crane bob — automatically collapses to an
        instant, static final state for anyone who needs that, with
        nothing extra required here.
      */}
      <style jsx>{`
        .who-in {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16, 0.84, 0.24, 1),
            transform 0.8s cubic-bezier(0.16, 0.84, 0.24, 1);
        }
        .who-in--on {
          opacity: 1;
          transform: translateY(0);
        }

        .villa-grow {
          transform: scaleY(0);
          opacity: 0;
          animation: villaGrow 0.8s cubic-bezier(0.16, 0.84, 0.24, 1) forwards;
        }
        @keyframes villaGrow {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        .villa-windows {
          opacity: 0;
          animation: winFade 0.6s ease-out forwards;
        }
        @keyframes winFade {
          to {
            opacity: 1;
          }
        }

        .crane-in {
          transition: opacity 0.6s ease-out;
        }

        .crane-bob {
          animation: craneBob 2.4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: top;
        }
        @keyframes craneBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </section>
  );
}