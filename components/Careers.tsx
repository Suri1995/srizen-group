import { openRoles, whyChoose } from "@/data/content";

export default function Careers() {
  const culture = whyChoose.slice(0, 4);

  return (
    <>
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Why Work Here</p>
            <h2>Build your career with SriZen</h2>
            <p>
              We invest in our people the same way we invest in our projects — with rigor, care,
              and a long-term view.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10 border border-navy/10">
            {culture.map(([title, copy], i) => (
              <div key={title} className="bg-white p-7">
                <span className="font-mono text-xs text-green">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-3.5 font-semibold text-[15px]">{title}</h4>
                <p className="mt-2 text-[13.5px] text-ink-muted leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-light py-20 md:py-28">
        <div className="wrap">
          <div className="section-head !mb-10">
            <p className="eyebrow">Open Roles</p>
            <h2>Current opportunities</h2>
          </div>
          <div className="flex flex-col">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6 border-b border-navy/10"
              >
                <div>
                  <h4 className="font-display font-semibold text-lg">{role.title}</h4>
                  <div className="flex gap-4 mt-1.5 text-[13.5px] text-ink-muted">
                    <span>{role.dept}</span>
                    <span>·</span>
                    <span>{role.loc}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                  </div>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-navy group-hover:text-cyan transition-colors shrink-0"
                >
                  Apply Now
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
