import type { Metadata } from "next";
import ContactPageClient from "./client";

export const metadata: Metadata = {
  title: "Contact | SriZen Group",
  description:
    "Get in touch with SriZen Group for construction, infrastructure, engineering and real estate development enquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}