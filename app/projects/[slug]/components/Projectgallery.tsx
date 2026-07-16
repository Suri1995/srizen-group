import Image from "next/image";
import type { Project } from "@/data/content";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold mt-12 mb-6">Gallery</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        {project.gallery.map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl group ${
              i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={img}
              alt={`${project.name} — photo ${i + 1} of ${project.gallery.length}`}
              fill
              sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </>
  );
}