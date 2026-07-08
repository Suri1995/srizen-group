"use client";
import Link from "next/link";
import useReveal from "./useReveal";
import { whyChoose } from "@/data/content";

export default function WhyChoose() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-36">
      <div className="wrap grid md:grid-cols-[0.85fr_1.15fr] gap-16 md:gap-20">
        <div ref={ref} data-in={inView} className="reveal">
          <p className="eyebrow">Why SriZen Group</p>
          <h2 className="text-[32px] md:text-[48px]">A partner built for the long term</h2>
          <p className="mt-6 text-ink-muted text-lg leading-relaxed max-w-[400px]">
            Every engagement is backed by the same operating principles — regardless of project
            size or sector.
          </p>
          <Link href="/contact" className="btn btn-outline-navy mt-9">
            Start a Project <span className="arrow">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-navy/10 border-t border-navy/10">
          {whyChoose.map(([title, copy], i) => (
            <div key={title} className="bg-white p-8">
              <div className="font-mono text-xs text-green">{String(i + 1).padStart(2, "0")}</div>
              <h4 className="font-body font-semibold text-base mt-3.5">{title}</h4>
              <p className="mt-2 text-[13.5px] text-ink-muted leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
