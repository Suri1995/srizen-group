import { forwardRef } from "react";
import { ArrowUpRight, Home, Trees, Sparkles, Building2 } from "lucide-react";
import { InfoTile } from "./Helpers";

export const About = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="wrap py-20 md:py-32">
      <div
        ref={ref}
        className="reveal grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 md:items-center lg:gap-16"
      >
        <div className="md:col-span-7">
          <div className="eyebrow flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-navy/70">
            <span className="h-px w-8 bg-navy/40" />
            About the Project
          </div>

          <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.15] text-navy sm:text-[34px] md:text-[42px] lg:text-[46px]">
            A premium gated villa community in Boduppal, Hyderabad.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-ink-muted md:text-lg">
            Spread across 7 acres, MIORAH offers 81 premium triplex villas
            with contemporary architecture, spacious interiors and
            resort-grade amenities. Every home is designed for comfort,
            privacy and an elevated lifestyle — from landscaped open spaces
            to a grand clubhouse and dedicated wellness facilities.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Luxury living begins here — with excellent connectivity to
            Hyderabad's fastest-growing residential and IT corridors.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-sm transition-all hover:border-navy/30 hover:shadow-md"
            >
              Talk to Our Team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:col-span-5">
          <InfoTile icon={Home} value="81" label="Total Premium Villas" />
          <InfoTile icon={Trees} value="7" label="Acres of Development" />
          <InfoTile icon={Sparkles} value="40+" label="Lifestyle Amenities" />
          <InfoTile icon={Building2} value="G+2" label="Triplex Configuration" />
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";