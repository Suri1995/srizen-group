"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/content";

interface CounterProps {
  value: number;
  suffix: string;
}

function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="font-display text-[34px] md:text-[46px] font-bold text-navy tracking-[-0.02em]"
    >
      {display}
      <span className="text-green">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg-light py-24">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-5 ${
                i !== 0 ? "lg:border-l lg:border-navy/10" : ""
              } ${i % 3 !== 0 ? "md:border-l md:border-navy/10" : ""} ${
                i % 2 !== 0 ? "border-l border-navy/10 md:border-l-0" : ""
              } border-b border-navy/10 lg:border-b-0 pb-6 lg:pb-5`}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-2.5 text-[13.5px] text-ink-muted tracking-[.02em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
