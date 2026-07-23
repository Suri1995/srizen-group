import { forwardRef } from "react";
import {
  ShieldCheck,
  Trees,
  Building2,
  Clapperboard,
  Home,
  Sparkles,
  Milestone,
} from "lucide-react";
import { highlights, amenities } from "../data";

const highlightIcons = [
  ShieldCheck,
  Trees,
  Building2,
  Clapperboard,
  Home,
  Sparkles,
  Milestone,
];

const stats = [
  { value: "7", label: "Acres" },
  { value: "81", label: "Villas" },
  { value: "10K", label: "SFT Clubhouse" },
  { value: `${amenities.length}+`, label: "Amenities" },
];

export const Clubhouse = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="bg-navy py-12 text-white md:py-20">
      <div className="wrap">
        <div
          ref={ref}
          className="reveal grid grid-cols-1 gap-16 md:grid-cols-12 md:items-center md:gap-10"
        >
          {/* Copy column */}
          <div className="md:col-span-6">
            <div className="eyebrow eyebrow-on-dark">The Clubhouse</div>
            <h2 className="text-[32px] leading-[1.1] tracking-tight text-white md:text-[46px]">
              10,000 SFT of Curated
              <br className="hidden md:block" /> Clubhouse Living
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              A complete lifestyle experience — recreational and wellness
              facilities built for residents and their families. A place for
              fitness, celebration, quiet, and community.
            </p>


            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {highlights.map((h, i) => {
                const Icon = highlightIcons[i] ?? Sparkles;
                return (
                  <li key={h} className="group flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-colors duration-300 group-hover:border-cyan/40 group-hover:bg-cyan/[0.08]">
                      <Icon
                        className="h-4 w-4 text-cyan/80 transition-colors duration-300 group-hover:text-cyan"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="pt-1.5 text-[15px] leading-snug text-white/80">
                      {h}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Image column */}
          <div className="md:col-span-6">
            <div className="relative">
              {/* blueprint corner marks — signature detail */}
              <span className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l border-t border-cyan/40 md:-left-4 md:-top-4" />
              <span className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-cyan/40 md:-bottom-4 md:-right-4" />

              <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="/images/clubhouse.png"
                  alt="MIORAH clubhouse and pool deck"
                  className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00072e]/70 via-[#00072e]/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-[#00072e]/70 p-5 backdrop-blur-md">
                  <p className="font-mono text-xs uppercase tracking-[.15em] text-cyan">
                    Est. 2026 · Boduppal, Hyderabad
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    81 Villas · 7 Acres · {amenities.length}+ Amenities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Clubhouse.displayName = "Clubhouse";