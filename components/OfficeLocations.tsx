import { officeLocations } from "@/data/content";

export default function OfficeLocations() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Our Offices</p>
          <h2>Where to find us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10 border border-navy/10">
          {officeLocations.map((o) => (
            <div key={o.city} className="bg-white p-8">
              <h4 className="font-display font-semibold text-lg">{o.city}</h4>
              <p className="mt-3 text-[14px] text-ink-muted leading-relaxed">{o.address}</p>
              <p className="mt-3 text-[14px] font-medium text-navy">{o.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
