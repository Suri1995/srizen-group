"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/content";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Building2,
  Building,
  Factory,
  Construction,
  KeyRound,
  Ruler,
  Zap,
  Armchair,
  Hammer,
  PencilRuler,
  Lightbulb,
  ClipboardCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Per-service background photography and icon, keyed by slug for an exact
// match against @/data/content — no fuzzy keyword guessing needed.
//
// NOTE: these are hotlinked Unsplash CDN URLs, free to use under the
// Unsplash License (unsplash.com/license). Fine for a prototype, but for
// production it's worth downloading them into /public/assets so the site
// isn't dependent on an external host staying up.
const SERVICE_MEDIA: Record<string, { image: string; icon: LucideIcon }> = {
  "residential-construction": {
    image: "https://images.unsplash.com/photo-1757970326337-95d7cca56fa1?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Building2,
  },
  "commercial-buildings": {
    image: "https://images.unsplash.com/photo-1778961419928-2968ddd57c05?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Building,
  },
  "industrial-projects": {
    image: "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Factory,
  },
  "infrastructure-development": {
    image: "https://images.unsplash.com/photo-1563391017873-6e6beab67fed?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Construction,
  },
  "turnkey-projects": {
    image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: KeyRound,
  },
  "civil-engineering": {
    image: "https://images.unsplash.com/photo-1629642971893-1f46ed9be126?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Ruler,
  },
  "mep-services": {
    image: "https://images.unsplash.com/photo-1576446470246-499c738d1c8e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Zap,
  },
  "interior-fit-outs": {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Armchair,
  },
  renovation: {
    image: "https://images.unsplash.com/photo-1649320316177-775fe2d67ca3?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Hammer,
  },
  "design-and-build": {
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: PencilRuler,
  },
  consultancy: {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: Lightbulb,
  },
  "project-management": {
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    icon: ClipboardCheck,
  },
};

// Fallback in case a service is added to data/content.ts without a matching
// entry above — keeps the carousel from breaking rather than looking
// unfinished.
const FALLBACK_MEDIA = {
  image: "https://images.unsplash.com/photo-1563391017873-6e6beab67fed?fm=jpg&q=80&w=1600&auto=format&fit=crop",
  icon: Sparkles,
};

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSlides = services.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (autoplay && !isHovering) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoplay, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setAutoplay(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setAutoplay(true);
  };

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide();
    if (touchStart - touchEnd < -75) prevSlide();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "6%" : "-6%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "6%" : "-6%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const currentService = services[currentIndex];
  const media = currentService ? SERVICE_MEDIA[currentService.slug] ?? FALLBACK_MEDIA : FALLBACK_MEDIA;
  const Icon = media.icon;

  return (
    <section className="relative py-8 md:py-20 overflow-hidden bg-white">
      <div className="wrap relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="eyebrow justify-center">What We Do</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-navy font-display tracking-tight">
            Comprehensive construction &amp;{" "}
            <span className="text-cyan">engineering services</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-ink-muted text-lg leading-relaxed">
            From first sketch to final handover, SriZen Group manages every stage of the build
            with in-house expertise across disciplines.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative h-[390px] md:h-[360px] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
            <AnimatePresence custom={direction} mode="wait">
              {currentService && (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  {/* Background photo, per service */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${media.image})` }}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />

                  {/* Navy gradient overlay for legibility — mirrors the hero
                      treatment so the section reads as one system. */}
                  <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-navy/35" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

                  <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 md:p-12">
                    {/* Top row: icon badge + progress dots */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-cyan" strokeWidth={1.6} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-lg">
                      <h3 className="text-[28px] sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight">
                        {currentService.title}
                      </h3>
                      <p className="mt-3 text-white/75 leading-relaxed">
                        {currentService.summary}
                      </p>
                      {currentService.detail && (
                        <p className="mt-2 text-white/50 text-sm leading-relaxed hidden sm:block">
                          {currentService.detail}
                        </p>
                      )}
                      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-cyan">
                        Learn more
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <div className="flex gap-3">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white border border-navy/15 flex items-center justify-center text-navy hover:border-navy hover:bg-navy hover:text-white transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white border border-navy/15 flex items-center justify-center text-navy hover:border-navy hover:bg-navy hover:text-white transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Dot Indicators */}
            <div className="hidden sm:flex gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="p-1"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentIndex ? "w-8 bg-navy" : "w-2 bg-navy/20 hover:bg-navy/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-sm text-ink-muted font-mono tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}