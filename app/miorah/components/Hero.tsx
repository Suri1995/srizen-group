"use client";

import { forwardRef } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Stat } from "./Helpers";

export const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#00072e]">
      {/* background image with slow ken-burns zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/entrance-gate.png"
          alt="MIORAH by SriZen — gated villa community entrance at dusk"
          className="h-full w-full object-cover object-center scale-[1.08] animate-[kenburns_18s_ease-in-out_infinite_alternate]"
        />
      </div>

      {/* layered gradients for legibility, matching original palette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00072e] via-[#00072e]/55 to-[#00072e]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00072e]/90 via-[#00072e]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#00072e]/70 via-transparent to-transparent" />

      {/* decorative cyan glow */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-cyan/20 blur-[100px]" />

      <div className="wrap relative z-10 flex min-h-[720px] flex-col justify-end pb-20 pt-32">
        <div className="eyebrow eyebrow-on-dark flex items-center gap-2">
          <span className="h-px w-6 bg-cyan" />
          <span>SRIZEN GROUP · PROJECT</span>
        </div>

        <div className="max-w-[880px]">
          <h1 className="text-[42px] leading-[1.05] text-white sm:text-[58px] md:text-[76px] font-display font-bold">
            <span className="line-mask block">Spacious Triplex Villas,</span>
            <span className="line-mask block text-cyan">Built for Tomorrow.</span>
          </h1>
        </div>

        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/70">
          MIORAH by SriZen is an 81-villa gated community set on 7 acres in
          Boduppal, Hyderabad — where G+2 triplex homes meet a 10,000 SFT
          clubhouse and 40+ resort-style amenities.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group btn btn-primary bg-cyan text-[#00072e] hover:bg-white transition-colors duration-300"
          >
            Enquire Now
            <ArrowUpRight className="arrow h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#configurations"
            className="group btn btn-ghost border border-white/20 text-white hover:border-cyan/60 hover:text-cyan transition-colors duration-300"
          >
            View Villa Plans
            <ArrowUpRight className="arrow h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/15 pt-8">
          <Stat value="81" label="Triplex Villas" light />
          <Stat value="7" label="Acres" light />
          <Stat value="40+" label="Amenities" light />
          <Stat value="10,000" label="SFT Clubhouse" light />
        </div>
      </div>


      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">Scroll</span>
        <span className="h-9 w-[1.5px] overflow-hidden bg-white/15">
          <span className="block h-1/2 w-full bg-cyan animate-[scrollLine_1.8s_ease-in-out_infinite]" />
        </span>
      </div>

      <style jsx>{`
        @keyframes kenburns {
          from {
            transform: scale(1.08) translate(0, 0);
          }
          to {
            transform: scale(1.16) translate(-1.5%, -1.5%);
          }
        }
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
});

Hero.displayName = "Hero";