import { sustainabilityDetail } from "@/data/content";

export default function Sustainability() {
  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(0,7,46,.94) 30%, rgba(0,7,46,.7) 100%), url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2400&auto=format&fit=crop') center/cover",
        }}
      />
      <div className="wrap relative z-[1]">
        <div className="max-w-[640px]">
          <p className="eyebrow eyebrow-on-dark">Our Commitments</p>
          <h2 className="text-[32px] md:text-[48px]">Building responsibly, for the long run</h2>
          <p className="mt-6 text-white/65 text-[16.5px] leading-relaxed">
            Sustainable construction isn&apos;t a checkbox for us — it&apos;s embedded in how we
            design, source, and build every project.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-14">
          {sustainabilityDetail.map((s, i) => (
            <div key={s.title} className="bg-navy-deep p-8">
              <span className="font-mono text-xs text-green">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-4 font-body font-semibold text-[16px]">{s.title}</h4>
              <p className="mt-2.5 text-[14px] text-white/55 leading-relaxed">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
