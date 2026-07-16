import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";

interface RelatedProjectsProps {
  category: string;
  projects: Project[];
}

export default function RelatedProjects({ category, projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="bg-bg-light py-8 md:py-20">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Related Work</p>
          <h2>More {category} projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              href={`/projects/${p.slug}`}
              key={p.slug}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
            >
              <Image
                src={p.img}
                alt={`${p.name} — ${p.cat} project in ${p.loc}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
              />

              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10.5px] font-mono uppercase tracking-[.12em] text-white">
                {p.cat}
              </span>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-transparent p-6 pt-14">
                <div className="text-white font-display font-semibold text-lg leading-tight">
                  {p.name}
                </div>
                <div className="text-white/60 text-[13px] mt-1">{p.loc}</div>

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
      </div>
    </section>
  );
}