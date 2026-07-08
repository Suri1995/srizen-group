import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/data/content";
import CTABanner from "@/components/home/CTABanner";

interface NewsPageParams {
  params: { slug: string };
}

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: NewsPageParams): Metadata {
  const article = news.find((n) => n.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | SriZen Group News`,
    description: article.excerpt,
  };
}

export default function NewsDetailPage({ params }: NewsPageParams) {
  const article = news.find((n) => n.slug === params.slug);
  if (!article) notFound();

  const more = news.filter((n) => n.slug !== article.slug).slice(0, 2);

  return (
    <>
      <section className="relative min-h-[400px] flex items-end pt-32 pb-14 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,7,46,.55) 0%, rgba(0,7,46,.9) 100%), url('${article.img}') center/cover`,
          }}
        />
        <div className="wrap relative z-[1] max-w-[800px]">
          <div className="flex items-center gap-2 text-[13px] text-white/50 font-mono mb-6">
            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-cyan transition-colors">News</Link>
          </div>
          <p className="eyebrow eyebrow-on-dark">{article.cat}</p>
          <h1 className="text-[30px] md:text-[44px]">{article.title}</h1>
          <p className="mt-4 text-white/55 text-[14px]">{article.date}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap max-w-[720px] mx-auto">
          <p className="text-lg text-ink-muted leading-relaxed mb-8">{article.excerpt}</p>
          <div className="flex flex-col gap-6">
            {article.body.map((para, i) => (
              <p key={i} className="text-[16px] leading-[1.8] text-ink">
                {para}
              </p>
            ))}
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 mt-12 text-[14px] font-semibold text-navy"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to News
          </Link>
        </div>
      </section>

      {more.length > 0 && (
        <section className="bg-bg-light py-20 md:py-28">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Continue Reading</p>
              <h2>More from SriZen Group</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              {more.map((n) => (
                <Link
                  href={`/news/${n.slug}`}
                  key={n.slug}
                  className="group bg-white rounded-md overflow-hidden border border-navy/10 flex flex-col sm:flex-row transition-shadow duration-400 hover:shadow-[0_30px_50px_-25px_rgba(0,15,102,0.25)]"
                >
                  <div className="relative w-full sm:w-[180px] aspect-[16/10] sm:aspect-auto shrink-0">
                    <Image src={n.img} alt={n.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[11px] tracking-[.14em] uppercase text-green">
                      {n.cat}
                    </span>
                    <h3 className="text-base mt-2 font-display font-semibold leading-snug">
                      {n.title}
                    </h3>
                    <div className="text-xs text-ink-muted mt-2">{n.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
