import { CheckCircle2 } from "lucide-react";
import type { Project } from "@/data/content";

interface ProjectTechnologiesProps {
  project: Project;
}

export default function ProjectTechnologies({ project }: ProjectTechnologiesProps) {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold mt-14 mb-6">Technologies Used</h2>
      <ul className="grid sm:grid-cols-2 gap-4">
        {project.technologies.map((t) => (
          <li
            key={t}
            className="flex gap-3 items-center rounded-xl border border-navy/10 bg-white px-4 py-3.5 text-[14.5px] text-navy"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}