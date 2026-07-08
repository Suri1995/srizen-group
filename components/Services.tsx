"use client";
import useReveal from "./useReveal";
import { services } from "@/data/content";

export default function Services() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div ref={ref} data-in={inView} className="reveal section-head">
          <p className="eyebrow">What We Do</p>
          <h2>Comprehensive construction &amp; engineering services</h2>
          <p>
            From first sketch to final handover, SriZen Group manages every stage of the build
            with in-house expertise across disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10 border border-navy/10">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="group relative bg-white p-9 min-h-[270px] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-navy translate-y-full transition-transform duration-500 ease-premium group-hover:translate-y-0 z-0" />
              <span className="relative z-10 font-mono text-xs text-ink-muted group-hover:text-cyan transition-colors duration-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10">
                <h3 className="text-[21px] mt-14 font-display font-semibold group-hover:text-white transition-colors duration-400">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-ink-muted leading-relaxed group-hover:text-white/65 transition-colors duration-400">
                  {s.summary}
                </p>
                <p className="mt-3 text-[13px] text-ink-muted/0 leading-relaxed max-h-0 group-hover:max-h-[120px] group-hover:text-white/50 overflow-hidden transition-all duration-400">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
