// app/projects/miorah/components/FloorPlans.tsx
"use client";

import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, ZoomIn, Compass, Ruler, Layers } from "lucide-react";
import { floorPlans } from "../data";

const FLOORS = [
  { key: "second", label: "02", name: "Second Floor" },
  { key: "first", label: "01", name: "First Floor" },
  { key: "ground", label: "G", name: "Ground Floor" },
] as const;

type FloorKey = (typeof FLOORS)[number]["key"];

export const FloorPlans = forwardRef<HTMLDivElement>((props, ref) => {
  const [typeIdx, setTypeIdx] = useState(0);
  const [floor, setFloor] = useState<FloorKey>("ground");
  const [lightbox, setLightbox] = useState(false);

  const type = floorPlans[typeIdx];
  const activeFloor = type.floors.find((f) => f.key === floor)!;

  // Reset to ground floor whenever the villa type changes
  useEffect(() => setFloor("ground"), [typeIdx]);

  // Escape key closes the lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="floor-plans" className="wrap py-12 md:py-20 border border-b-slate-300 shadow-gray-400">
      <div ref={ref} className="reveal section-head">
        <div className="eyebrow">Floor Plans</div>
        <h2 className="text-navy">Explore Every Level of Your Triplex</h2>
        <p>
          Six villa footprints, from 153 to 472 sq. yards — each a full
          ground, first and second floor layout. Download the working
          drawing for exact, room-wise dimensions.
        </p>
      </div>

      {/* Villa type selector — card grid, sorted by plot size */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {floorPlans.map((t, i) => (
          <button
            key={t.type}
            onClick={() => setTypeIdx(i)}
            className={`rounded-2xl border px-4 py-4 text-center transition-all duration-300 ${
              i === typeIdx
                ? "border-navy bg-navy text-white shadow-[0_16px_32px_-16px_rgba(0,15,102,0.4)]"
                : "border-navy/15 bg-white text-navy hover:-translate-y-0.5 hover:border-navy/40"
            }`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[.15em] opacity-60">
              {t.type}
            </div>
            <div className="mt-1 text-xl font-display font-bold leading-none">
              {t.sqyds}
              <span className="ml-1 text-xs font-body font-normal opacity-60">Sq.Yd</span>
            </div>
            <div className="mt-1 text-[11px] opacity-60">{t.facing}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 rounded-[28px] border border-navy/10 bg-secondary p-4 md:grid-cols-[96px_1fr] md:p-6">
        {/* Elevator-style floor selector — the building's own levels, in order */}
        <div className="flex flex-row items-stretch justify-between gap-2 rounded-2xl bg-white p-2 md:flex-col md:justify-start md:gap-2 md:p-3">
          {FLOORS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFloor(f.key)}
              aria-label={f.name}
              className={`group flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-4 font-mono transition-all duration-300 md:flex-none ${
                floor === f.key
                  ? "bg-navy text-cyan shadow-[0_10px_24px_-10px_rgba(0,15,102,0.4)]"
                  : "text-navy/40 hover:bg-navy/5 hover:text-navy"
              }`}
            >
              <span className="text-lg font-bold leading-none">{f.label}</span>
              <span className="hidden text-[9px] uppercase tracking-[.1em] md:block">
                Floor
              </span>
            </button>
          ))}
        </div>

        {/* Plan viewer */}
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-navy/10 px-6 py-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[.15em] text-ink-muted">
                {type.type} · {activeFloor.name}
              </p>
              <p className="text-[15px] font-semibold text-navy">
                {type.sqyds} Sq. Yds &middot; {type.facing}
              </p>
            </div>
            <button
              onClick={() => setLightbox(true)}
              className="flex items-center gap-2 rounded-lg border border-navy/15 px-3.5 py-2 text-xs font-semibold text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ZoomIn className="h-3.5 w-3.5" /> Zoom
            </button>
          </div>

          <button
            onClick={() => setLightbox(true)}
            className="relative block w-full cursor-zoom-in bg-[repeating-linear-gradient(45deg,#f8fafc,#f8fafc_10px,#f1f5f9_10px,#f1f5f9_20px)]"
          >
            <Image
              key={activeFloor.image}
              src={activeFloor.image}
              alt={`${type.type} ${activeFloor.name} plan`}
              width={720}
              height={400}
              className="mx-auto max-h-[340px] w-full max-w-[720px] object-contain p-4 transition-opacity duration-300 md:max-h-[400px] md:p-6"
            />
          </button>

          {/* Spec strip + download */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 px-6 py-5">
            <div className="flex flex-wrap gap-6">
              <SpecChip icon={Ruler} label="Plot Size" value={`${type.sqyds} Sq. Yds`} />
              <SpecChip icon={Compass} label="Facing" value={type.facing} />
              <SpecChip icon={Layers} label="Structure" value="G+2 Triplex" />
            </div>
            <a href={type.pdf} download className="btn btn-primary py-3">
              Download Full Plan (PDF) <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#00072e]/95 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[.2em] text-cyan md:left-10 md:top-10">
            {type.type} · {activeFloor.name}
          </div>
          <img
            src={activeFloor.image}
            alt={`${type.type} ${activeFloor.name} plan enlarged`}
            className="max-h-full max-w-full cursor-zoom-out rounded-lg bg-white object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
});

FloorPlans.displayName = "FloorPlans";

function SpecChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ruler;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-navy/50" strokeWidth={1.75} />
      <div className="leading-tight">
        <div className="font-mono text-[10px] uppercase tracking-[.1em] text-ink-muted">
          {label}
        </div>
        <div className="text-[13px] font-semibold text-navy">{value}</div>
      </div>
    </div>
  );
}