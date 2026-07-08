import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Sustainability from "@/components/Sustainability";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Sustainability | SriZen Group",
  description:
    "How SriZen Group builds responsibly — eco-friendly construction, energy efficiency, water conservation, and carbon reduction.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Building responsibly, for the long run"
        subtitle="Sustainable construction is embedded in how we design, source, and build every project — not an afterthought."
        image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2400&auto=format&fit=crop"
        crumb="Sustainability"
      />
      <Sustainability />
      <CTABanner />
    </>
  );
}
