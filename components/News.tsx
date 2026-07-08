import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/content";

export default function News() {
  return (
    <section className="bg-bg-light py-20 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {news.map((n) => (
            <Link
              href={`/news/${n.slug}`}
              key={n.slug}
              className="group bg-white rounded-md overflow-hidden border border-navy/10 transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-25px_rgba(0,15,102,0.25)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={n.img}
                  alt={n.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
              </div>
              <div className="p-6 pb-7">
                <span className="font-mono text-[11px] tracking-[.14em] uppercase text-green">
                  {n.cat}
                </span>
                <h3 className="text-lg mt-3 font-display font-semibold leading-snug">{n.title}</h3>
                <p className="mt-2.5 text-[13.5px] text-ink-muted leading-relaxed">{n.excerpt}</p>
                <div className="text-xs text-ink-muted mt-3">{n.date}</div>
                <div className="inline-flex items-center gap-2 mt-4 text-[13.5px] font-semibold text-navy">
                  Read More
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
