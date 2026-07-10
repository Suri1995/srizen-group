// components/AboutTeaser.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake, CalendarCheck } from "lucide-react";

const VALUES = [
  { icon: ShieldCheck, label: "Engineered with rigor" },
  { icon: HeartHandshake, label: "Built with care" },
  { icon: CalendarCheck, label: "Delivered on schedule" },
];

export default function AboutTeaser() {
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
    <section ref={sectionRef} className="overflow-hidden py-8 md:py-20">
      <div className="wrap grid items-center gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        {/* ============================================================ */}
        {/* Image column — layered composition instead of a flat crop     */}
        {/* ============================================================ */}
        <div className={`about-in ${inView ? "about-in--on" : ""} relative`}>
          {/* Offset frame sitting behind the photo — the classic
              "layered" depth cue, in the brand's own line-art style
              rather than a plain drop shadow */}
          <div
            aria-hidden="true"
            className="absolute -right-5 -top-5 hidden bg-slate-500 h-full w-full rounded-2xl border border-navy/15 sm:block"
          />

          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/miorah-villas.jpeg"
              alt="Architectural structure"
              fill
              className="scale-110 object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00072e]/25 via-transparent to-transparent" />
          </div>

          {/* Floating stat badge */}
          <div className="absolute -bottom-7 -left-7 max-w-[230px] rounded-2xl bg-navy px-8 py-7 text-white shadow-[0_30px_60px_-20px_rgba(0,15,102,0.4)]">
            <div className="font-display text-[30px] font-bold text-cyan">18+</div>
            <div className="mt-1.5 text-[13px] text-white/70">
              Years delivering landmark developments across the region
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Text column                                                   */}
        {/* ============================================================ */}
        <div className={`about-in ${inView ? "about-in--on" : ""}`} style={{ transitionDelay: "120ms" }}>
          <p className="eyebrow">About SriZen Group</p>
          <h2 className="text-[32px] md:text-[50px]">Precision engineering, built on trust</h2>
          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-ink-muted">
            For nearly two decades, SriZen Group has partnered with governments, developers, and
            enterprises to deliver construction and infrastructure projects that stand the test of
            time — engineered with rigor, built with care, and delivered on schedule.
          </p>

          <ul className="mt-8 space-y-4">
            {VALUES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-navy">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-[15px] font-medium text-navy">{label}</span>
              </li>
            ))}
          </ul>

          {/* Plain text link, no button chrome — an underline that draws
              in on hover instead of a filled/outlined pill */}
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-navy"
          >
            <span className="relative">
              Our Story
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-300 ease-premium group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Pure CSS reveal, gated behind the IntersectionObserver above so it
          plays once, the first time this section scrolls into view.
          `prefers-reduced-motion` is already force-disabled globally in
          globals.css, so this automatically collapses to an instant,
          motion-free state for anyone who needs that. */}
      <style jsx>{`
        .about-in {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16, 0.84, 0.24, 1),
            transform 0.8s cubic-bezier(0.16, 0.84, 0.24, 1);
        }
        .about-in--on {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}