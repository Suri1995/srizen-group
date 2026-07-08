import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Projects | SriZen Group",
  description:
    "Explore SriZen Group's portfolio of residential, commercial, industrial, infrastructure and government projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects that define skylines"
        subtitle="240+ completed projects across residential, commercial, industrial, infrastructure and government sectors."
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2400&auto=format&fit=crop"
        crumb="Projects"
      />
      <Projects />
      <CTABanner />
    </>
  );
}
