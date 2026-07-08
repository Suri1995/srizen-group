"use client";
import Image from "next/image";
import useReveal from "./useReveal";
import { values } from "@/data/content";

export default function About() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="py-24 md:py-36">
      <div className="wrap grid md:grid-cols-[0.9fr_1.1fr] gap-16 md:gap-24 items-center">
        <div ref={ref} data-in={inView} className="reveal relative">
          <div className="relative rounded-md overflow-hidden aspect-[4/5] group">
            <Image
              src="/images/miorah-villas.jpeg"
              alt="Architectural structure"
              fill
              className="object-cover scale-110 transition-transform duration-[1400ms] ease-premium group-hover:scale-100"
            />
          </div>
          <div className="absolute -bottom-7 -left-7 bg-navy text-white px-8 py-7 rounded-md max-w-[230px] shadow-[0_30px_60px_-20px_rgba(0,15,102,0.4)]">
            <div className="font-display text-[30px] font-bold text-cyan">18+</div>
            <div className="mt-1.5 text-[13px] text-white/70">
              Years delivering landmark developments across the region
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">About SriZen Group</p>
          <h2 className="text-[32px] md:text-[50px]">Precision engineering, built on trust</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            For nearly two decades, SriZen Group has partnered with governments, developers, and
            enterprises to deliver construction and infrastructure projects that stand the test of
            time — engineered with rigor, built with care, and delivered on schedule.
          </p>
          <div className="mt-11 grid grid-cols-2 gap-7">
            {values.map((v) => (
              <div key={v.title} className="border-t border-navy/10 pt-[18px]">
                <h4 className="text-base font-semibold text-navy font-body">{v.title}</h4>
                <p className="mt-2 text-[14.5px] text-ink-muted leading-relaxed">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
