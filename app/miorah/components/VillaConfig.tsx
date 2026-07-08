// app/projects/miorah/components/VillaConfig.tsx
import { forwardRef, useState } from "react";
import { villaSpecs } from "../data";
import { SpecMini } from "./Helpers";

export const VillaConfig = forwardRef<HTMLDivElement>((props, ref) => {
  const [villa, setVilla] = useState<"220" | "230">("230");
  const active = villaSpecs.find((v) => v.key === villa)!;

  return (
    <section id="configurations" className="bg-secondary py-24 md:py-32">
      <div className="wrap">
        <div ref={ref} className="reveal section-head mx-auto text-center">
          <div className="eyebrow mx-auto">Project Highlights</div>
          <h2 className="mx-auto text-navy">Choose Your Villa Configuration</h2>
          <p className="mx-auto">
            Two thoughtfully planned triplex layouts — both built for
            families who want room to grow.
          </p>
        </div>

        <div className="mx-auto max-w-[880px]">
          <div className="mb-10 flex justify-center gap-3">
            {villaSpecs.map((v) => (
              <button
                key={v.key}
                onClick={() => setVilla(v.key)}
                className={`rounded-full border px-6 py-3 font-mono text-sm uppercase tracking-[.1em] transition-all duration-300 ${
                  villa === v.key
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 bg-white text-navy/60 hover:border-navy/50"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(0,15,102,0.15)] md:grid-cols-2 md:p-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[.2em] text-accent-foreground/50 text-navy/50">
                {active.tag}
              </span>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-[64px] font-display font-bold leading-none text-navy">
                  {active.builtUp}
                </span>
                <span className="mb-2 font-mono text-sm text-ink-muted">SFT Built-up</span>
              </div>
              <p className="mt-4 text-ink-muted">
                On a {active.plot} sq. yard plot — a G+2 triplex with a
                private theatre room and premium interior finishes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SpecMini label="Plot Size" value={`${active.plot} Sq. Yd`} />
              <SpecMini label="Built-up Area" value={`${active.builtUp} SFT`} />
              <SpecMini label="Structure" value="G+2 Triplex" />
              <SpecMini label="Theatre Room" value="Included" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

VillaConfig.displayName = "VillaConfig";