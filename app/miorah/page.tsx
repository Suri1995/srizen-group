"use client";

import { useEffect } from "react";
import { useReveal } from "./hooks/useReveal";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { VillaConfig } from "./components/VillaConfig";
import { FloorPlans } from "./components/FloorPlans";
import { Gallery } from "./components/Gallery";
import { WhyChoose } from "./components/WhyChoose";
import { Clubhouse } from "./components/Clubhouse";
import { Location } from "./components/Location";
import { Amenities } from "./components/Amenities";

export default function MiorahPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();
  const specRef = useReveal<HTMLDivElement>();
  const plansRef = useReveal<HTMLDivElement>();
  const galleryRef = useReveal<HTMLDivElement>();
  const whyRef = useReveal<HTMLDivElement>();
  const clubRef = useReveal<HTMLDivElement>();
  const locRef = useReveal<HTMLDivElement>();
  const amenRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    // Clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Multiple scroll attempts to ensure it works
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
    <main className="bg-white">
      <Hero ref={heroRef} />
      <div className="bg-gradient-to-b from-white to-gray-100">
      <About ref={aboutRef} />
      </div>
      {/* <VillaConfig ref={specRef} /> */}
      <FloorPlans ref={plansRef} />
      <div className="bg-gray-100">
      <Gallery ref={galleryRef} />
      </div>
      <WhyChoose ref={whyRef} />
      <Clubhouse ref={clubRef} />
      <Location ref={locRef} />
      <Amenities ref={amenRef} />
    </main>
  );
}