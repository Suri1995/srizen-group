import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import ProjectCarousel from "./ui/project-carousel";

export default function ProjectsCarouselSection() {
  const featured = projects.slice(0, 6);

  return (
    <section className="py-8 md:py-20">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="text-[34px] tracking-[-0.015em] md:text-[54px]">
              Projects that define skylines
            </h2>
          </div>
        </div>

        <ProjectCarousel projects={featured} />
      </div>
    </section>
  );
}