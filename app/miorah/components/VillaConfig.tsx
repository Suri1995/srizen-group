// app/projects/miorah/components/VillaConfig.tsx
import { forwardRef, useState } from "react";
import { ArrowUpRight, Compass, Layers, Ruler } from "lucide-react";
import { villaSpecs } from "../data";
import { SpecMini } from "./Helpers";

export const VillaConfig = forwardRef<HTMLDivElement>((props, ref) => {
  const [idx, setIdx] = useState(0);
  const active = villaSpecs[idx];

  return (
    <section id="configurations" className="bg-secondary py-24 md:py-32">
      <div className="wrap">
        <div ref={ref} className="reveal section-head mx-auto text-center">
          <div className="eyebrow mx-auto">Project Highlights</div>
          <h2 className="mx-auto text-navy">Choose Your Villa Configuration</h2>
          <p className="mx-auto">
            Six triplex footprints, from 153 to 472 sq. yards — every one
            a G+2 villa built for families who want room to grow.
          </p>
        </div>

        {/* Villa type selector — same card-grid pattern as Floor Plans, for a consistent feel */}
        <div className="mx-auto mb-10 grid max-w-[960px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {villaSpecs.map((v, i) => (
            <button
              key={v.key}
              onClick={() => setIdx(i)}
              className={`rounded-2xl border px-4 py-4 text-center transition-all duration-300 ${
                i === idx
                  ? "border-navy bg-navy text-white shadow-[0_16px_32px_-16px_rgba(0,15,102,0.4)]"
                  : "border-navy/15 bg-white text-navy hover:-translate-y-0.5 hover:border-navy/40"
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[.15em] opacity-60">
                {v.key}
              </div>
              <div className="mt-1 text-xl font-display font-bold leading-none">
                {v.sqyds}
                <span className="ml-1 text-xs font-body font-normal opacity-60">Sq.Yd</span>
              </div>
              <div className="mt-1 text-[11px] opacity-60">{v.facing}</div>
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-[880px]">
          <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(0,15,102,0.15)] md:grid-cols-2 md:p-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[.2em] text-navy/50">
                {active.tag}
              </span>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-[64px] font-display font-bold leading-none text-navy">
                  {active.sqyds}
                </span>
                <span className="mb-2 font-mono text-sm text-ink-muted">Sq. Yds Plot</span>
              </div>
              <p className="mt-4 text-ink-muted">
                {active.key} is a {active.facing.toLowerCase()} G+2 triplex —
                see the full ground, first and second floor layout with
                exact room-wise dimensions in the floor plans below.
              </p>
              <a
                href="#floor-plans"
                className="btn btn-ghost-solid mt-6 py-3"
              >
                View Floor Plan <ArrowUpRight className="arrow h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SpecMini label="Plot Size" value={`${active.sqyds} Sq. Yd`} />
              <SpecMini label="Facing" value={active.facing} />
              <SpecMini label="Structure" value="G+2 Triplex" />
              <SpecMini label="Villa Type" value={active.key} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

VillaConfig.displayName = "VillaConfig";