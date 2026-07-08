import Link from "next/link";
import ProjectCarousel from "@/components/ui/project-carousel";
import { projects } from "@/data/content";

export default function ProjectsCarouselSection() {
  const featured = projects.slice(0, 6);

  return (
    <section className="py-24 md:py-36">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="text-[34px] md:text-[54px] tracking-[-0.015em]">
              Projects that define skylines
            </h2>
          </div>
          <Link href="/projects" className="btn btn-outline-navy shrink-0">
            View All Projects <span className="arrow">→</span>
          </Link>
        </div>

        <ProjectCarousel projects={featured} />
      </div>
    </section>
  );
}
