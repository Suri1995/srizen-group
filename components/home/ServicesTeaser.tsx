import Link from "next/link";
import { services } from "@/data/content";

export default function ServicesTeaser() {
  const featured = services.slice(0, 6);

  return (
    <section className="bg-bg-light py-24 md:py-36">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-6 section-head !mb-14">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2>Comprehensive construction &amp; engineering services</h2>
          </div>
          <Link href="/services" className="btn btn-outline-navy shrink-0">
            View All Services <span className="arrow">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10 border border-navy/10">
          {featured.map((s, i) => (
            <div
              key={s.slug}
              className="group relative bg-white p-9 min-h-[250px] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-navy translate-y-full transition-transform duration-500 ease-premium group-hover:translate-y-0 z-0" />
              <span className="relative z-10 font-mono text-xs text-ink-muted group-hover:text-cyan transition-colors duration-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10">
                <h3 className="text-[21px] mt-14 font-display font-semibold group-hover:text-white transition-colors duration-400">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-ink-muted leading-relaxed group-hover:text-white/65 transition-colors duration-400">
                  {s.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
