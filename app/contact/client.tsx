"use client";

import { useEffect } from "react";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import OfficeLocations from "@/components/OfficeLocations";

export default function ContactPageClient() {
  useEffect(() => {
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Use requestAnimationFrame for next frame
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    
    // Also scroll after a tiny delay for safety
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 50);
    
    return () => clearTimeout(timeout);
  }, []);

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