import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative py-8 md:py-20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <svg
        viewBox="0 0 300 300"
        fill="none"
        className="hidden md:block absolute right-[-80px] top-1/2 -translate-y-1/2 w-[440px] opacity-[.14] pointer-events-none"
      >
        <g stroke="#00FFFF" strokeWidth="0.6">
          <path d="M150 280 C150 200 100 160 60 120" />
          <path d="M150 280 C150 190 120 150 90 100" />
          <path d="M150 280 C150 180 150 140 140 80" />
          <path d="M150 280 C150 180 180 140 160 80" />
          <path d="M150 280 C150 190 180 150 210 100" />
          <path d="M150 280 C150 200 200 160 240 120" />
        </g>
      </svg>
      <div className="wrap relative z-[1] flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <p className="eyebrow eyebrow-on-dark">Let&apos;s Talk</p>
          <h2 className="text-[30px] md:text-[44px] max-w-4xl">
            Ready to start engineering your next project?
          </h2>
        </div>
        <div className="flex gap-4 flex-wrap shrink-0">
          <Link href="/contact" className="btn btn-primary border border-gray-300">
            Get a Quote <span className="arrow">→</span>
          </Link>
          <Link href="/careers" className="btn btn-ghost">
            View Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
