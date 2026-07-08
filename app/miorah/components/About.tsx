import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { InfoTile } from "./Helpers";

export const About = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="wrap py-24 md:py-32">
      <div ref={ref} className="reveal grid grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="eyebrow">About the Project</div>
          <h2 className="text-[32px] text-navy md:text-[46px]">
            A premium gated villa community in Boduppal, Hyderabad.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            Spread across 7 acres, MIORAH offers 81 premium triplex villas
            with contemporary architecture, spacious interiors and
            resort-grade amenities. Every home is designed for comfort,
            privacy and an elevated lifestyle — from landscaped open
            spaces to a grand clubhouse and dedicated wellness facilities.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Luxury living begins here — with excellent connectivity to
            Hyderabad's fastest-growing residential and IT corridors.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn btn-ghost-solid">
              Talk to Our Team <ArrowUpRight className="arrow h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 md:col-span-5">
          <InfoTile value="81" label="Total Premium Villas" />
          <InfoTile value="7" label="Acres of Development" />
          <InfoTile value="40+" label="Lifestyle Amenities" />
          <InfoTile value="G+2" label="Triplex Configuration" />
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";