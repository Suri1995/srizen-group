import Link from "next/link";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function HomeHero() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2400&auto=format&fit=crop"
      title="Building Tomorrow with Precision"
      date="Est. 2008 — Hyderabad"
      scrollToExpand="Scroll to Explore"
    >
      <div className="wrap">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <p className="eyebrow">SriZen Group</p>
            <h2 className="text-[28px] md:text-[38px] text-ink max-w-[18ch]">
              Engineering excellence, delivered at scale
            </h2>
            <p className="mt-5 text-ink-muted text-[17px] leading-relaxed max-w-[540px]">
              SriZen Group delivers innovative construction, infrastructure,
              commercial, residential, and industrial projects with
              uncompromising quality and precision — 240+ projects across 26
              cities.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap shrink-0">
            <Link href="/projects" className="btn btn-primary">
              Explore Projects <span className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn-outline-navy">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
}
