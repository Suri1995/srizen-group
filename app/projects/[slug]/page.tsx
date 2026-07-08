import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/data/content";
import CTABanner from "@/components/home/CTABanner";

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

const specs = (project: Project): Array<[string, string]> => [
  ["Client", project.client],
  ["Location", project.loc],
  ["Completed", project.completed],
  ["Area / Scale", project.area],
  ["Category", project.cat],
];

export default function ProjectDetailPage({ params }: ProjectPageParams) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.cat === project.cat && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[440px] flex items-end pt-32 pb-14 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,7,46,.5) 0%, rgba(0,7,46,.9) 100%), url('${project.img}') center/cover`,
          }}
        />
        <div className="wrap relative z-[1]">
          <div className="flex items-center gap-2 text-[13px] text-white/50 font-mono mb-6">
            <Link href="/" className="hover:text-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-cyan transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white/75">{project.name}</span>
          </div>
          <p className="eyebrow eyebrow-on-dark capitalize">{project.cat}</p>
          <h1 className="text-[34px] md:text-[54px] max-w-[20ch]">{project.name}</h1>
          <p className="mt-4 text-white/60 text-[15px]">{project.loc}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid lg:grid-cols-[1fr_0.55fr] gap-16">
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">{project.description}</p>

            <h3 className="font-display text-2xl font-semibold mt-12 mb-6">Gallery</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-md overflow-hidden">
                  <Image src={img} alt={`${project.name} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl font-semibold mt-14 mb-6">Technologies Used</h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.technologies.map((t) => (
                <li key={t} className="flex gap-3 items-start text-[14.5px] text-ink-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-green mt-0.5">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <aside className="bg-bg-light rounded-lg p-9 h-fit">
            <h4 className="font-mono text-[11.5px] tracking-[.14em] uppercase text-ink-muted mb-6">
              Project Specifications
            </h4>
            <dl className="flex flex-col gap-5">
              {specs(project).map(([label, value]) => (
                <div key={label} className="border-t border-navy/10 pt-4 first:border-t-0 first:pt-0">
                  <dt className="text-[12.5px] text-ink-muted">{label}</dt>
                  <dd className="mt-1 font-semibold text-[15px] capitalize">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact" className="btn btn-primary w-full justify-center mt-8">
              Start a Similar Project <span className="arrow">→</span>
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bg-light py-20 md:py-28">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Related Work</p>
              <h2>More {project.cat} projects</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  href={`/projects/${p.slug}`}
                  key={p.slug}
                  className="group relative overflow-hidden rounded-md aspect-[4/5]"
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent flex flex-col justify-end p-6">
                    <div className="text-white font-display font-semibold text-lg">{p.name}</div>
                    <div className="text-white/60 text-[13px] mt-1">{p.loc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
