import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Careers from "@/components/Careers";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Careers | SriZen Group",
  description:
    "Explore current openings at SriZen Group across engineering, project management, design and safety roles.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career with us"
        subtitle="Join a team of 320+ engineers and professionals delivering landmark projects across the country."
        image="https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=2400&auto=format&fit=crop"
        crumb="Careers"
      />
      <Careers />
      <CTABanner />
    </>
  );
}
