"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote, Pause, Play, Star } from "lucide-react";
import { testimonials } from "@/data/content";

const INTERVAL = 5500;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Auto-rotation is fully suppressed — not just slowed — for
  // prefers-reduced-motion, since automatically-changing content is
  // exactly what that preference exists to avoid (WCAG 2.2.2). It's also
  // paused on hover/focus and via an explicit pause button, since
  // auto-advancing content longer than 5s otherwise needs a user-operable
  // stop control regardless of motion preference.
  const paused = manualPause || hovering || reducedMotion.current;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, current]);

  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary via-white to-secondary py-8 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[110px]"
      />

      <div className="wrap relative">
        <div
          className="mx-auto max-w-[760px] rounded-[28px] border border-navy/10 bg-white/70 px-8 py-14 text-center shadow-[0_40px_80px_-40px_rgba(0,15,102,0.2)] backdrop-blur-md sm:px-14 sm:py-16"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <p className="eyebrow justify-center">Client Voices</p>

          <Quote
            aria-hidden="true"
            className="mx-auto mt-2 h-9 w-9 text-navy/10"
            strokeWidth={1.5}
            fill="currentColor"
          />

          {/* aria-live announces the new quote to screen readers whenever
              the testimonial changes, whether that's automatic or manual */}
          <div key={current} className="testimonial-in mt-2" aria-live="polite">
            <div className="mb-8 flex justify-center gap-1" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  aria-hidden="true"
                  className="star-in h-4 w-4 fill-amber-400 text-amber-400"
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              ))}
            </div>

            <p className="font-display text-xl font-medium leading-snug text-navy md:text-[28px]">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-9 flex items-center justify-center gap-4">
              <div className="relative h-[52px] w-[52px] overflow-hidden rounded-full ring-2 ring-white">
                <Image src={t.photo} alt={t.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <div className="text-[14.5px] font-semibold text-navy">{t.name}</div>
                <div className="text-[13px] text-ink-muted">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="mt-11 flex items-center justify-center gap-4">
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-current={i === current}
                  className={`relative h-2 overflow-hidden rounded-full bg-navy/15 transition-all duration-300 ${
                    i === current ? "w-8" : "w-2"
                  }`}
                >
                  {i === current && !paused && !reducedMotion.current && (
                    <span
                      key={current}
                      className="progress-fill absolute inset-y-0 left-0 rounded-full bg-navy"
                    />
                  )}
                  {i === current && (paused || reducedMotion.current) && (
                    <span className="absolute inset-0 rounded-full bg-navy" />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setManualPause((p) => !p)}
              aria-label={manualPause ? "Resume testimonial rotation" : "Pause testimonial rotation"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/15 text-navy/50 transition-colors hover:border-navy/40 hover:text-navy"
            >
              {manualPause ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/*
        `.testimonial-in` fades/rises each new quote in — pure CSS,
        keyed by `current` so it replays per testimonial. The per-dot
        `.progress-fill` visualizes the time until the next auto-advance,
        the way a lot of premium story/carousel UIs do, and simply isn't
        rendered at all when paused or under reduced motion, rather than
        being present but frozen (which would misrepresent state to
        screen reader users navigating by DOM structure).

        `prefers-reduced-motion` is already force-disabled globally in
        globals.css (collapses every animation/transition duration to
        0.01ms), so `.testimonial-in` and `.star-in` automatically
        collapse to instant for anyone who needs that. Auto-rotation
        itself is handled explicitly above rather than relying on that
        rule, since suppressing the interval entirely (not just speeding
        up its CSS) is what the reduced-motion preference is actually
        asking for here.
      */}
      <style jsx>{`
        .testimonial-in {
          animation: fadeUp 0.6s cubic-bezier(0.16, 0.84, 0.24, 1);
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .star-in {
          opacity: 0;
          animation: starIn 0.4s ease-out forwards;
        }
        @keyframes starIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .progress-fill {
          width: 0%;
          animation: progressFill ${INTERVAL}ms linear forwards;
        }
        @keyframes progressFill {
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}