// app/projects/miorah/components/Clubhouse.tsx
import { forwardRef } from "react";
import { highlights } from "../data";

export const Clubhouse = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="bg-navy py-24 text-white md:py-32">
      <div className="wrap">
        <div ref={ref} className="reveal grid grid-cols-1 gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <div className="eyebrow eyebrow-on-dark">The Clubhouse</div>
            <h2 className="text-[32px] text-white md:text-[46px]">
              10,000 SFT of Curated Clubhouse Living
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">
              Designed to deliver a complete lifestyle experience — modern
              recreational and wellness facilities for residents and
              their families. A perfect place for fitness, celebrations,
              relaxation and community living.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[15px] text-white/85">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6">
            {/* Replace with: clubhouse render / pool deck photography */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/miorah/clubhouse.jpg"
                alt="MIORAH clubhouse and pool deck"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00072e]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-[#00072e]/60 p-5 backdrop-blur-md">
                <p className="font-mono text-xs uppercase tracking-[.15em] text-cyan">
                  Est. 2026 · Boduppal, Hyderabad
                </p>
                <p className="mt-1 text-sm text-white/80">
                  81 Villas · 7 Acres · 40+ Amenities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Clubhouse.displayName = "Clubhouse";