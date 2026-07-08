"use client";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/content";

export default function Process() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-bg-light py-24 md:py-36 overflow-hidden">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">How We Work</p>
          <h2>Our construction process</h2>
          <p>
            A structured, transparent delivery framework — from first consultation through
            post-handover support.
          </p>
        </div>

        <div ref={trackRef} className="relative mt-10">
          <div className="hidden lg:block absolute top-[26px] left-0 right-0 h-px bg-navy/15">
            <div
              className="absolute left-0 top-0 h-full bg-navy transition-[width] duration-[1600ms] ease-premium"
              style={{ width: active ? "100%" : "0%" }}
            />
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 gap-y-10">
            {process.map((step, i) => (
              <div key={step} className="text-left">
                <div
                  className="relative z-[2] w-[52px] h-[52px] rounded-full border flex items-center justify-center font-mono text-[13px] transition-all duration-400 ease-premium"
                  style={{
                    transitionDelay: active ? `${i * 160}ms` : "0ms",
                    background: active ? "#000F66" : "#F7F9FC",
                    color: active ? "#fff" : "#000F66",
                    borderColor: active ? "#000F66" : "rgba(0,15,102,0.2)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h5 className="mt-[18px] text-sm font-semibold">{step}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
