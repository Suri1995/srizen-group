// app/projects/miorah/components/WhyChoose.tsx
import { forwardRef } from "react";
import { whyChoose } from "../data";

export const WhyChoose = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="wrap py-24 md:py-32">
      <div ref={ref} className="reveal section-head">
        <div className="eyebrow">Why Choose MIORAH?</div>
        <h2 className="text-navy">A Perfect Address for Families & Investment</h2>
        <p>
          Every detail — from plot size to interior layout — is designed
          around how modern families actually live.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {whyChoose.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-navy/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_20px_40px_-20px_rgba(0,15,102,0.2)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cyan">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="text-[18px] text-navy">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

WhyChoose.displayName = "WhyChoose";