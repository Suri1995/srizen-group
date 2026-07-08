import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Industries from "@/components/Industries";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Industries | SriZen Group",
  description:
    "SriZen Group builds for residential, commercial, healthcare, hospitality, education, manufacturing, government, infrastructure, energy and warehousing sectors.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sectors We Serve"
        title="Industries we build for"
        subtitle="Deep sector expertise across the built environment, from residential towers to critical infrastructure."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2400&auto=format&fit=crop"
        crumb="Industries"
      />
      <Industries />
      <CTABanner />
    </>
  );
}
