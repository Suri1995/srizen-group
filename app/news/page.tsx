import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import News from "@/components/News";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "News & Insights | SriZen Group",
  description: "Company news, sustainability updates, and industry insights from SriZen Group.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title="Latest from SriZen Group"
        subtitle="Project updates, sustainability progress, and perspectives from across the construction and infrastructure industry."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2400&auto=format&fit=crop"
        crumb="News"
      />
      <News />
      <CTABanner />
    </>
  );
}
