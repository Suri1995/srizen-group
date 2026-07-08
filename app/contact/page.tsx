import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import OfficeLocations from "@/components/OfficeLocations";

export const metadata: Metadata = {
  title: "Contact | SriZen Group",
  description:
    "Get in touch with SriZen Group for construction, infrastructure, engineering and real estate development enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's build something exceptional"
        subtitle="Tell us about your project and our team will get back to you within one business day."
        image="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2400&auto=format&fit=crop"
        crumb="Contact"
      />
      <Contact />
      <OfficeLocations />
    </>
  );
}
