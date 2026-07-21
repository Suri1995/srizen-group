"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, projectFilters, type ProjectCategory } from "@/data/content";

const PAGE_SIZE = 4;

export default function Projects() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [page, setPage] = useState(1);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const filtered = projects.filter((p) => filter === "all" || p.cat === filter);
  
  // Adjust page size based on screen width
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setPageSize(6);
      } else if (width >= 768) {
        setPageSize(4);
      } else {
        setPageSize(4); // Mobile uses carousel, not pagination
      }
    };

    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Mobile: Group projects into slides of 2
  const mobileSlides = [];
  for (let i = 0; i < filtered.length; i += 2) {
    mobileSlides.push(filtered.slice(i, i + 2));
  }

  useEffect(() => {
    setPage(1);
    setMobileSlide(0);
  }, [filter, pageSize]);

  const handleFilter = (f: "all" | ProjectCategory) => {
    setFilter(f);
  };

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
  };

  const goToMobileSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, mobileSlides.length - 1));
    if (newIndex !== mobileSlide) {
      setDirection(newIndex > mobileSlide ? 1 : -1);
      setMobileSlide(newIndex);
    }
  };

  const handleNext = () => {
    if (mobileSlide < mobileSlides.length - 1) {
      setDirection(1);
      setMobileSlide(mobileSlide + 1);
    }
  };

  const handlePrev = () => {
    if (mobileSlide > 0) {
      setDirection(-1);
      setMobileSlide(mobileSlide - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0 && mobileSlide < mobileSlides.length - 1) {
        setDirection(1);
        setMobileSlide(mobileSlide + 1);
      } else if (swipeDistance < 0 && mobileSlide > 0) {
        setDirection(-1);
        setMobileSlide(mobileSlide - 1);
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Desktop filters (includes "All")
  const desktopFilters = projectFilters;
  
  // Mobile filters (excludes "All")
  const mobileFilters = projectFilters.filter(f => f !== "all");

  // Determine grid columns based on page size
  const getGridCols = () => {
    if (pageSize === 6) {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    } else {
      return "grid-cols-1 md:grid-cols-2";
    }
  };

  return (
    <section className="py-6 md:py-10">
      <div className="wrap">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-2xl font-display font-semibold text-navy !mb-0">
            {filtered.length} Projects
          </p>
          {/* Mobile slide indicator */}
          <div className="md:hidden flex items-center gap-1.5">
            {mobileSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToMobileSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === mobileSlide
                    ? "w-6 bg-navy"
                    : "w-1.5 bg-navy/20 hover:bg-navy/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left sidebar - Filters (30%) */}
          <aside className="md:w-[30%] flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-3">
                Categories
              </h3>
              
              {/* Desktop Filters - includes "All" */}
              <div className="hidden md:flex flex-col gap-1" role="group">
                {desktopFilters.map((f) => {
                  const active = filter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => handleFilter(f)}
                      aria-pressed={active}
                      className={`px-3.5 py-1.5 rounded-md border text-[11.5px] font-medium capitalize transition-all duration-300 ease-premium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 ${
                        active
                          ? "bg-navy text-white border-navy"
                          : "text-ink-muted border-navy/15 hover:bg-navy/5 hover:border-navy/30"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Filters - excludes "All" */}
              <div className="flex md:hidden flex-wrap gap-1.5" role="group">
                {mobileFilters.map((f) => {
                  const active = filter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => handleFilter(f)}
                      aria-pressed={active}
                      className={`px-3.5 py-1.5 rounded-full border text-[11.5px] font-medium capitalize transition-all duration-300 ease-premium text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 ${
                        active
                          ? "bg-navy text-white border-navy"
                          : "text-ink-muted border-navy/15 hover:bg-navy/5 hover:border-navy/30"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
              
              {/* Filter count - desktop only */}
              <div className="mt-4 pt-4 border-t border-navy/10 hidden md:block">
                <p className="text-[11px] text-ink-muted/60">
                  Showing {paginated.length} of {filtered.length} projects
                </p>
              </div>
            </div>
          </aside>

          {/* Right content - Cards (70%) */}
          <div className="md:w-[70%]">
            {/* Desktop Grid */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${filter}-${page}-${pageSize}`}
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className={`grid ${getGridCols()} gap-3`}
                >
                  {paginated.map((p) => (
                    <motion.div key={p.slug} variants={cardVariants}>
                      <ProjectCard project={p} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <p className="text-center text-ink-muted py-10">No projects match this filter yet.</p>
              )}

              {/* Desktop Pagination */}
              {totalPages > 1 && (
                <nav className="mt-6 flex items-center justify-center gap-1">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="w-7 h-7 rounded-full border border-navy/12 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-3 h-3" strokeWidth={2} />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    const active = n === page;
                    if (totalPages > 7) {
                      if (n === 1 || n === totalPages || (n >= page - 1 && n <= page + 1)) {
                        return (
                          <button
                            key={n}
                            onClick={() => goToPage(n)}
                            aria-current={active ? "page" : undefined}
                            className={`w-7 h-7 rounded-full text-[11px] font-medium transition-all duration-300 ${
                              active ? "bg-navy text-white" : "text-ink-muted hover:bg-navy/5"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      }
                      if (n === 2 || n === totalPages - 1) {
                        return <span key={n} className="w-7 h-7 flex items-center justify-center text-ink-muted/40 text-[10px]">…</span>;
                      }
                      return null;
                    }
                    return (
                      <button
                        key={n}
                        onClick={() => goToPage(n)}
                        aria-current={active ? "page" : undefined}
                        className={`w-7 h-7 rounded-full text-[11px] font-medium transition-all duration-300 ${
                          active ? "bg-navy text-white" : "text-ink-muted hover:bg-navy/5"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-7 h-7 rounded-full border border-navy/12 flex items-center justify-center text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-3 h-3" strokeWidth={2} />
                  </button>
                </nav>
              )}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              {mobileSlides.length > 0 ? (
                <>
                  <div
                    ref={carouselRef}
                    className="relative overflow-hidden rounded-xl"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={mobileSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="grid grid-cols-2 gap-3"
                      >
                        {mobileSlides[mobileSlide].map((p, idx) => (
                          <motion.div
                            key={p.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                          >
                            <ProjectCard project={p} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>

                    {/* Gradient indicators */}
                    {mobileSlides.length > 1 && (
                      <>
                        {mobileSlide > 0 && (
                          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
                        )}
                        {mobileSlide < mobileSlides.length - 1 && (
                          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Mobile Navigation Controls */}
                  {mobileSlides.length > 1 && (
                    <div className="flex items-center justify-between gap-3 mt-4">
                      <button
                        onClick={handlePrev}
                        disabled={mobileSlide === 0}
                        className="flex-1 py-2.5 rounded-full border border-navy/15 text-navy text-sm font-medium transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <button
                        onClick={handleNext}
                        disabled={mobileSlide === mobileSlides.length - 1}
                        className="flex-1 py-2.5 rounded-full bg-navy text-white text-sm font-medium transition-all duration-300 hover:bg-navy/90 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Progress indicators */}
                  {mobileSlides.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      {mobileSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToMobileSlide(idx)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            idx === mobileSlide
                              ? "w-8 bg-navy"
                              : "w-1.5 bg-navy/20 hover:bg-navy/40"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Mobile project count */}
                  <div className="mt-4 text-center">
                    <p className="text-[11px] text-ink-muted/60">
                      Showing {mobileSlides[mobileSlide]?.length || 0} of {filtered.length} projects
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-center text-ink-muted py-10">No projects match this filter yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block relative overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
    >
      <div className="relative w-full aspect-[4/5] bg-navy/5 rounded-lg overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_20px_-6px_rgba(0,15,102,0.18)] group-hover:-translate-y-1">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          <Image
            src={project.img}
            alt={`${project.name} — ${project.cat} project in ${project.loc}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Category Badge */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] text-white z-10 shadow-sm">
          {project.cat}
        </span>

        {/* Info Strip */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/55 to-transparent p-2.5 pt-9 z-10">
          <div className="text-[13px] text-white font-display font-semibold leading-tight tracking-tight">
            {project.name}
          </div>
          <div className="text-[10.5px] text-white/60 mt-0.5">{project.loc}</div>

          {/* Hover Action */}
          <div className="overflow-hidden max-h-0 group-hover:max-h-8 transition-all duration-300">
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-medium text-cyan">
              View Project
              <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}