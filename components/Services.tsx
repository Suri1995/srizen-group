"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/content";
import { ChevronLeft, ChevronRight, ArrowUpRight, Building2, Factory, Building, Sparkles } from "lucide-react";

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = services.length;

  // Icon mapping
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("residential")) return Building2;
    if (title.toLowerCase().includes("commercial")) return Building;
    if (title.toLowerCase().includes("industrial")) return Factory;
    return Sparkles;
  };

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
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, autoplay, isHovering]);

  // Pause autoplay on hover
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
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Slide variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const currentService = services[currentIndex];
  const Icon = currentService ? getIcon(currentService.title) : Sparkles;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/[0.03] to-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="wrap relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-600">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-display tracking-tight">
            Comprehensive construction &amp; <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              engineering services
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
            From first sketch to final handover, SriZen Group manages every stage of the build
            with in-house expertise across disciplines.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Container */}
          <div className="relative h-[420px] md:h-[380px] overflow-hidden">
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
                  <div className="w-full h-full">
                    <div className="relative h-full bg-white rounded-3xl shadow-2xl shadow-navy/5 border border-gray-100 overflow-hidden group">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
                      
                      <div className="relative p-8 md:p-10 h-full flex flex-col justify-between">
                        {/* Top section with number and icon */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            </div>
                            <div>
                              <span className="text-sm font-mono text-gray-400">
                                {String(currentIndex + 1).padStart(2, "0")}
                              </span>
                              <div className="text-xs text-gray-300 font-medium uppercase tracking-wider">
                                Service
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="flex gap-1.5">
                            {services.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                  idx === currentIndex
                                    ? "w-8 bg-gradient-to-r from-cyan-500 to-blue-500"
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center py-6">
                          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-display tracking-tight">
                            {currentService.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4 max-w-lg">
                            {currentService.summary}
                          </p>
                          {currentService.detail && (
                            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                              {currentService.detail}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Hover shine effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 gap-4">
            {/* Left/Right Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:border-cyan-500 hover:text-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-navy hover:border-cyan-500 hover:text-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="group relative"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      idx === currentIndex
                        ? "w-10 bg-gradient-to-r from-cyan-500 to-blue-500"
                        : "bg-gray-300 group-hover:bg-gray-400"
                    }`}
                  />
                  {idx === currentIndex && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 blur-sm"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Slide counter */}
            <div className="text-sm text-gray-400 font-mono">
              {String(currentIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}