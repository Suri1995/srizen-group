import type { Project } from "@/data/content";

interface ProjectQuickFactsProps {
  project: Project;
}

// Condensed highlights shown in a floating strip overlapping the hero/body
// seam — a quick read before the full spec table further down the page.
const highlights = (project: Project): Array<[string, string]> => [
  ["Completed", project.completed],
  ["Scale", project.area],
  ["Category", project.cat],
];

export default function ProjectQuickFacts({ project }: ProjectQuickFactsProps) {
  return (
    <div className="wrap relative z-[2]">
      <div className="-mt-10 md:-mt-12 grid grid-cols-3 divide-x divide-navy/10 rounded-2xl border border-navy/10 bg-white shadow-[0_20px_50px_-20px_rgba(0,15,102,0.18)]">
        {highlights(project).map(([label, value]) => (
          <div key={label} className="px-5 py-5 md:px-8 md:py-6 text-center sm:text-left">
            <div className="text-[11px] font-mono uppercase tracking-[.12em] text-ink-muted">
              {label}
            </div>
            <div className="mt-1 text-[15px] md:text-[17px] font-semibold text-navy capitalize">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}