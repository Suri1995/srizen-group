import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Services | SriZen Group",
  description:
    "Residential, commercial, industrial and infrastructure construction services — plus civil engineering, MEP, and project management, all in-house.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Construction & engineering services, end to end"
        subtitle="Twelve disciplines, one accountable partner — from first feasibility study through post-handover support."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop"
        crumb="Services"
      />
      <Services />
      <Process />
      <CTABanner />
    </>
  );
}
