import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";
import CTABanner from "@/components/home/CTABanner";
import ProjectHero from "./components/Projecthero";
import ProjectQuickFacts from "./components/Projectquickfacts";
import ProjectGallery from "./components/Projectgallery";
import ProjectTechnologies from "./components/Projecttechnologies";
import ProjectSpecs from "./components/Projectspecs";
import RelatedProjects from "./components/Relatedprojects";

interface ProjectPageParams {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: ProjectPageParams): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} | SriZen Group Projects`,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageParams) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.cat === project.cat && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectQuickFacts project={project} />

      <section className="pt-14 pb-20 md:pt-16 md:pb-28">
        <div className="wrap grid lg:grid-cols-[1fr_0.55fr] gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">{project.description}</p>
            <ProjectGallery project={project} />
            <ProjectTechnologies project={project} />
          </div>

          <ProjectSpecs project={project} />
        </div>
      </section>

      <RelatedProjects category={project.cat} projects={related} />

      <CTABanner />
    </>
  );
}