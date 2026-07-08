// app/projects/miorah/components/Amenities.tsx
import { forwardRef } from "react";
import { amenities } from "../data";

export const Amenities = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="wrap">
        <div ref={ref} className="reveal section-head mx-auto text-center">
          <div className="eyebrow mx-auto">Features & Amenities</div>
          <h2 className="mx-auto text-navy">40+ Resort-Style Amenities</h2>
          <p className="mx-auto">
            From wellness decks to sports courts — every corner of MIORAH
            is designed for how your family lives, plays and unwinds.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {amenities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 rounded-xl border border-navy/10 bg-white px-4 py-8 text-center transition-all duration-300 hover:border-navy/30 hover:shadow-[0_16px_32px_-16px_rgba(0,15,102,0.18)]"
            >
              <Icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
              <span className="text-[13px] font-medium leading-snug text-ink">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[.2em] text-ink-muted">
          + 24 more amenities across the community
        </p>
      </div>
    </section>
  );
});

Amenities.displayName = "Amenities";