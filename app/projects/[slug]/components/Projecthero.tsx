import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { Project } from "@/data/content";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative min-h-[480px] flex items-end pt-32 pb-20 text-white overflow-hidden">
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-zoom { animation: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hero-zoom absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.img}')`, animation: "heroZoom 9s ease-out forwards" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,7,46,.55) 0%, rgba(0,7,46,.92) 100%)",
          }}
        />
      </div>

      <div className="wrap relative z-[1]">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[13px] text-white/50 font-mono mb-6">
            <li>
              <Link href="/" className="hover:text-cyan transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link href="/projects" className="hover:text-cyan transition-colors">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-white/75" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        <p className="eyebrow eyebrow-on-dark capitalize">{project.cat}</p>
        <h1 className="text-[34px] md:text-[54px] max-w-[20ch]">{project.name}</h1>
        <p className="mt-4 text-white/60 text-[15px] flex items-center gap-1.5">
          <MapPin className="w-4 h-4" strokeWidth={1.75} />
          {project.loc}
        </p>
      </div>
    </section>
  );
}