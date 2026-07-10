import HomeHero from "@/components/HomeHero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Stats from "@/components/Stats";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import ProjectsCarouselSection from "@/components/ProjectsCarouselSection";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import CTABanner from "@/components/home/CTABanner";
import WhoWeAre from "@/components/WhoWeAre";

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhoWeAre/>
      <MarqueeStrip />
      <Stats />
      <AboutTeaser />
      <ServicesTeaser />
      <ProjectsCarouselSection />
      <WhyChoose />
      <Testimonials />
      <Partners />
      <CTABanner />
    </>
  );
}
