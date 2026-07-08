"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, projectFilters, type ProjectCategory } from "@/data/content";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const filtered = projects.filter((p) => filter === "all" || p.cat === filter);

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-6 mb-12">
          <p className="eyebrow !mb-0">{filtered.length} Projects</p>
          <div className="flex gap-2.5 flex-wrap">
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full border text-[13.5px] font-medium capitalize transition-all duration-300 ease-premium ${
                  filter === f
                    ? "bg-navy text-white border-navy"
                    : "text-ink-muted border-navy/20 hover:bg-navy hover:text-white hover:border-navy"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filtered.map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.slug}
              className="group block relative overflow-hidden rounded-md mb-6 break-inside-avoid"
            >
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-premium group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/10 to-transparent flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-premium">
                <span className="font-mono text-[11px] tracking-[.14em] uppercase text-cyan">
                  {p.cat}
                </span>
                <div className="text-xl text-white font-display font-semibold mt-2">{p.name}</div>
                <div className="text-[13px] text-white/60 mt-1">{p.loc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
