"use client";
import useReveal from "./useReveal";
import { industries } from "@/data/content";

const blurb: Record<string, string> = {
  Residential: "Homes and communities engineered for comfort and long-term value.",
  Commercial: "Grade-A office and mixed-use developments built to leasing standards.",
  Healthcare: "Clinical-grade facilities engineered for critical infrastructure uptime.",
  Hospitality: "Hotels and resorts built around guest experience and durability.",
  Education: "Campuses and institutional buildings designed for decades of use.",
  Manufacturing: "Heavy-load, high-throughput industrial facilities at scale.",
  Government: "Public infrastructure delivered to civic and accessibility codes.",
  Infrastructure: "Roads, bridges and utilities engineered to move cities forward.",
  Energy: "Power and utility infrastructure built for resilience and safety.",
  Warehousing: "Logistics and distribution facilities engineered for automation.",
};

export default function Industries() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section className="bg-navy-deep text-white py-20 md:py-28">
      <div className="wrap">
        <div ref={ref} data-in={inView} className="reveal section-head">
          <p className="eyebrow eyebrow-on-dark">Sectors We Serve</p>
          <h2 className="!text-white">Industries we build for</h2>
          <p className="!text-white/55">
            Deep sector expertise across the built environment, from residential towers to
            critical infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {industries.map((name) => (
            <div
              key={name}
              className="group bg-navy-deep aspect-square flex flex-col justify-between p-6 transition-colors duration-400 hover:bg-cyan/[.06]"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-cyan"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <div>
                <h4 className="font-body font-semibold text-[15px]">{name}</h4>
                <p className="mt-2 text-[12.5px] text-white/40 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[80px] transition-all duration-400 overflow-hidden">
                  {blurb[name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
