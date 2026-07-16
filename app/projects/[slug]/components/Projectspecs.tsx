import Link from "next/link";
import { Building2, MapPin, CalendarCheck, Ruler, Tag } from "lucide-react";
import type { Project } from "@/data/content";

interface ProjectSpecsProps {
  project: Project;
}

const specs = (project: Project): Array<[string, string, typeof Building2]> => [
  ["Client", project.client, Building2],
  ["Location", project.loc, MapPin],
  ["Completed", project.completed, CalendarCheck],
  ["Area / Scale", project.area, Ruler],
  ["Category", project.cat, Tag],
];

export default function ProjectSpecs({ project }: ProjectSpecsProps) {
  return (
    <aside className="bg-bg-light rounded-2xl p-9 h-fit lg:sticky lg:top-28">
      <h2 className="font-mono text-[11.5px] tracking-[.14em] uppercase text-ink-muted mb-6">
        Project Specifications
      </h2>
      <dl className="flex flex-col gap-5">
        {specs(project).map(([label, value, Icon]) => (
          <div
            key={label}
            className="flex items-start gap-3 border-t border-navy/10 pt-4 first:border-t-0 first:pt-0"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <div>
              <dt className="text-[12.5px] text-ink-muted">{label}</dt>
              <dd className="mt-0.5 font-semibold text-[15px] capitalize">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <Link href="/contact" className="btn btn-primary w-full justify-center mt-8">
        Start a Similar Project <span className="arrow">→</span>
      </Link>
    </aside>
  );
}