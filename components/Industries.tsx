"use client";
import type { ReactNode } from "react";
import useReveal from "./useReveal";
import { industries } from "@/data/content";

const blurb: Record<string, string> = {
  Residential: "Homes and communities engineered for comfort and long-term value.",
  Commercial: "Grade-A office and mixed-use developments built to leasing standards.",
  Healthcare: "Clinical-grade facilities engineered for critical infrastructure uptake.",
  Hospitality: "Hotels and resorts built around guest experience and durability.",
  Education: "Campuses and institutional buildings designed for decades of use.",
  Manufacturing: "Heavy-load, high-throughput industrial facilities at scale.",
  Government: "Public infrastructure delivered to civic and accessibility codes.",
  Infrastructure: "Roads, bridges and utilities engineered to move cities forward.",
  Energy: "Power and utility infrastructure built for resilience and safety.",
  Warehousing: "Logistics and distribution facilities engineered for automation.",
};

const stats = [
  { value: "10+", label: "Industry Sectors" },
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const iconPaths: Record<string, ReactNode> = {
  Residential: <path d="M12 3L3 9l3 2.25V21h4v-4h4v4h4V11.25L21 9l-9-6z" />,
  Commercial: (
    <>
      <rect x="4" y="8" width="6" height="12" rx="1" />
      <rect x="14" y="4" width="6" height="16" rx="1" />
      <path d="M2 20h20" />
    </>
  ),
  Healthcare: (
    <>
      <path d="M12 8v8M8 12h8" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  Hospitality: (
    <>
      <path d="M4 12h16M4 16h16M8 8h8" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  Education: (
    <>
      <path d="M12 3L2 9l10 6 10-6-10-6z" />
      <path d="M2 9v6l10 6 10-6V9" />
    </>
  ),
  Manufacturing: (
    <>
      <rect x="2" y="8" width="20" height="12" rx="1" />
      <path d="M8 8V4h8v4M2 14h20" />
    </>
  ),
  Government: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  Infrastructure: (
    <>
      <path d="M4 20h16M6 20V8l6-4 6 4v12" />
      <path d="M10 20v-4h4v4" />
    </>
  ),
  Energy: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2.5 2.5M15 15l2.5 2.5M6.5 17.5l2.5-2.5M15 9l2.5-2.5" />
    </>
  ),
  Warehousing: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="1" />
      <path d="M8 8V4h8v4M3 12h18" />
      <path d="M8 16h8M8 16v4M16 16v4" />
    </>
  ),
};

function IndustryIcon({ name }: { name: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="text-cyan transition-transform duration-500 motion-reduce:transition-none group-hover:scale-110 group-hover:rotate-1"
    >
      {iconPaths[name] ?? iconPaths.Residential}
    </svg>
  );
}

export default function Industries() {
  const [ref, inView] = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-navy-deep" aria-label="Industries we serve">
      {/* Background decoration - CSS only, no JS/image cost */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 20px 20px, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="wrap relative">
        {/* Section header */}
        <div ref={ref} data-in={inView} className="reveal section-head text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/30" aria-hidden="true" />
            <div className="text-[8px] md:text-[18px] mt-[-20px] font-mono tracking-[0.25em] uppercase text-cyan/80 bg-cyan/10 backdrop-blur-sm px-5 py-2 rounded-full border border-cyan/10">
              Sectors We Serve
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/30" aria-hidden="true" />
          </div>
          <h2 className="text-[38px] md:text-[48px] leading-[1.1] font-medium tracking-tight text-white">
            Industries we{" "}
            <span className="relative inline-block">
              build for
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-cyan/60 to-cyan/10 rounded-full" />
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-[16px] leading-relaxed max-w-lg mx-auto">
            Deep sector expertise across the built environment, from residential towers to critical infrastructure.
          </p>
        </div>

        {/* Industry cards - static, always-legible, no click/hover toggle to fight with */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16 list-none p-0 m-0">
          {industries.map((name) => (
            <li
              key={name}
              className="group relative flex h-full flex-col items-center rounded-2xl p-6 text-center bg-gradient-to-b from-white/[0.06] to-white/[0.02] transition-all duration-500 ease-premium motion-reduce:transition-none hover:from-white/[0.1] hover:to-white/[0.04] hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* True gradient-ring border, masked to the edge only, revealed on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100 pointer-events-none"
                style={{
                  padding: 1,
                  background: "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(34,211,238,0) 65%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan/10 blur-xl opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100" />
                <div className="relative w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transition-colors duration-500 motion-reduce:transition-none group-hover:bg-cyan/10">
                  <IndustryIcon name={name} />
                </div>
              </div>

              <h3 className="mt-4 font-display font-semibold text-[15px] text-white/90 transition-colors duration-300 group-hover:text-white">
                {name}
              </h3>

              <p className="mt-2 text-[13px] text-white/60 leading-relaxed line-clamp-3">{blurb[name]}</p>
            </li>
          ))}
        </ul>

        {/* Bottom stats bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-navy-deep/50 backdrop-blur-sm p-6 text-center transition-colors duration-500 motion-reduce:transition-none hover:bg-navy-deep/80"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-cyan/60 transition-transform duration-500 motion-reduce:transition-none group-hover:scale-x-100"
              />
              <p className="text-2xl font-display font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-[11px] font-mono tracking-[0.1em] uppercase text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}