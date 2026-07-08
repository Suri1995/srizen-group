// app/projects/miorah/components/Hero.tsx
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Stat } from "./Helpers";

export const Hero = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="relative min-h-[640px] w-full overflow-hidden bg-[#00072e]">
      {/* Replace with: wide establishing shot of the villa clubhouse/facade at golden hour */}
      <img
        src="/images/miorah/hero-facade.jpg"
        alt="SriZen MIORAH villa facade at dusk"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#00072e] via-[#00072e]/40 to-[#00072e]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00072e]/80 via-transparent to-transparent" />

      <div className="wrap relative z-10 flex h-full flex-col justify-end pb-20 pt-32">
        <div className="eyebrow eyebrow-on-dark">
          <span>SRIZEN GROUP · PROJECT</span>
        </div>

        <div className="max-w-[880px]">
          <h1 className="text-[42px] leading-[1.05] text-white sm:text-[58px] md:text-[76px]">
            <span className="line-mask">Spacious Triplex Villas,</span>
            <span className="line-mask text-cyan">Built for Tomorrow.</span>
          </h1>
        </div>

        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/70">
          MIORAH by SriZen is an 81-villa gated community set on 7 acres in
          Boduppal, Hyderabad — where G+2 triplex homes meet a 10,000 SFT
          clubhouse and 40+ resort-style amenities.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#contact" className="btn btn-primary bg-cyan text-[#00072e] hover:bg-white">
            Enquire Now <ArrowUpRight className="arrow h-4 w-4" />
          </a>
          <a href="#configurations" className="btn btn-ghost">
            View Villa Plans <ArrowUpRight className="arrow h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/15 pt-8">
          <Stat value="81" label="Triplex Villas" light />
          <Stat value="7" label="Acres" light />
          <Stat value="40+" label="Amenities" light />
          <Stat value="10,000" label="SFT Clubhouse" light />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";