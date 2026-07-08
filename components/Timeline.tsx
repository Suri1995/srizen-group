import { timeline } from "@/data/content";

export default function Timeline() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Our Journey</p>
          <h2>Two decades of building</h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-navy/15 md:-translate-x-1/2" />
          <div className="flex flex-col gap-10 md:gap-0">
            {timeline.map((t, i) => (
              <div key={t.year} className="md:grid md:grid-cols-2 md:gap-16 md:py-8 relative">
                <div className="absolute left-[-27px] md:left-1/2 top-1 md:top-9 w-3 h-3 rounded-full bg-navy md:-translate-x-1/2" />
                <div
                  className={`md:text-right ${
                    i % 2 === 0 ? "md:pr-16" : "md:col-start-2 md:pl-16 md:text-left"
                  }`}
                >
                  <div className="font-display text-2xl font-bold text-navy">{t.year}</div>
                  <p className="mt-2 text-ink-muted text-[15px] leading-relaxed max-w-[420px] md:ml-auto md:mr-0">
                    {t.copy}
                  </p>
                </div>
                {i % 2 === 0 && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
