"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectFilters, type ProjectCategory } from "@/data/content";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const filtered = projects.filter((p) => filter === "all" || p.cat === filter);

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <p className="eyebrow !mb-0" aria-live="polite">
            {filtered.length} Project{filtered.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-2.5 flex-wrap" role="group" aria-label="Filter projects by category">
            {projectFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`px-5 py-2.5 rounded-full border text-[13.5px] font-medium capitalize transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 ${
                    active
                      ? "bg-navy text-white border-navy"
                      : "text-ink-muted border-navy/20 hover:bg-navy hover:text-white hover:border-navy"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filtered.map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.slug}
              className="group block relative overflow-hidden rounded-2xl mb-6 break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
            >
              <div className="relative w-full aspect-[4/5] bg-navy/5">
                <Image
                  src={p.img}
                  alt={`${p.name} — ${p.cat} project in ${p.loc}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-premium group-hover:scale-110"
                />

                {/* Category badge — always visible, not hover-gated */}
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10.5px] font-mono uppercase tracking-[.12em] text-white">
                  {p.cat}
                </span>
              </div>

              {/* Base info strip — always visible so the grid isn't blank
                  for touch users who can't hover. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-transparent p-6 pt-14">
                <div className="text-lg text-white font-display font-semibold leading-tight">
                  {p.name}
                </div>
                <div className="text-[13px] text-white/60 mt-1">{p.loc}</div>

                {/* Extra detail + CTA — reveals further on hover/focus */}
                <div className="max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 group-focus-visible:max-h-12 group-focus-visible:opacity-100 overflow-hidden transition-all duration-400 ease-premium">
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-cyan">
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-ink-muted py-16">No projects match this filter yet.</p>
        )}
      </div>
    </section>
  );
}