"use client";

import { useReveal } from "./hooks/useReveal";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { VillaConfig } from "./components/VillaConfig";
import { WhyChoose } from "./components/WhyChoose";
import { Clubhouse } from "./components/Clubhouse";
import { Location } from "./components/Location";
import { Amenities } from "./components/Amenities";

export default function MiorahPage() {
  const heroRef = useReveal<HTMLDivElement>();
  const aboutRef = useReveal<HTMLDivElement>();
  const specRef = useReveal<HTMLDivElement>();
  const whyRef = useReveal<HTMLDivElement>();
  const clubRef = useReveal<HTMLDivElement>();
  const locRef = useReveal<HTMLDivElement>();
  const amenRef = useReveal<HTMLDivElement>();
  const contactRef = useReveal<HTMLDivElement>();

  return (
    <main className="bg-white">
      <Hero ref={heroRef} />
      <About ref={aboutRef} />
      <VillaConfig ref={specRef} />
      <WhyChoose ref={whyRef} />
      <Clubhouse ref={clubRef} />
      <Location ref={locRef} />
      <Amenities ref={amenRef} />
    </main>
  );
}