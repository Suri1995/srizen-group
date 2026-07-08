import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Leadership from "@/components/Leadership";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "About Us | SriZen Group",
  description:
    "Nearly two decades of construction, infrastructure and engineering delivery — learn about SriZen Group's mission, values, and leadership.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SriZen Group"
        title="Two decades of engineering excellence"
        subtitle="From a single civil engineering contract to a 320-strong team delivering projects across 26 cities — this is the story of SriZen Group."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2400&auto=format&fit=crop"
        crumb="About"
      />
      <About />
      <Timeline />
      <Leadership />
      <CTABanner />
    </>
  );
}
