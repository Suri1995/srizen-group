// components/ServicesTeaser.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Home,
  Building2,
  Factory,
  Milestone,
  Layers,
  Compass,
  HardHat,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/content";

// Maps a service to a representative icon by keyword, so each card gets a
// distinct visual anchor instead of every card looking identical apart
// from its text. Falls back to a generic icon if nothing matches.
function iconFor(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("residential")) return Home;
  if (t.includes("commercial")) return Building2;
  if (t.includes("industrial")) return Factory;
  if (t.includes("infrastructure")) return Milestone;
  if (t.includes("turnkey")) return Layers;
  if (t.includes("civil")) return Compass;
  return HardHat;
}

function ServiceCard({
  title,
  summary,
  href,
  index,
  inView,
}: {
  title: string;
  summary: string;
  href: string;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const Icon = iconFor(title);

  // Cursor-tracked spotlight — writes directly to the DOM via refs instead
  // of React state, so mousemove never triggers a re-render. rAF-throttled
  // so it can't fire more than once per frame no matter how fast the
  // pointer moves.
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spot.style.background = `radial-gradient(280px circle at ${x}% ${y}%, rgba(0,255,255,0.14), transparent 70%)`;
    });
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={onMouseMove}
      className={`svc-card ${inView ? "svc-card--on" : ""} group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/10 bg-white p-8 transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:border-navy/25 hover:shadow-[0_28px_50px_-24px_rgba(0,15,102,0.28)]`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Cursor-follow spotlight, fades in only on hover */}
      <div
        ref={spotRef}
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-[#000f66] text-cyan transition-transform duration-400 ease-premium group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="font-mono text-[11px] text-ink-muted/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="font-display text-[20px] font-semibold text-navy">{title}</h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{summary}</p>

        <span className="mt-5 flex -translate-x-2 items-center gap-1.5 text-[13px] font-semibold text-navy opacity-0 transition-all duration-400 ease-premium group-hover:translate-x-0 group-hover:opacity-100">
          Learn more <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Accent underline that draws in from the left on hover */}
      <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-navy to-cyan transition-all duration-500 ease-premium group-hover:w-full" />
    </Link>
  );
}

export default function ServicesTeaser() {
  const featured = services.slice(0, 6);
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-light py-8 md:py-20">
      <div className="wrap">
        <div className="section-head !mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2>Comprehensive construction &amp; engineering services</h2>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-navy"
          >
            <span className="relative">
              View All Services
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-300 ease-premium group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              summary={s.summary}
              href={`/services/${s.slug}`}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {/*
        Every motion here is opacity/transform or a background-image
        write on a ref (not React state), so nothing forces layout or
        triggers unnecessary re-renders — the spotlight in particular
        updates the DOM directly and is capped to once per animation
        frame regardless of pointer speed.

        `prefers-reduced-motion` is already force-disabled globally in
        globals.css (collapses every animation/transition duration to
        0.01ms), so the scroll-reveal and every hover transition here
        automatically collapse to instant for anyone who needs that. The
        cursor spotlight is a continuous mousemove effect rather than a
        timed animation, so — matching how reduced-motion is meant to be
        read — it's hidden outright for that audience below, rather than
        just sped up.
      */}
      <style jsx>{`
        .svc-card {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 0.84, 0.24, 1),
            transform 0.7s cubic-bezier(0.16, 0.84, 0.24, 1);
        }
        .svc-card--on {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .spotlight {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}